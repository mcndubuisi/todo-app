//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// set up ejs view engine
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");


var task = ["Send Email to Mark", "Discuss Performance with Manager"];

var complete = ["Completed Task"];


app.post("/addtask", function (req, res) {
	var newTask = req.body.newtask;

	task.push(newTask);
	res.redirect("/");
});

app.post("/removetask", function (req, res) {
	var completeTask = req.body.check;

	if (typeof completeTask === "string") {
		complete.push(completeTask);

		task.splice(task.indexOf(completeTask), 1);
	} else if (typeof completeTask === "object") {
		for (var i = 0; i < completeTask.length; i++) {
			complete.push(completeTask[i]);
			task.splice(task.indexOf(completeTask[i]), 1);
		}
	}
	res.redirect("/");
});

app.get("/", function (req, res) {
	res.render("index", {
		task: task,
		complete: complete
	});
});

app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
