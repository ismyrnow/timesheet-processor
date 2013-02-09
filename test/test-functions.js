var fn = require("../functions");

exports.getFractionalHour = function (test) {
    test.equal(fn.getFractionalHour("8:15"), 8.25);
    test.done();
};

exports.getElapsedTime = function (test) {
	test.equal(fn.getElapsedTime("12:45", "2:15"), 1.5);
	test.done();
};

exports.createTask = function (test) {
	var text = "[12:45-4:00] MBI: offline wizard, deploy";
	var task = fn.createTask(text);

	test.equal(task.time, "3.25");
	test.equal(task.project, "MBI");
	test.equal(task.comments, "offline wizard, deploy");

	test.done();
};

exports.getTextType = function (test) {
	test.equal(fn.getTextType("[12:45-4:00] MBI: offline wizard"), "task");
	test.equal(fn.getTextType("Mon 1/28"), "date");
	test.equal(fn.getTextType(""), "empty");

	test.done();
};

exports.getGroupedTasks = function (test) {
	var tasks = [
		{ project: "MBI", time: 1.5, comments: "a, b" },
		{ project: "Lunch", time: 0.75, comments: "c, d" },
		{ project: "MBI", time: 2.25, comments: "e" }
	];
	var groupedTasks = fn.getGroupedTasks(tasks);

	test.equal(groupedTasks.length, 2);
	
	var mbiTask = (groupedTasks[0].project === "MBI") ?
		groupedTasks[0] : groupedTasks[1];

	test.equal(mbiTask.time, 3.75);
	test.equal(mbiTask.comments, "a, b, e");

	test.done();
};