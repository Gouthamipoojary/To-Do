# Feature: Statistics

A dashboard-like overview of the user's progress and task status.

## 1. Computed Metrics
- **Total Tasks**: Count of all tasks in the system.
- **Active**: Count of incomplete tasks.
- **Completed**: Count of tasks marked as done.
- **Overdue**: Count of incomplete tasks where the due date has passed.
- **Completion Rate**: A percentage representing (Completed / Total).

## 2. Display
- Metrics are shown in the `Header.tsx` component as a summary row, allowing users to quickly assess their productivity.
