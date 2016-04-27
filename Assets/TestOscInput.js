var osc = require('C:/Program Files/nodejs/node_modules/node-osc');
console.log('Testing OSC Messages');

var oldMsg = false;
var oscServer = new osc.Server(3333, '0.0.0.0'); 
oscServer.on("message", function (msg, rinfo) { 
	console.log(msg);
});