import React, { Component } from "react";

import { t } from "shared/translations/i18n";

class componentName extends Component {
	render() {
		return (
			<div>
				<h1>{t("components.settings.localization.languageAndLocalization")}</h1>
				<div className="card rounded-0 my-3 text-left">
					<div className="card-body" />
				</div>
			</div>
		);
	}
}

export default componentName;
