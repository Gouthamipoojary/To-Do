# Feature: Search and Filtering

Efficiency features to help users find specific tasks in a large list.

## 1. Text Search
- **Component**: `Toolbar.tsx`
- **Mechanism**: Real-time filtering as the user types.
- **Scope**: Matches against task `text` and `notes`.

## 2. Status Filtering
- **Tabs**: 
  - **All**: Shows every task.
  - **To Do**: Shows only incomplete tasks.
  - **Done**: Shows only completed tasks.

## 3. Clear Completed
- **Action**: A "Clear done" button appears when there are completed tasks.
- **Logic**: Quickly removes all tasks marked as completed in a single click.
