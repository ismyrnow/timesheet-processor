'use strict';

var fs = require('fs');
var printf = require('util').format;
var fn = require('./functions');

var dates = {};
var currentDate;

(function main() {

  if (process.argv.length < 3) {
    console.log('Usage: "node main <path>"');
    process.exit(1);
  }

  var filename = process.argv[2];

  if (!fs.existsSync(filename)) {
    console.log('File not found.');
    process.exit(1);
  }

  fs.readFileSync(filename).toString().split('\r\n').forEach(processLine);

  var allTasks = [];

  for (var date in dates) {
    if (dates.hasOwnProperty(date)) {

      var tasks = dates[date];
      var groupedTasks = fn.getGroupedTasks(tasks);

      printTasks(date, groupedTasks);

      allTasks = allTasks.concat(groupedTasks);
    }
  }
  
  console.log('');

  printTotalHours(allTasks);
}());

function processLine(line) {
  var text = line.toString().replace(/[\r\n]/g, '');

  var type = fn.getTextType(text);

  switch (type) {
    case 'empty':
      return;
    case 'date':
      dates[text] = dates[text] || [];
      currentDate = text;
      break;
    case 'task':
      var task = fn.createTask(text);
      dates[currentDate].push(task);
      break;
  }
}

function printTasks(date, tasks) {
  var hours = fn.getHoursForTasks(tasks, fn.roundHours);

  console.log('\n%s (%d / %d)\n',
    date, hours.projectHours, hours.totalHours);

  for (var i in tasks) {
    var task = tasks[i];
    printTask(task);
  }
}

function printTask(task) {
  var output = printf('  %s (%d)', task.project, fn.roundHours(task.time));

  if (task.comments.length) {
    output += ': ' + task.comments.join(', ');
  }

  console.log(output);
}

function printTotalHours(tasks) {
  var hours = fn.getHoursForTasks(tasks, fn.roundHours);
  
  console.log('Total Hours: %d / %d',
    fn.roundHours(hours.projectHours),
    fn.roundHours(hours.totalHours));
}