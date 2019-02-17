# Kin SDK for Partners Website

A [Docusaurus](https://docusaurus.io/) based website for all docs/faqs/links (etc...) 
which has to do with the partners SDK ecosystem.

## Running locally
In order to run the site locally in your browser go to the website directory and:
```bash
partners-docs/website > npm start
```
If all goes well the website will be automatically opened in your browser.  

Keep in mind that there's no real "hot-reload" (only works for css, and maybe js files), 
so if you change the files you'll need to stop and restart it.

## Adding a version
In order to add a new version run:
```bash
partners-docs/website > npm run version VERSION_NUMBER
```
Where `VERSION_NUMBER` is the new version you want to add, i.e.: `npm run version 0.8`.

We only update docs version on major and minor changes, patches shouldn't cause the docs to update, 
except for the link in the release notes in the [versions.js](blob/master/website/pages/en/versions.js) file.
