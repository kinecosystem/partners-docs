run:
	npm start

build:
	npm run build

deploy: build
	aws s3 sync build/partners\ sdk s3://partners.kinecosystem.com/ --acl public-read
	aws cloudfront create-invalidation --distribution-id E1DI2IXNY1IQ1Q --paths "/*"

.PHONY: build run deploy
