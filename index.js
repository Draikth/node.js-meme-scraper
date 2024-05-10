import fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

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

async function memeScrape() {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const memes = [];

    const memeImg = $('#images > div > a').map((i, el) => {
      const pic = $(el).find('img').attr('src');

      console.log(pic);
    });
  } catch (error) {
    console.log(error);
  }
}

memeScrape();
/*
const response = await fetch(url);
const body = await response.text();

//console.log(body);

const $ = cheerio.load(body);

$('#images > div > a > img').each((i, e) => {
  meme.push($(e).html());
});

console.log($);
console.log(meme);
*/
