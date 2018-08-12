import { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { extractSubdomain } from "shared/utilities/subdomain";
import User from "common/components/User";
import { VALIDATE_WORKSPACE_URL_REJECTED, VERIFY_EMAIL_REJECTED, validateWorkspaceURL, verifyUserEmail } from "common/store/reducers/authentication.js";

class VerifyEmail extends Component {
	componentDidMount() {
		const subdomain = extractSubdomain(window.location.href);
		this.props.validateWorkspaceURL(subdomain).then(result => {
			if (result.type === VALIDATE_WORKSPACE_URL_REJECTED) {
				this.props.history.replace("/");
				return;
			}

			// Verify Code
			const query = queryString.parse(this.props.history.location.hash);
			const code = query.code;

			// Create body component to send to back-end
			const body = {
				code: code,
				workspaceURL: subdomain
			};

			// Check if user exists and isLoggedIn
			if (this.props.user && this.props.user.get("userId")) {
				body.userId = this.props.user.get("userId");
			}

			// Verify User Email
			this.props.verifyUserEmail(body).then(result => {
				if (result.type === VERIFY_EMAIL_REJECTED) {
					this.props.history.replace("/");
					return;
				}
			});
		});
	}

	render() {
		return null;
	}
}

VerifyEmail.propTypes = {
	history: PropTypes.object,
	user: PropTypes.object,
	validateWorkspaceURL: PropTypes.func,
	verifyUserEmail: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		verifyUserEmail: bindActionCreators(verifyUserEmail, dispatch),
		validateWorkspaceURL: bindActionCreators(validateWorkspaceURL, dispatch)
	};
}

export default withRouter(User(connect(null, mapDispatchToProps)(VerifyEmail)));
