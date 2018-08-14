const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function docUrl(doc, language) {
	return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

class Help extends React.Component {
	render() {
		const language = this.props.language || "";
		const docsUrl = docUrl("android/android.html");

		return (
			<div className="docMainWrapper wrapper">
				<Container className="mainContainer documentContainer postContainer">
					<div className="post">
						<header className="postHeader">
							<h1 className="postHeaderTitle">Need help?</h1>
						</header>
						<section>
							Other than the <a href={ docsUrl }>documentation on this site</a> you can find help in the following ways:
						</section>
						<section>
							<h3>Questions</h3>
							<p>
								The best place to ask questions is stack overflow, using the <a href={ siteConfig.stackoverflow } target="_blank">kin tag</a>.
							</p>
						</section>
						<section>
							<h3>Bugs and feature requests</h3>
							<p>
								In case you came up with a bug, or you want to ask for a new feature, please post in our:
								<ul>
									<li><a href={ `${ siteConfig.repos.android }/issues` } target="_blank">Android sdk issues</a></li>
									<li><a href={ `${ siteConfig.repos.ios }/issues` } target="_blank">iOS sdk issues</a></li>
									<li><a target="_blank" href="https://github.com/kinecosystem/marketplace-server/issues">Marketplace Server issues</a></li>
									<li><a target="_blank" href="https://github.com/kinecosystem/payment-service/issues">Payment Service issues</a></li>
									<li><a target="_blank" href="https://github.com/kinecosystem/jwt-service/issues">JWT Service issues</a></li>
								</ul>
							</p>
						</section>
					</div>
				</Container>
			</div>
		);
	}
}

module.exports = Help;
