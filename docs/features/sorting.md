# Feature: Sorting

The task list can be ordered using multiple criteria to suit different workflows.

## 1. Sort Options
- **Newest first**: Primary sort by creation timestamp (default).
- **By priority**: Orders high → medium → low.
- **By due date**: Orders by upcoming deadlines.
- **A → Z**: Alphabetical sorting by task text.

## 2. Sort Logic
- Handled in `utils/index.ts` via the `sortTodos` helper.
- Supports both ascending and descending orders (via reducer state).
