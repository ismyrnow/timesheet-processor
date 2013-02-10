var regex = {
	empty: /^\s*$/,
	date: /^[A-Za-z]{3} .*$/,
	task: /^\[(.+)-(.+)\] ([^:]+)(?:: )?(.*)$/
};

exports.createTask = function (text) {
	var parsed = regex.task.exec(text);

	var startTime = parsed[1];
	var endTime = parsed[2];

	var task = {
		time: exports.getElapsedTime(startTime, endTime),
		project: parsed[3],
		comments: parsed[4]
	};

	return task;
};

exports.getElapsedTime = function (startTime, endTime) {
	// Example: "12:45", "2:15" => 1.5
	var start = exports.getFractionalHour(startTime);
	var end = exports.getFractionalHour(endTime);

	if (end < start) {
		end += 12; // end is PM, start is AM
	}

	return end - start;
};

exports.getFractionalHour = function (timeString) {
	// Example: "8:45" => 8.75
	var timeArray = timeString.split(":");
	var hour = parseInt(timeArray[0], 10);
	var minute = parseInt(timeArray[1], 10) / 60;

	return hour + minute;
};

exports.getTextType = function (text) {
	if (regex.empty.test(text)) return "empty";

	if (regex.date.test(text)) return "date";

	if (regex.task.test(text)) return "task";
};

exports.getGroupedTasks = function (tasks) {
	var groupedTasks = [];
	var projects = [];

	for (var i in tasks) {
		var task = tasks[i];
		var projectIndex = projects.indexOf(task.project);

		if (projectIndex === -1) {

			projects.push(task.project);
			groupedTasks.push(task);

		} else {

			var groupedTask = groupedTasks[projectIndex];

			groupedTask.time += task.time;
			groupedTask.comments += ", " + task.comments;

			groupedTasks[projectIndex] = groupedTask;

		}
	}

	return groupedTasks;
};