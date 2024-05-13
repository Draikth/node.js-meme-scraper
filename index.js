// Import the required libraries
import fs from 'node:fs';
import https from 'node:https';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

// the link from which the memes come from
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// make "memes" directory
const directoryPath = './memes';

// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(directoryPath);

  console.log(`Directory '${directoryPath}' created.`);
} else {
  console.log(`Directory '${directoryPath}' already exists.`);
}

const memes = [];

// Use an async function to fetch the data from the required url and get it back as text
async function memeScrape() {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body); // initiate cheerio

    // use selector address with cheerio to find where the correct elements containing the src urls are (in dev tools view, find the element you are looking for and right-click; copy selector)

    const memeLinks = $('#images > div > a');

    // limit the number of links to 10 images by finding the src attributes in the img elements nested in each div on the website, by further narrowing down the location provided by first $(selector)

    for (let i = 0; i < memeLinks.length && memes.length < 10; i++) {
      const pic = $(memeLinks[i]).find('img').attr('src');
      memes.push(pic); // put links as elements in the memes array
    }

    console.log(memes);
  } catch (error) {
    console.log(error);
  }
}

function downloadImage(memeUrl, fileName) {
  https.get(memeUrl, function (res) {
    const fileStream = fs.createWriteStream(fileName);
    res.pipe(fileStream);

    fileStream.on('error', function (error) {
      console.log(error);
    });

    fileStream.on('finish', function () {
      fileStream.close();
      console.log('Completed');
    });
  });
}

// ESLint kept giving an error that memeScrape was not handling promises correctly so needed to adjust it to the following ".then.catch" format for problem to go away. **needed some ChatGPT for help with fixing the error and structure and to incorporate if loop into it.**
memeScrape()
  .then(() => {
    console.log('Meme scrape successful.');

    if (memes.length > 0) {
      memes.forEach((memeUrl, index) => {
        let fileName;
        if (index + 1 < 10) {
          fileName = `./memes/0${index + 1}.jpg`;
        } else {
          fileName = `./memes/${index + 1}.jpg`;
        }
        downloadImage(memeUrl, fileName);
      });
    } else {
      console.log('No memes found.');
    }
  })
  .catch((error) => {
    console.error(error);
  });
