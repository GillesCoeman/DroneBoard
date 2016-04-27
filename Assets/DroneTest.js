var osc = require('C:/Program Files/nodejs/node_modules/node-osc');
console.log('Fuck this shit');

//var arDrone = require('C:/Program Files/nodejs/node_modules/ar-drone');
//var client = arDrone.createClient();

var yaxes, xaxes, fly;

var oldMsg = false;
var oscServer = new osc.Server(3333, '0.0.0.0'); 
oscServer.on("message", function (msg, rinfo) { 
	if (msg[1] != oldMsg) {
		if (msg[1] == 'true') {
			console.log("Opstijgen");
			//client.takeoff();
		} else {
			console.log("Landen");
			//client.land();
		}
		oldMsg = msg[1];		
	} 
});