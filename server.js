var Express = require("express");
var BodyParser = require("body-parser");

// require routes

var Cors = require("cors");

var hostname = "localhost";

var port = 3000;

var app = Express();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use("/client", require("./router/client"));
app.use("/user", require("./router/user"));
app.use("/produit", require("./router/produit"));
app.use("/command", require("./router/command"));

app.listen(port, hostname, function() {
    console.log("server start on http://" + hostname + ":" + port + "\n");
});