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

## Deployment
In the `website` directory:
```bash
partners-docs/website > npm run build
```

This will generate all the needed files (it's all static: html, images, etc).  
You'll find the site distribution files under `website/build`.

## Deploy using script
```bash
partners-docs/website > ./deploy.sh
```

In case you're getting:
> fatal error: Unable to locate credentials

Do this:
```bash
eval $(lp-aws-saml.py --print-eval)
```
