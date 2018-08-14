const React = require("react");

class Footer extends React.Component {
	docUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		return baseUrl + "docs/" + (language ? language + "/" : "") + doc;
	}

	pageUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		return baseUrl + (language ? language + '/' : '') + doc;
	}

	render() {
		return (
			<footer className="nav-footer" id="footer">
				<section className="sitemap">
					<a href={ this.props.config.baseUrl } className="nav-home">
						{ this.props.config.footerIcon && (
							<img
								width="66"
								height="58"
								alt={ this.props.config.title }
								src={ this.props.config.baseUrl + this.props.config.footerIcon }
							/>
						) }
					</a>
					<div>
						<h5>Docs</h5>
						<a href={ this.docUrl("android/android.html") }>
							Android
						</a>
						<a href={ this.docUrl("ios/ios.html") }>
							iOS
						</a>
						<a href={this.docUrl("server/marketplace.html") }>
							Server
						</a>
					</div>
					<div>
						<h5>GitHub</h5>
						<a target="_blank" href="https://github.com/kinecosystem/kin-ecosystem-ios-sdk">iOS SDK</a>
						<a target="_blank" href="https://github.com/kinecosystem/kin-ecosystem-android-sdk">Android SDK</a>
						<a target="_blank" href="https://github.com/kinecosystem/marketplace-server">Marketplace Server</a>
						<a target="_blank" href="https://github.com/kinecosystem/payment-service">Payment Service</a>
						<a target="_blank" href="https://github.com/kinecosystem/jwt-service">JWT Service</a>
					</div>
					<div>
						<h5>Community</h5>
						<a
							href="http://stackoverflow.com/questions/tagged/kin"
							target="_blank"
							rel="noreferrer noopener">
							Stack Overflow
						</a>
						<a
							href="http://stackoverflow.com/questions/tagged/kin"
							target="_blank"
							rel="noreferrer noopener">
							Reddit r/KinFoundation/
						</a>
						<a href="https://medium.com/kinfoundation" target="_blank" rel="noreferrer noopener">Kin Blog</a>
						<a href="https://medium.com/inside-kin" target="_blank" rel="noreferrer noopener">Inside Kin Blog</a>
						<a href="https://twitter.com/kin_foundation" target="_blank" rel="noreferrer noopener">Twitter</a>
						<a href="https://www.youtube.com/channel/UCZ0z9fRKhW-GEjQs-_Jxfyg" target="_blank" rel="noreferrer noopener">YouTube</a>
						<a href="https://kinecosystem.org" target="_blank" rel="noreferrer noopener">Kin Ecosystem</a>
					</div>
				</section>

				<section className="copyright">{ this.props.config.copyright }</section>
			</footer>
		);
	}
}

module.exports = Footer;
