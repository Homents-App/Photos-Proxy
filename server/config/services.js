/*
  This file contains the configuration information needed to proxy requests to your desired server
  for both your bundle.js and any AJAX requests made to your API. In order for this to work your
  service's API must be set up in a very specific manner following RESTful API naming conventions.

  The endpoints defined in your API should be prefixed with /api/ and should look like some of the
  examples below:

    /api/listings/:listing_id
    /api/listings/:listing_id/reviews
    /api/products/:product_id
    /api/products/:product_id/questions

  Given this endpoint, for each service you will need to remove the /api/ prefix and add the
  remainder of the endpoint to the configuration object below as the value for the api key in the
  object.

  For example:

    /api/listings/:listing_id = /listings or /listings/:listing_id
    /api/listings/:listing_id/reviews = /listings/:listing_id/reviews
    /api/products/:product_id = /products or /products/:product_id
    /api/products/:product_id/questions = /products/:product_id/questions

    MINE:
    /tours/requests
    /tours/agents

  The url key in each service object should correspond to the url of the service you are trying to
  proxy requests to. At the start these will point to servers running locally on your machine, but
  once you deploy onto AWS then you will need to update these urls to point to the ip addresses
  of the servers running on AWS.

  The bundle key in each service object should correspond to the name of that particular service's
  webpack bundle.

  For a service with an API of /api/listings/:listing_id/reviews, running on http://localhost:3004
  and a webpack bundled called bundle.js, the configuration object for that service will look like:

  {
    api: /listings/:listing_id/reviews,
    url: 'http://localhost:3004',
    bundle: 'bundle.js',
  }
*/

module.exports = {
   service1: {
    api: ['/tours/requests', '/tours/agents'],
    url: 'http://localhost:3002',
    bundle: 'bundle.js',
  },
  service2: {
    api: ['/similar-homes', '/similar-homes/favorites', '/new-listings', '/new-listing/favorites'],
    url: 'http://localhost:3003',
    bundle: 'bundle.js',
  },

  // Photos microservice
  service3: {
    api: ['/listings/:id', '/listings', '/addListing'],
    // url: 'http://172.31.27.218:3001', // service IP for testing
    url: 'http://172.31.39.34', // IP for load balancer
    bundle: 'bundle.js',
  },

  service4: {
    api: '/home-description',
    url: 'http://localhost:3004',
    bundle: 'bundle.js',
  },
};
