module.exports = (html, limit) => {
  const matcher = /"shortcode":"([A-Z])\w+"/g;
  const ids = [];
  let match;
  do {
    match = matcher.exec(html);
    if (match) {
      ids.push(match[0].split(':')[1].replace(/"/g, ''));
    }
  } while (match);
  return ids.slice(0, limit);
};
