const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
	return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
	return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
	return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

class Button extends React.Component {
	render() {
		return (
			<div className="pluginWrapper buttonWrapper">
				<a className="button rounded" href={ this.props.href } target={ this.props.target }>
					{ this.props.children }
				</a>
			</div>
		);
	}
}

Button.defaultProps = {
	target: "_self",
};

class Index extends React.Component {
	render() {
		const language = this.props.language || "";

		return (
			<div className="index_main">
				<video autoPlay={ true } playsInline={ true } muted={ true } loop={ true } className="bg_video" poster="img/bg/bg-image.jpg">
					<source src="vid/coding.mov" type="video/mov" />
					<source src="vid/coding.webm" type="video/webm" />
					<img
						src="img/bg/bg-image.jpg"
						srcSet="
							img/bg/bg-image@2x.jpg 2x,
							img/bg/bg-image@3x.jpg 3x"
						className="bg_image" />
				</video>
				<div className="content">
					<h1>The Kin Partners SDK</h1>
					<h3>
						A new digital world where<br/>
						everyone is on the same team
					</h3>
					<Button href={ docUrl("api_readme.html") }>Documentation</Button>
				</div>
			</div>
		);
	}
}

module.exports = Index;
