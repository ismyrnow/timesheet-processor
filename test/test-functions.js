var _ = require("underscore");
var fn = require("../functions");

exports.getFractionalHour = function (test) {
    test.equal(fn.getFractionalHour("8:15"), 8.25);
    test.done();
};

exports.getElapsedTime = function (test) {
	test.equal(fn.getElapsedTime("12:45", "2:15"), 1.5);
	test.done();
};

exports.parseComments = function (test) {
	var string = "foo, bar, foo,roh, dah";
	var array = fn.parseComments(string);

	test.equal(array instanceof Array, true);
	test.equal(array.length, 4);
	test.equal(array[0], "foo");
	test.equal(array[1], "bar");
	test.equal(array[2], "roh");
	test.equal(array[3], "dah");

	test.done();
};

exports.parseComments_Empty = function (test) {
	var string = "";
	var array = fn.parseComments(string);

	test.equal(array instanceof Array, true);
	test.equal(array.length, 0, "result should be an empty array");

	test.done();
};

exports.createTask = function (test) {
	var text = "[12:45-4:00] MBI: offline wizard, deploy";
	var task = fn.createTask(text);

	test.equal(task.time, "3.25");
	test.equal(task.project, "MBI");
	test.equal(task.comments.length, 2);
	test.equal(task.comments[0], "offline wizard");
	test.equal(task.comments[1], "deploy");

	test.done();
};

exports.createTask_NoComments = function (test) {
	var text = "[12:30-1:00] Lunch";
	var task = fn.createTask(text);

	test.equal(task.project, "Lunch");
	test.equal(task.comments.length, 0, "comments should be an empty array");

	test.done();
};

exports.getTextType = function (test) {
	test.equal(fn.getTextType("[12:45-4:00] MBI: offline wizard"), "task");
	test.equal(fn.getTextType("Mon 1/28"), "date");
	test.equal(fn.getTextType(""), "empty");

	test.equal(fn.getTextType("[12:45-1:15] Lunch"), "task");

	test.done();
};

exports.getGroupedTasks = function (test) {
	var tasks = [
		{ project: "MBI", time: 1.5, comments: ["a", "b"] },
		{ project: "WGA", time: 0.75, comments: ["c", "d"] },
		{ project: "Lunch", time: 0.5, comments: [] },
		{ project: "MBI", time: 2.25, comments: ["e"] }
	];
	var groupedTasks = fn.getGroupedTasks(tasks);

	test.equal(groupedTasks.length, 3);

	var mbiTask = _.findWhere(groupedTasks, { project: "MBI" });

	test.equal(mbiTask.time, 3.75);
	test.equal(mbiTask.comments.length, 3);

	test.done();
};

exports.getHoursForTasks = function (test) {
	var tasks = [
		{ project: "MBI", time: 1.5, comments: ["a, b"] },
		{ project: "Foo", time: 0.25, comments: [] },
		{ project: "Lunch", time: 0.75, comments: [] },
		{ project: "MBI", time: 2.25, comments: ["e"] }
	];
	var hours = fn.getHoursForTasks(tasks);

	test.equal(hours.totalHours, 4.75);
	test.equal(hours.projectHours, 3.75);

	test.done();
};