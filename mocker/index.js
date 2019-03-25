const data = require('./data.json')

const proxy = {
  'GET /api/seller': data.seller,
  'GET /api/goods': data.goods,
  'GET /api/ratings': data.ratings
}

module.exports = proxy
