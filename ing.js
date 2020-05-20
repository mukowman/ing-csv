const myArgs = process.argv.slice(2);
console.log('Args:', myArgs);
const CLIENT_NUMBER = myArgs[0];
const ACCESS_CODE = myArgs[1];
const digRegex = /\d+/;

if (!CLIENT_NUMBER) throw new Error('Client number and access code not supplied as arguments.')
if (!ACCESS_CODE) throw new Error('Access code not supplied as arguments.')
if (!CLIENT_NUMBER.match(digRegex)) throw new Error('Invalid client number')
if (!ACCESS_CODE.match(digRegex)) throw new Error('Invalid access code')

const puppeteer = require('puppeteer');
const { login } = require('ing-au-login');


(async () => {
    const browser = await puppeteer.launch();
        args: [
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage'
        ]
    })
    const page = await browser.newPage();
    const authToken = await login(page, CLIENT_NUMBER, ACCESS_CODE)
    await browser.close();
    console.log('AuthToken:', authToken);
    fs = require('fs');
    fs.writeFile('/data/auth.txt', authToken, function (err) {
        if (err) return console.log(err);
        console.log('Wrote AuthToken to /data/auth.txt');
    });
  })();
