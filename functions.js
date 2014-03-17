'use strict';

var _ = require('underscore');
var Task = require('./task').Task;

var regex = {
  empty: /^\s*$/,
  date: /^[A-Za-z]{3} .*$/,
  task: /^\[(.+)-(.+)\] ([^:]+)(?:: )?(.*)$/
};

/// returns: task => { time, project, comments }
exports.createTask = function (text) {
  var parsed = regex.task.exec(text);

  var startTime = parsed[1];
  var endTime = parsed[2];
  var project = parsed[3];
  var comments = parsed[4];

  var task = new Task(project, startTime, endTime, comments);

  return task;
};

exports.getTextType = function (text) {
  if (regex.empty.test(text)) {
    return 'empty';
  }

  if (regex.date.test(text)) {
    return 'date';
  }

  if (regex.task.test(text)) {
    return 'task';
  }
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
      groupedTask.comments = _.union(groupedTask.comments, task.comments);

      groupedTasks[projectIndex] = groupedTask;

    }
  }

  return groupedTasks;
};

exports.getHoursForTasks = function (tasks) {
  var projectHours = 0; // Hours for tasks with comments
  var totalHours = 0; // Hours for all tasks

  for (var i in tasks) {
    var task = tasks[i];

    totalHours += task.time;

    if (task.isBillable()) {
      projectHours += task.time;
    }
  }

  return {
    projectHours: projectHours,
    totalHours: totalHours
  };
};