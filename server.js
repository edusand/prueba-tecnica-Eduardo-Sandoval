const https = require("https");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;
const host = 'localhost';
const options = {
	key: fs.readFileSync("./env/server.key"),
	cert: fs.readFileSync("./env/server.cert")
};

app.use(express.static('./public/'));

https.createServer(options, app).listen(PORT, (req, res) => {
	console.log(`Server started https://${host}:${PORT}`);
});