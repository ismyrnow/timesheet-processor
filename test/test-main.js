var main = require("../main");

exports.getFractionalHour = function (test) {
    test.equal(main.getFractionalHour("8:15"), 8.25);
    test.done();
};

exports.getElapsedTime = function (test) {
	test.equal(main.getElapsedTime("12:45", "2:15"), 1.5);
	test.done();
};

exports.createTask = function (test) {
	var text = "[12:45-4:00] MBI: offline wizard, deploy";
	var task = main.createTask(text);

	test.equal(task.time, "3.25");
	test.equal(task.project, "MBI");
	test.equal(task.comments, "offline wizard, deploy");

	test.done();
};