start:
	npx nodemon --exec npx babel-node server/bin/slack.js

install:
	npm install

build:
	rm -rf dist
	npm run build
	npx webpack -p --env production && babel frontend --out-dir dist --source-maps inline

test:
	npm test

lint:
	npx eslint .

publish:
	git push heroku master

.PHONY: test
