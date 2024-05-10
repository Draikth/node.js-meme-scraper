import fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

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

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

console.log(body);

const $ = cheerio.load(body);

$.html();

console.log($);
