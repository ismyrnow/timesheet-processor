'use strict';

var _ = require('underscore');
var fn = require('../functions');
var Task = require('../task').Task;

exports.createTask = function (test) {
  var text = '[12:45-4:00] MBI: offline wizard, deploy';
  var task = fn.createTask(text);

  test.equal(task instanceof Task, true, 'Return type should be a Task');

  test.done();
};

exports.createTask_NoComments = function (test) {
  var text = '[12:30-1:00] Lunch';
  var task = fn.createTask(text);

  test.equal(task.project, 'Lunch');
  test.equal(task.comments.length, 0, 'comments should be an empty array');

  test.done();
};

exports.getTextType = function (test) {
  test.equal(fn.getTextType('[12:45-4:00] MBI: offline wizard'), 'task');
  test.equal(fn.getTextType('Mon 1/28'), 'date');
  test.equal(fn.getTextType(''), 'empty');

  test.equal(fn.getTextType('[12:45-1:15] Lunch'), 'task');

  test.done();
};

exports.getGroupedTasks = function (test) {
  var tasks = [
    new Task('MBI', '9:00', '10:15', 'a, b'),
    new Task('WGA', '10:15', '11:00', 'c, d'),
    new Task('Lunch', '11:00', '11:30', ''),
    new Task('MBI', '11:30', '2:00', 'e')
  ];
  var groupedTasks = fn.getGroupedTasks(tasks);

  test.equal(groupedTasks.length, 3);

  var mbiTask = _.findWhere(groupedTasks, { project: 'MBI' });

  test.equal(mbiTask.time, 3.75);
  test.equal(mbiTask.comments.length, 3);

  test.done();
};

exports.getHoursForTasks = function (test) {
  var tasks = [
    new Task('MBI', '9:00', '10:15', 'a, b'),
    new Task('WGA', '10:15', '11:00', 'c, d'),
    new Task('Lunch', '11:00', '11:30', ''),
    new Task('MBI', '11:30', '2:00', 'e')
  ];
  var hours = fn.getHoursForTasks(tasks);

  test.equal(hours.totalHours, 5);
  test.equal(hours.projectHours, 4.5);

  test.done();
};