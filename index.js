const extractIds = require('./lib/extractIdsFromHtml');
const fetchMeta = require('./lib/fetchMetaWithId');
const fetch = require('node-fetch');

// fetch up to 10 posts for an instagram user
module.exports = async(instagramUser, limit=10) => {
  const response = await fetch(`https://www.instagram.com/${instagramUser}/`);
  const page = await response.text();
  const idList = await extractIds(page, limit);
  const results = [];
  await Promise.all(idList.map(id => new Promise(async(resolve, reject) => {
    results.push(await fetchMeta(id));
    resolve();
  })));
  return results;
};
