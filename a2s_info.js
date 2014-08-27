var dgram = require('dgram');

var createRequest = function(type, id, body) {
 
	var size   = Buffer.byteLength(body) + 14,
	    buffer = new Buffer(size);
 
	buffer.writeInt32LE(size - 4, 0);
	buffer.writeInt32LE(id,       4);
	buffer.writeInt32LE(type,     8);
	buffer.write(body, 12, size - 2, "ascii");
	buffer.writeInt16LE(0, size - 2);
 
	return buffer;
}; 
var readResponse = function(buffer) {
 
	var response = {
		size: buffer.readInt32LE(0),
		id:   buffer.readInt32LE(4),
		type: buffer.readInt32LE(8),
		body: buffer.toString("ascii", 12, data.length - 2)
	};
 
	return response;
};

var port = 27051;
var host = IP;

PACKETS = {
  info: new Buffer(["0xff", "0xff", "0xff", "0xff", "0x54", "0x53", "0x6f", "0x75", "0x72", "0x63", "0x65", "0x20", "0x45", "0x6e", "0x67", "0x69", "0x6e", "0x65", "0x20", "0x51", "0x75", "0x65", "0x72", "0x79", "0x00"])
};

var client = dgram.createSocket('udp4');

client.on('message', function (msg, rinfo) {
  console.log('response');
  console.log(msg.toString());
});

client.on('listening', function () {
  console.log('listening');
  console.log(client.address());
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

client.bind(port);

client.send(PACKETS.info, 0, PACKETS.info.length, port, host, function () {
  console.log('message delivered');
});  
