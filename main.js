var fs = require("fs");
var fn = require("./functions");

var dates = {};
var currentDate;

(function main () {

	if (process.argv.length < 3) {
		console.log("Usage: node " + process.argv[1] + " FILENAME");
		process.exit(1);
	}

	var filename = process.argv[2];

	fs.readFileSync(filename).toString().split("\r\n").forEach(processLine);

	for (var date in dates) {
		if (dates.hasOwnProperty(date)) {

			var tasks = dates[date];
			var groupedTasks = fn.getGroupedTasks(tasks);

			printTasks(groupedTasks);
		}
	}

}());

function processLine (line) {
	var text = line.toString().replace(/[\r\n]/g, "");

	var type = fn.getTextType(text);

	switch (type) {
		case "empty":
			return;
		case "date":
			dates[text] = dates[text] || [];
			currentDate = text;
			break;
		case "task":
			var task = fn.createTask(text);
			dates[currentDate].push(task);
			break;
	}
}

function printTasks(tasks) {
	console.log(tasks);
}