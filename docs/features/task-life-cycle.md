# Feature: Task Life Cycle

This document describes the core task management operations in the To-Do application.

## 1. Adding a Task
- **Component**: `AddTodo.tsx`
- **Action**: Users can enter task text and press ENTER or click the "+ Add" button.
- **Details**: The application validates that the text is not empty before submitting.

## 2. Toggling Completion
- **Component**: `TodoItem.tsx`
- **Action**: Clicking the circular checkbox next to a task toggles its `completed` status.
- **Visuals**: Completed tasks are struck through and have reduced opacity. A "pop" animation is triggered when marking as done.

## 3. Editing a Task
- **Component**: `TodoItem.tsx`
- **Action**: Double-clicking the task text or clicking the ✏️ icon.
- **Details**: Inline editing is supported. Pressing ENTER or blurring the input saves the change. ESC cancels editing.

## 4. Deleting a Task
- **Component**: `TodoItem.tsx`
- **Action**: Clicking the 🗑 icon next to a task.
- **Flow**: The task is immediately removed from the state and storage.
