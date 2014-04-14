Timesheet Processor
===================

This is a small command-line utility for processing my personal timesheets
into a format that makes it easier for me to submit to my company's
time tracking system, by grouping projects and calculating time intervals.

I track my time in the following format:

```
Mon 1/28
[9:00-12:00] MBI: wrote some code, fixed bugs
[12:00-12:30] Lunch
[12:30-5:00] MBI: meeting, fixed bugs
```

The output looks like so:

```
Mon 1/28 (7.5 / 8)
  MBI (7.5): wrote some code, fixed bugs, meeting
  Lunch (0.5)
  ...
```

Projects are grouped, identical task comments are removed, and tasks with
no comments are considered non-billable.

Hours are reported for the whole timesheet, as well as each day, showing
both non-billable time, and total time.

## Usage

Requires nodejs v0.8+.

```
node main timesheet.txt
```

## Tests

Running tests requires nodeunit.

```
npm test
```

## License

This is free software, and may be redistributed under the MIT-LICENSE.