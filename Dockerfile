FROM buildkite/puppeteer:latest
RUN  npm i mocha
RUN  npm i ing-au-login