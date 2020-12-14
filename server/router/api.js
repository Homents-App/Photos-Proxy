const { Router } = require('express');
const { createProxyMiddleware: CPM } = require('http-proxy-middleware');
const {
  service1, service2, service3, service4,
} = require('../config/services.js');

const router = Router();

//service1.api.forEach((api) => router.use(api, CPM({ target: service1.url, changeOrigin: true })));
//service2.api.forEach((api) => router.use(api, CPM({ target: service2.url, changeOrigin: true })));
router.use(service3.api, CPM({ target: service3.url, changeOrigin: true }));
//router.use(service4.api, CPM({ target: service4.url, changeOrigin: true }));

module.exports = router;
