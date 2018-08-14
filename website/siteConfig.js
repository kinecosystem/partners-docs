/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const siteConfig = {
	title: "Kin SDK for Partners",
	tagline: "Documentation for the platform sdk",
	url: 'https://your-docusaurus-test-site.com' /* your website url */,
	baseUrl: '/' /* base url for your project */,
	// For github.io type URLs, you would set the url and baseUrl like:
	//   url: 'https://facebook.github.io',
	//   baseUrl: '/test-site/',

	// Used for publishing and more
	projectName: "partners sdk",
	organizationName: "kin",
	// For top-level user or org sites, the organization is still the same.
	// e.g., for the https://JoelMarcey.github.io site, it would be set like...
	//   organizationName: 'JoelMarcey'

	// For no header links in the top nav bar -> headerLinks: [],
	headerLinks: [
		{ doc: "android/android", label: "Docs" },
		{ doc: "faq/integration", label: "FAQ" },
		{ page: "help", label: "Help" }
	],

	/* path to images for header/footer */
	headerIcon: "img/logo.svg",
	footerIcon: "img/logo.svg",
	favicon: "img/favicon/favicon.ico",

	/* colors for website */
	colors: {
		primaryColor: "#000000",
		secondaryColor: "#0000ff",
	},

	// This copyright info is used in /core/Footer.js and blog rss/atom feeds.
	copyright:
		"Copyright © " + new Date().getFullYear() + " Kin Ecosystem",

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks
		theme: 'default',
	},

	// Add custom scripts here that would be placed in <script> tags
	scripts: ['https://buttons.github.io/buttons.js'],

	/* On page navigation for the current documentation page */
	onPageNav: "separate",

	/* Open Graph and Twitter card images */
	ogImage: "img/logo.svg",
	twitterImage: "img/logo.svg",

	// You may provide arbitrary config keys to be used as needed by your
	// template. For example, if you need your repo's URL...
	//   repoUrl: 'https://github.com/facebook/test-site',

	stackoverflow: "http://stackoverflow.com/questions/tagged/kin",
	repos: {
		ios: "https://github.com/kinecosystem/kin-ecosystem-ios-sdk",
		android: "https://github.com/kinecosystem/kin-ecosystem-android-sdk"
	},

	markdownPlugins: [
		(md) => {
			const oldHeadingOpenRule = md.renderer.rules.heading_open;
			const oldHeadingCloseRule = md.renderer.rules.heading_close;
			const oldListItemCloseRule = md.renderer.rules.list_item_close;

			const state = {
				page: null
			};

			md.renderer.rules.list_item_close = function(tokens, index) {
				const current = tokens[index];

				if (state.page !== "faq" || current.level !== 2) {
					return oldListItemCloseRule(...arguments);
				}

				return `</div>${ oldListItemCloseRule(...arguments) }`;
			}

			md.renderer.rules.heading_open = function(tokens, index) {
				const current = tokens[index];

				if (!state.page && current.level === 0 && tokens[index + 1].content.toLowerCase().endsWith("faq")) {
					state.page = "faq";
					return oldHeadingOpenRule(...arguments);
				}

				if (state.page !== "faq" || current.level !== 2) {
					return oldHeadingOpenRule(...arguments);
				}

				const id = `hidden_box_${ index }`;
				return `<input type="checkbox" id="${ id }" />${ oldHeadingOpenRule(...arguments) }<label for="${ id }">`;
			}

			md.renderer.rules.heading_close = function(tokens, index) {
				const current = tokens[index];

				if (state.page !== "faq" || current.level !== 2) {
					return oldHeadingCloseRule(...arguments);
				}
				return `</label>${ oldHeadingCloseRule(...arguments) }<div class="faq_answer">`;
			}
		},
	],
};


module.exports = siteConfig;
