# Feature: Organization (Tagging)

The application includes a flexible tagging system to categorize tasks.

## 1. Creating Tags
- **Component**: `AddTodo.tsx` (Expandable "Tags" panel).
- **Process**: Users type a tag name and click "+ Create" or press ENTER.
- **Colors**: Tags are automatically assigned a random color from a curated palette.

## 2. Assigning Tags
- **Mechanism**: When adding a new task, users can select one or more existing tags from the expanded tags panel.
- **Display**: Assigned tags appear as colorful pills at the bottom of each task item.

## 3. Managing Tags
- **Deletion**: Tags can be deleted from the filter toolbar. 
- **Filtering by Tag**: Clicking a tag in the toolbar filters the task list to only show items containing that tag.
