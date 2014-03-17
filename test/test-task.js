'use strict';

var _ = require('underscore');
var Task = require('../task').Task;

exports.newTask = function (test) {

  var task = new Task('MBI', '8:00', '9:15', 'foo, bar');

  test.equal(task.project, 'MBI');
  test.equal(task.time, 1.25);
  test.deepEqual(task.comments, ['foo', 'bar']);

  test.done();

};

exports.newTask_NoComments = function (test) {

  var task = new Task('MBI', '8:00', '9:15', '');

  test.equal(task.comments.length, 0);

  test.done();

};

exports.isBillable = function (test) {

  var task = new Task('Project A', '12:00', '12:30', 'Some comments');
  var task2 = new Task('Lunch', '12:00', '12:30', '');
  var task3 = new Task('Project B*', '12:00', '12:30', '');
  var task4 = new Task('Project B*', '12:00', '12:30', 'Some comments');

  test.equal(task.isBillable(), true, 'Tasks with comments should be billable');
  test.equal(task2.isBillable(), false, 'Tasks without comments should be non-billable');
  test.equal(task3.isBillable(), false, 'Tasks without comments should be non-billable');
  test.equal(task4.isBillable(), false, 'Tasks with an asterisk at the end should be non-billable');

  test.done();

};