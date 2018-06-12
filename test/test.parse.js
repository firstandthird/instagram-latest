const tap = require('tap');
const fs = require('fs');
const path = require('path');
const extractIds = require('../lib/extractIdsFromHtml');
const fetchMeta = require('../lib/fetchMetaWithId');
const main = require('../index.js');

tap.test('extracts id list from instagram html', async t => {
  const content = fs.readFileSync(path.join(__dirname, 'fixture.html')).toString();
  const ids = extractIds(content, 5);
  t.match(ids, [
    'BjvmrvEgCJu',
    'BjnNtLggd85',
    'BjQLFTTAX2h',
    'BjNh8iMhJay',
    'BjITU6rh3Ef'
  ]);
  t.end();
});

tap.test('fetch ids from instagram oembed', async t => {
  const result = await fetchMeta('Bic5A9Cgl7s');
  t.match(result, {
    author_name: 'kevin',
    author_url: 'https://www.instagram.com/kevin',
    author_id: 3,
    media_id: '1773543107468615404_3',
    provider_name: 'Instagram'
  });
  t.end();
});

tap.test('fetch the latest posts for an instagram user', async t => {
  const posts = await main('kevin');
  t.ok(posts);
  t.equal(posts.length, 10);
  posts.forEach(post => {
    t.equal(post.author_name, 'kevin');
  });
  t.end();
});
