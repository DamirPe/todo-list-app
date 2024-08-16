```markdown
# Todo List Application

A simple, intuitive, and responsive todo list application to manage your daily tasks.

## Installation

### Prerequisites

- Node.js (v18.x or later)
- npm (v8.x or later)

### Steps

1. Clone the repository
    ```bash
    git clone https://github.com/DamirPe/todo-list-app.git
    ```
2. Navigate to the project directory
    ```bash
    cd todo-list-app
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Start the application
    ```bash
    npm run dev
    ```

## Usage

After starting the application, open your browser and navigate to `http://localhost:5173`.

### Adding Tasks

- First input is a number input made for adding randomly generated tasks.
- Enter number(no more than 10 can be generated at onece) of randomly task in the input field. 
- Click the "Add" button to add the task.

- Second input is for manualy adding tasks.
- Enter a task in the input field.
- Click the "Add" button to add the task.

### Deleting Tasks

- To delete a single task, click the trash icon next to the task.
- To delete all tasks, use the "Delete All Tasks" button.
- To delete all manually added tasks, use the "Delete All Manually Added Tasks" button.
- To delete all API-generated tasks, use the "Delete All API Tasks" button.
- The "Delete All Tasks," "Delete All Manually Added Tasks," and "Delete All API Tasks" buttons only appear when there are tasks that can be deleted using those buttons.

## Features

- Add and manage tasks
- Filter tasks by status (all, completed, active)
- Responsive design

## Drag and Drop

- Dragging: Users can click and hold on a task to initiate the drag action.
- Dropping: Once the task is dragged to the desired position, releasing the mouse button will drop the task in the new position, automatically updating the order of tasks in the list.


## Contact

For any questions or feedback, reach out:

- Email: damir.penavic@gmail.com