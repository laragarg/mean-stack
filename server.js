// //this file is to listen the incoming requests via app.js
// // this is the server file

//below code was added directly in lesson 37
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http"); //http is the module name which provides the createServer function

//normalizePort function is to make sure that when we try to set up
//a port and especially when we receive it through an environment variable, 
//we actually make sure it's a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//these all are the arrow functions
//error function to check which typw of error occured
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};


const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);//set up the node server

//following 2 functions are to tell if everything went smooth on starting the server
server.on("error", onError);
server.on("listening", onListening);

server.listen(port);//to set the port number of the server


