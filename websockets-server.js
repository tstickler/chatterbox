var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({port: port});

var messages = [];
var topic = "Talking about cats";

console.log("Websockets server started");

ws.on("connection", function (socket) {
  console.log("client connection established");
  socket.send("*** Topic is " + "\"" + topic + "\"");

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on("message", function (data) {
      console.log("message received: " + data);

      // Check if changing topic
      var messageStart = data.substring(0, 6).toLowerCase();
      if (messageStart == "/topic") {
        changedTopic(data.substring(7));
        return;
      }

      console.log(data.substring(0, 6));
      messages.push(data);
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(data);
      });
  });

  var changedTopic = function (newTopic) {
    topic = newTopic;

    ws.clients.forEach(function (clientSocket) {
      clientSocket.send("*** Topic has changed to " + "\"" + newTopic + "\"");
    });
  };
});
