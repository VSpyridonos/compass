const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/compass-backend',
    	createProxyMiddleware({
    		target: 'http://localhost:5000',
    		changeOrigin: true
    	})
    );
};