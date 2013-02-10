Timesheet Processor
===================

This is a small command-line utility for processing my personal timesheets
into a format that makes it easier for me to submit to my corporate
time tracking system, by grouping projects and calculating time intervals.

I track my time in the following format:

```
Mon 1/28
[10:00-11:00] MBI: wrote some code, fixed bugs
[11:00-11:45] NAOP: tooltip design
[11:45-1:15] MBI: meeting
...
```

The output looks like so:

```
Mon 1/28
  MBI (2.5): wrote some code, fixed bugs, meeting
  NAOP (0.75): tooltip design
  ...
```

## Usage

Requires node.js.

```
node main timesheet.txt
```

## Tests

Running tests requires nodeunit.

```
nodeunit test
```

## License

This is free software, and may be redistributed under the MIT-LICENSE.