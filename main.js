var fs = require("fs");

var dates = {};
var currentDate;
var regex = {
	empty: /^\s*$/,
	date: /^[A-Za-z]{3} .*$/,
	task: /^\[(.+)-(.+)\] (.+): (.+)$/
};

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
			// TODO: do some fancyness to combine matching projects
		}
	}

	printResults();

}());

function processLine (line) {
	var text = line.toString().replace(/[\r\n]/g, "");

	if (regex.empty.test(text)) return;

	if (regex.date.test(text)) storeDate(text);

	if (regex.task.test(text)) storeTask(text);
}

function storeDate (text) {
	dates[text] = dates[text] || [];
	currentDate = text;
}

function storeTask (text) {
	var task = createTask(text);

	dates[currentDate].push(task);
}

function printResults () {
	console.log(dates);
}


// Exports
// -------

function createTask(text) {
	var parsed = regex.task.exec(text);

	var startTime = parsed[1];
	var endTime = parsed[2];

	var task = {
		time: getElapsedTime(startTime, endTime),
		project: parsed[3],
		comments: parsed[4]
	};

	return task;
}

function getElapsedTime(startTime, endTime) {
	// Example: "12:45", "2:15" => 1.5
	var start = getFractionalHour(startTime);
	var end = getFractionalHour(endTime);

	if (end < start) {
		end += 12; // end is PM, start is AM
	}

	return end - start;
}

function getFractionalHour(timeString) {
	// Example: "8:45" => 8.75
	var timeArray = timeString.split(":");
	var hour = parseInt(timeArray[0], 10);
	var minute = parseInt(timeArray[1], 10) / 60;

	return hour + minute;
}

exports.getFractionalHour = getFractionalHour;
exports.getElapsedTime = getElapsedTime;
exports.createTask = createTask;