console.log('V1.1');

// Importeer Modules
var osc = require('C:/Program Files/nodejs/node_modules/node-osc');
var arDrone = require('C:/Program Files/nodejs/node_modules/ar-drone');

// Stel de modules in voor gebruik
var client = arDrone.createClient();
var oscServer = new osc.Server(3333, '0.0.0.0');

// Maak de vier vaste variablen aan.
var fly = false, yaxes = 0, xaxes = 0, jump = false;
var oFly = false, oYaxes = 0, oXaxes = 0, oJump = false;

// Luister naar de UDP OSC stream
oscServer.on("message", function (msg, rinfo) { 
	// Converteer de waarden naar 
	if (msg[0] == '/fly')
		fly = msg[1];

	if (msg[0] == '/yaxes')
		yaxes = Math.round(((msg[1] / 20) - 1) * 100) / 100;

	if (msg[0] == '/xaxes')
		xaxes = Math.round(((msg[1] / 20) - 1) * 100) / 100;

	if (msg[0] == '/jump')
		jump = msg[1];

	console.log(fly, yaxes, xaxes, jump);

	flyDrone(fly, yaxes, xaxes, jump);
});

function flyDrone(fly, yaxes, xaxes, jump){
	if (fly != oFly) {
		if (fly == 'true') {
			console.log("Opstijgen ...");
			client.takeoff();
		} else {
			console.log("Landen ...");
			client.stop();
		}

		oFly = fly;
	}

	if (yaxes != oYaxes) {
		if (yaxes >= 0)
			client.front(yaxes);
		else
			client.back(-yaxes);

		yaxes = oYaxes;
	}

	if (xaxes != oXaxes) {
		if (xaxes >= 0)
			client.right(xaxes);
		else
			client.left(-xaxes);

		xaxes = oXaxes;
	}
}
