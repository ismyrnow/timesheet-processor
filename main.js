var fs = require("fs");

var dates = {};
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

})();

function processLine (line) {
	var text = line.toString().replace(/[\r\n]/g, "");

	if (regex.empty.test(text)) return;

	if (regex.date.test(text)) storeDate(text);

	if (regex.task.test(text)) storeTask(text);
}

function storeDate (text) {
	dates[text] = dates[text] || [];
	dates.current = text;
}

function storeTask (text) {
	var parsed = regex.task.exec(text);	
	var task = {
		startTime: parsed[1],
		endTime: parsed[2],
		project: parsed[3],
		comments: parsed[4]
	};

	dates[dates.current].push(task);
}

function printResults () {
	console.log(dates);
}