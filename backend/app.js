//this file will hold the express app, which is still a nodejs server side app
const express = require('express');
const bodyParser = require('body-parser');//to parse the data coming from the POST requests

const app = express();//this will give us an express app

//app.use is the middleware

// //next function is to let the request continue it's journey in this file
// app.use((req, res, next) => {
// 	console.log('First middleware');
// 	next();
// });

// app.use((req, res, next) => {
// 	res.send('Hello from express!');//to send back the response for an incoming request
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//To remove CORS error, and to connect angular app with node express server
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

//syntax -> app.method(path, handler), where method is one of the HTTP methods 
//path is the relative pth in the server
//handler is a function that express calls when the route is matched

//middleware triggered for post requests
app.post("/api/posts", (req, res, next) => {
	const post = req.body;
	console.log(post);
	res.status(201).json({
		message: 'Post added successfully',
	});
});

//adding posts as arguement will mean that only requests
//targeting localhost:3000/posts will reach this middleware
//and all other requests will go into the void 
app.get('/api/posts', (req, res, next) => {
	//javascript array
	//we got two dummy posts, later
	//these will be coming from a database of course.
	const posts = [
		{
			id: "random12343testing", 
			title: "First server-side post",
			content: 'This is coming from the server'
		},
		{
			id: "randomrandom12343testing", 
			title: "Second server-side post",
			content: 'This is coming from the server!'
		}
	];

	//to return json data
	return res.status(200).json({
		message: 'Posts fetched successfully', //key: 'value' pair
		posts: posts
	});

});

module.exports = app;//to export the above entire express app
					//into server.js