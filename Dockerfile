FROM buildkite/puppeteer:latest
WORKDIR /app
RUN  npm i ing-au-login
COPY . /app
CMD node /app/ing.js
