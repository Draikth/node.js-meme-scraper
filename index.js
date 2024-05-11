// Import the required libraries
import fs from 'node:fs';
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

// Use an async function to fetch the data from the required url and get it back as text
async function memeScrape() {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body); // initiate cheerio

    const memes = [];
    // use selector address with cheerio to find where the correct elements containing the src urls are
    const memeLinks = $('#images > div > a');
    // limit the number of links to 10 images by finding the src attributes in the img elements nested in each div on the website.
    for (let i = 0; i < memeLinks.length && memes.length < 10; i++) {
      const pic = $(memeLinks[i]).find('img').attr('src');
      memes.push(pic);
    }

    console.log(memes);
  } catch (error) {
    console.log(error);
  }
}

memeScrape();
