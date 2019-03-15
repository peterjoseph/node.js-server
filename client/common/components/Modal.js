import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { t } from "shared/translations/i18n";

class Modal extends Component {
	render() {
		const { title, children, actionButtonLabel, actionButtonFunc, actionDisabled, closeModal } = this.props;

		return (
			<div className="modal" tabIndex="-1">
				<ReactModal contentLabel={title} className="modal-dialog modal-dialog-centered" isOpen ariaHideApp={false} onRequestClose={closeModal}>
					<div className="modal-content rounded-0" role="document">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
							<button type="button" className="close" aria-label="Close" onClick={closeModal}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">{children}</div>
						<div className="modal-footer">
							{actionButtonLabel && (
								<button type="button" className="btn btn-primary btn-sm" onClick={actionButtonFunc} disabled={actionDisabled}>
									{actionButtonLabel}
								</button>
							)}
							{closeModal && (
								<button type="button" className="btn btn-secondary btn-sm" onClick={closeModal} data-dismiss="modal">
									{t("action.close")}
								</button>
							)}
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	actionButtonLabel: PropTypes.string,
	actionButtonFunc: PropTypes.func,
	actionDisabled: PropTypes.bool,
	closeModal: PropTypes.func
};

export default Modal;
