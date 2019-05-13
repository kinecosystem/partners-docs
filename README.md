# Kin SDK for Partners Website

A [Docusaurus](https://docusaurus.io/) based website for all docs/faqs/links (etc...) 
which has to do with the partners SDK ecosystem.

## Running Locally
In order to run the site locally in your browser go to the website directory and:
```bash
partners-docs/website > npm start
```
If all goes well the website will be automatically opened in your browser.  

Keep in mind that there's no real "hot-reload" (only works for css, and maybe js files), 
so if you change the files you'll need to stop and restart it.

## Modifying Current Site
There are two cases you would want to update the docs.

### 1. Modifying Without a New SDK Version (Fixes to Text)
The `next` version is stored under `/docs` and the current version is `website/versioned_docs/version-x.x` (where `x.x` is the highest version. To see the changes on the current site, you would need to update `website/versioned_docs/version-x.x`. In order for our next version to also include the fixes, it's good practice to also update the `/docs` with the same change.
In cases where the fix is pretty big and applying it twice is tedious, you could delete the current version completely by deleting `website/versioned_docs/version-x.x` and removing it from `website/versions.json`. Then you can make the changes under `/docs` and create a new version with the same version number (see [Adding a Version](#add_version))

### 2. Deploying a New SDK Version
In this case we will just update the `/docs` dir with our new API methods and docs. Once down we will create a new version, as seen in the following section.

## <a name="add_version">Adding a Version</a>
In order to add a new version run:
```bash
partners-docs/website > npm run version VERSION_NUMBER
```
Where `VERSION_NUMBER` is the new version you want to add, i.e.: `npm run version 0.8`.
This will create a a new dir under `website/versioned_docs/version-VERSION_NUMBER` and add a line to `website/versions.json`.
You should add the newly generated files to git.

## When Should You Update the Docs
We only update docs version on major and minor changes, patches shouldn't cause the docs to update, 
except for the link in the release notes in the [versions.js](blob/master/website/pages/en/versions.js) file.
