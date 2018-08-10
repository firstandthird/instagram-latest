const fetch = require('node-fetch');

module.exports = async (id) => {
  const response = await fetch(`https://api.instagram.com/oembed?omitscript=true&url=http://instagr.am/p/${id}/`, {
    method: 'get',
  });
  const json = await response.json();
  json.shortcode = id;

  return json;
};
