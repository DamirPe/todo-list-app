import '../TodoItem/todoItem'; // Import the TodoItem component

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const template = document.createElement('template');

template.innerHTML = `
<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

  body {
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .todo-list__items {
    font-family: 'Lato', sans-serif;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .todo-list__header {
    margin-bottom: 10px;
    text-align: center;
    align-items: center;
  }

  #todo-list__input--new-task, #todo-list__input--api-count {
    width: fill;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }

  #todo-list__input--new-task:focus, #todo-list__input--api-count:focus {
    border-color: #4CAF50;
    box-shadow: 0 0px 2px #4CAF50;
  }

  #todo-list__button--add-task, #todo-list__button--add-api-task {
    padding: 10px 20px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex
  }

  #todo-list__button--add-task:hover, #todo-list__button--add-api-task:hover {
    background-color: #45a049;
  }

  .todo-list__items li {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    cursor: move;
  }

  .todo-list__item--api {
    background-color: #e0f7fa;
  }

  .todo-list__item--manual {
    background-color: #f1f8e9;
  }

  .todo-list__button--delete:hover {
    background-color: #ff1a1a;
  }

  .todo-list__button--delete {
    border: none;
    background-color: #ff4d4d;
    color: white;
    border-radius: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 0.5em;
    margin-bottom: 0.5rem;
  }

  .todo-list__button--delete-manual:hover, .todo-list__button--delete-api:hover {
    background-color: #ff1a1a;
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:focus {
    outline: none;
  }

  .todo-list__item--api {
    font-style: italic;
    color: #0015b9;
  }

  .todo-list__item--manual{
    color: #009d2e;
  }

  .todo-list__header div {
    margin: 0.5em;
    color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    text-align: left;
  }

  .todo-list__header div input {
    width: 100%;
  }

  .todo-list__title {
    font-size: 2rem;
    display: flex;
    align-items: center;
  }

  .todo-list__delete-controls div {
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 0.2em;
  }

  .todo-list__header-title {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .hidden {
    display: none;
  }

  .visible {
    display: block;
  }

  .todo-list__stats {
    display: flex;
    justify-content: center;
  }

  .todo-list__stats div {
    margin: 0.5em;
    padding: 0.5em;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .todo-list__stats div:hover {
    cursor: pointer;
    color: white;
    background-color: #739cd5;
    border: none;
  }

  .todo-list__filter--active {
    cursor: pointer;
    color: white;
    background-color: #739cd5;
    border: none;
  }

  /* Message Styles for Success and Error */
  .message {
      color: white;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      transition: opacity 0.3s ease-in-out;
      opacity: 1;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
  }

  .message.hidden {
      opacity: 0;
  }

  .message.success {
      background-color: #4CAF50; 
  }

  .message.error {
      background-color: #f44336;
  }

  .todo-list__input-container {
    width: 50%;
  }

  todo-item {
    cursor: grab;
  }

  #todo-list__placeholder {
   text-align: center;
  }

  #delete-all {
    margin-bottom: 0px;
  }

  /* Modal Styles */
  .modal {
    display: none; 
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal__content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 300px;
    border-radius: 8px;
    text-align: center;
  }

  .modal__buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .modal__buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .modal__buttons .modal__button--confirm {
    background-color: #4CAF50;
    color: white;
  }

  .modal__buttons .modal__button--confirm:hover {
    background-color: #45a049;
  }

  .modal__buttons .modal__button--cancel {
    background-color: #ff4d4d;
    color: white;
  }

  .modal__buttons .modal__button--cancel:hover {
    background-color: #ff1a1a;
  }

  #hide-input-description-3, #hide-input-description-4 {
    display: none;
  }

  @media(max-width: 600px){
    .todo-list__input-group {
      display: flex;
      flex-direction: column;
    }

    #hide-input-description-1, #hide-input-description-2 {
      display: none;
    }

    #hide-input-description-3, #hide-input-description-4 {
    display: block;
    }

    .todo-list__stats div {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  todo-item {
    transition: transform 0.2s ease, opacity 0.2s ease;
  } 

  .dragging {
    transform: scale(1.05);
    opacity: 0.8;
  }

  ul {
    padding: 0px;
  }

</style>
<div class="todo-list__items">
  <div class="todo-list__header-title">
    <div class="todo-list__title">To-Do List</div>
  </div>
  <div class="todo-list__header">
    <div class="todo-list__input-group">
      <div id="hide-input-description-3" class="input-description">
        Add randomly generated To-Do tasks. Maximum number is 10.
      </div>
      <div class="todo-list__input-container">
        <input type="number" id="todo-list__input--api-count" placeholder="Number of randomly generated tasks">
        <button id="todo-list__button--add-api-task"><i class="fa-solid fa-plus"></i>&nbsp;Add</button>
      </div>
      <div id="hide-input-description-1" class="input-description">
        Add randomly generated To-Do tasks. Maximum number is 10.
      </div>
    </div>
    <div class="todo-list__input-group">
      <div id="hide-input-description-4" class="input-description">
          Add a new taks to the list.
      </div>
      <div class="todo-list__input-container">
        <input type="text" id="todo-list__input--new-task" placeholder="Add a new task">
        <button id="todo-list__button--add-task"><i class="fa-solid fa-plus"></i>&nbsp;Add</button>
      </div>
      <div id="hide-input-description-2" class="input-description">
          Add a new taks to the list.
      </div>
    </div>
  </div>
  <div class="todo-list__stats">
    <div id="show-all-btn">Total&nbsp;(<span id="total-tasks">0</span>)</div>
    <div id="show-completed-btn">Completed&nbsp;(<span id="completed-tasks">0</span>)</div>
    <div id="show-active-btn">Active&nbsp;(<span id="active-tasks">0</span>)</div>
  </div>

  <ul id="todo-list__items">
    <!-- To-do items added here -->
  </ul>

  <div id='todo-list__placeholder'>
    There are currently no tasks available
  </div>

  <div class="todo-list__delete-controls">
    <div class="button-container">
      <button class="todo-list__button--delete todo-list__button--delete-manual"><i class="fa-solid fa-trash"></i> Delete All Manually Added Tasks</button>
    </div>
    <div class="delete-all-button">
      <button class="todo-list__button--delete todo-list__button--delete-api"><i class="fa-solid fa-trash"></i> Delete All API Tasks</button>
    </div>
    <div class="button-container">
      <button id="delete-all" class="todo-list__button--delete delete-all-btn"><i class="fa-solid fa-trash"></i> Delete All Tasks</button>
    </div>
  </div>
</div>

<!-- Message Element for Success and Error -->
<div id="message" class="message hidden">
  <!-- The text content will be dynamically updated -->
</div>

<!-- Confirmation Modals -->

  <!-- Delete All Tasks Modal -->
  <div id="delete-confirmation-modal" class="modal">
    <div class="modal__content">
      <p>Are you sure you want to delete all tasks?</p>
      <div class="modal__buttons">
        <button id="confirm-delete-all" class="modal__button--confirm">Yes</button>
        <button id="cancel-delete-all" class="modal__button--cancel">No</button>
      </div>
    </div>
  </div>

  <!-- Delete All API Tasks Modal -->
  <div id="delete-api-confirmation-modal" class="modal">
    <div class="modal__content">
      <p>Are you sure you want to delete all API tasks?</p>
      <div class="modal__buttons">
        <button id="confirm-delete-api" class="modal__button--confirm">Yes</button>
        <button id="cancel-delete-api" class="modal__button--cancel">No</button>
      </div>
    </div>
  </div>

  <!-- Delete All Manually Added Tasks Modal -->
  <div id="delete-manual-confirmation-modal" class="modal">
    <div class="modal__content">
      <p>Are you sure you want to delete all manually added tasks?</p>
      <div class="modal__buttons">
        <button id="confirm-delete-manual" class="modal__button--confirm">Yes</button>
        <button id="cancel-delete-manual" class="modal__button--cancel">No</button>
      </div>
    </div>
  </div>
</div>
`;

export class TodoList extends HTMLElement {
    private draggedItem: HTMLElement | null = null;
    private showAllBtn: HTMLDivElement | null;
    private showCompletedBtn: HTMLDivElement | null;
    private showActiveBtn: HTMLDivElement | null;
    private currentFilter: 'all' | 'completed' | 'active' = 'all';

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));

        this.showAllBtn = shadow.querySelector('#show-all-btn');
        this.showCompletedBtn = shadow.querySelector('#show-completed-btn');
        this.showActiveBtn = shadow.querySelector('#show-active-btn');

        // Handle adding new tasks
        const addTodoBtn = shadow.querySelector('#todo-list__button--add-task') as HTMLButtonElement | null;
        if (addTodoBtn) {
            addTodoBtn.addEventListener('click', () => {
                this.addNewTask();
                this.updateTaskCounters();
            });
        }

        // Handle adding new tasks with Enter key press
        const inputElement = shadow.querySelector('#todo-list__input--new-task') as HTMLInputElement | null;
        if (inputElement) {
            inputElement.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    this.addNewTask();
                    this.updateTaskCounters();
                }
            });
        }

        // Handle fetching and adding API tasks
        const addTodoApiItemsBtn = shadow.querySelector('#todo-list__button--add-api-task') as HTMLButtonElement | null;
        if (addTodoApiItemsBtn) {
            addTodoApiItemsBtn.addEventListener('click', () => {
                this.addApiTasks().then(() => this.updateTaskCounters());
            });
        }

        // Handle fetching and adding API tasks with Enter key press
        const inputElementApi = shadow.querySelector('#todo-list__input--api-count') as HTMLInputElement | null;
        if (inputElementApi) {
            inputElementApi.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    this.addApiTasks().then(() => this.updateTaskCounters());
                }
            });
        }

        // // Handle deleting all tasks
        // const deleteAllBtn = shadow.querySelector('.delete-all-btn') as HTMLButtonElement | null;
        // if (deleteAllBtn) {
        //     deleteAllBtn.addEventListener('click', () => {
        //         this.deleteAllTasks();
        //         this.updateTaskCounters();
        //     });
        // }

        // // Handle deleting all manually added tasks
        // const deleteAllManualBtn = shadow.querySelector('.todo-list__button--delete-manual') as HTMLButtonElement | null;
        // if (deleteAllManualBtn) {
        //     deleteAllManualBtn.addEventListener('click', () => {
        //         this.deleteAllManualTasks();
        //         this.updateTaskCounters();
        //     });
        // }

        // // Handle deleting all API tasks
        // const deleteAllApiBtn = shadow.querySelector('.todo-list__button--delete-api') as HTMLButtonElement | null;
        // if (deleteAllApiBtn) {
        //     deleteAllApiBtn.addEventListener('click', () => {
        //         this.deleteAllApiTasks();
        //         this.updateTaskCounters();
        //     });
        // }

        // Handle updating task count after deleting a single task
        const todoListContainer = shadow.querySelector('#todo-list__items') as HTMLUListElement | null;
        if (todoListContainer) {
            todoListContainer.addEventListener('click', () => {
                this.updateTaskCounters();
                this.filterTasks(this.currentFilter);
            });
        }

        // Handle filtering tasks
        if (this.showAllBtn) {
          this.showAllBtn.addEventListener('click', () => {
            this.filterTasks('all');
            this.currentFilter = 'all' ;
          });
        }

        if (this.showCompletedBtn) {
            this.showCompletedBtn.addEventListener('click', () => {
              this.filterTasks('completed');
              this.currentFilter = 'completed' ;
            });
        }

        if (this.showActiveBtn) {
            this.showActiveBtn.addEventListener('click', () => {
              this.filterTasks('active');
              this.currentFilter = 'active' ;
            });
        }

        // Handle drag-and-drop events
        if (todoListContainer) {
            todoListContainer.addEventListener('dragstart', (event: DragEvent) => this.handleDragStart(event));
            todoListContainer.addEventListener('dragover', (event: DragEvent) => this.handleDragOver(event));
            todoListContainer.addEventListener('drop', (event: DragEvent) => this.handleDrop(event));
        }

        // Handle deleting all tasks with confirmation modal
        const deleteAllBtn = shadow.querySelector('#delete-all') as HTMLButtonElement | null;
        const deleteAllModal = shadow.querySelector('#delete-confirmation-modal') as HTMLDivElement | null;
        const confirmDeleteAllBtn = shadow.querySelector('#confirm-delete-all') as HTMLButtonElement | null;
        const cancelDeleteAllBtn = shadow.querySelector('#cancel-delete-all') as HTMLButtonElement | null;

        if (deleteAllBtn) {
          deleteAllBtn.addEventListener('click', () => {
            if (deleteAllModal) deleteAllModal.style.display = 'block';
          });
        }

        if (confirmDeleteAllBtn) {
          confirmDeleteAllBtn.addEventListener('click', () => {
            this.deleteAllTasks();
            this.updateTaskCounters();
            if (deleteAllModal) deleteAllModal.style.display = 'none';
          });
        }

        if (cancelDeleteAllBtn) {
          cancelDeleteAllBtn.addEventListener('click', () => {
            if (deleteAllModal) deleteAllModal.style.display = 'none';
          });
        }

        // Handle deleting all API tasks with confirmation modal
        const deleteAllApiBtn = shadow.querySelector('.todo-list__button--delete-api') as HTMLButtonElement | null;
        const deleteApiModal = shadow.querySelector('#delete-api-confirmation-modal') as HTMLDivElement | null;
        const confirmDeleteApiBtn = shadow.querySelector('#confirm-delete-api') as HTMLButtonElement | null;
        const cancelDeleteApiBtn = shadow.querySelector('#cancel-delete-api') as HTMLButtonElement | null;

        if (deleteAllApiBtn) {
          deleteAllApiBtn.addEventListener('click', () => {
            if (deleteApiModal) deleteApiModal.style.display = 'block';
          });
        }

        if (confirmDeleteApiBtn) {
          confirmDeleteApiBtn.addEventListener('click', () => {
            this.deleteAllApiTasks();
            if (deleteApiModal) deleteApiModal.style.display = 'none';
          });
        }

        if (cancelDeleteApiBtn) {
          cancelDeleteApiBtn.addEventListener('click', () => {
            if (deleteApiModal) deleteApiModal.style.display = 'none';
          });
        }


        // Handle deleting all manually added tasks with confirmation modal
        const deleteAllManualBtn = shadow.querySelector('.todo-list__button--delete-manual') as HTMLButtonElement | null;
        const deleteManualModal = shadow.querySelector('#delete-manual-confirmation-modal') as HTMLDivElement | null;
        const confirmDeleteManualBtn = shadow.querySelector('#confirm-delete-manual') as HTMLButtonElement | null;
        const cancelDeleteManualBtn = shadow.querySelector('#cancel-delete-manual') as HTMLButtonElement | null;

        if (deleteAllManualBtn) {
          deleteAllManualBtn.addEventListener('click', () => {
            if (deleteManualModal) deleteManualModal.style.display = 'block';
          });
        }

        if (confirmDeleteManualBtn) {
          confirmDeleteManualBtn.addEventListener('click', () => {
            this.deleteAllManualTasks();
            if (deleteManualModal) deleteManualModal.style.display = 'none';
          });
        }

        if (cancelDeleteManualBtn) {
          cancelDeleteManualBtn.addEventListener('click', () => {
            if (deleteManualModal) deleteManualModal.style.display = 'none';
          });
        }

        if (shadow) {
          const deleteAllBtn = shadow.querySelector('#delete-all') as HTMLButtonElement | null;
          const deleteAllApiBtn = shadow.querySelector('.todo-list__button--delete-api') as HTMLButtonElement | null;
          const deleteAllManualBtn = shadow.querySelector('.todo-list__button--delete-manual') as HTMLButtonElement | null;
      
          // Initialize all delete buttons as hidden
          if (deleteAllBtn) deleteAllBtn.style.display = 'none';
          if (deleteAllApiBtn) deleteAllApiBtn.style.display = 'none';
          if (deleteAllManualBtn) deleteAllManualBtn.style.display = 'none';
        }
    }

    addNewTask() {
        const shadow = this.shadowRoot;
        if (shadow) {
            const inputElem = shadow.querySelector('#todo-list__input--new-task') as HTMLInputElement | null;
            const todoListContainer = shadow.querySelector('#todo-list__items') as HTMLUListElement | null;
            const placeholderText = shadow.querySelector('#todo-list__placeholder') as HTMLDivElement | null;

            if (inputElem && todoListContainer && inputElem.value.trim() !== '') {
                const todoItem = document.createElement('todo-item');
                todoItem.setAttribute('task', inputElem.value);
                todoItem.setAttribute('completed', 'false');
                todoItem.classList.add('todo-list__item--manual');
                todoItem.setAttribute('draggable', 'true');
                todoListContainer.prepend(todoItem);
                inputElem.value = '';

                // Hide the placeholder text when a task is added
                if (placeholderText) {
                    placeholderText.style.display = 'none';
                }
                this.updateTaskCounters();
                this.filterTasks(this.currentFilter);
            }
        }
      }


    addApiTasks(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const shadow = this.shadowRoot;
            if (shadow) {
                const numberOfApiItemsElem = shadow.querySelector('#todo-list__input--api-count') as HTMLInputElement | null;
                const todoListContainer = shadow.querySelector('#todo-list__items') as HTMLUListElement | null;
                const validationMessage = shadow.querySelector('#validation-message') as HTMLDivElement | null;
                const messageElem = shadow.querySelector('#message') as HTMLDivElement | null;

                if (numberOfApiItemsElem && todoListContainer) {
                    const numberOfItems = parseInt(numberOfApiItemsElem.value, 10);

                    if (isNaN(numberOfItems) || numberOfItems <= 0) {
                        if (messageElem) {
                            messageElem.textContent = 'Please enter a valid number greater than 0.';
                            messageElem.classList.remove('hidden', 'success');
                            messageElem.classList.add('error');
                            setTimeout(() => {
                                messageElem?.classList.add('hidden');
                            }, 3000);
                        }
                        return reject('Number exceeds maximum');
                    }

                    if (numberOfItems > 10) {
                        if (messageElem) {
                            messageElem.textContent = 'You cannot request more than 10 tasks at a time.';
                            messageElem.classList.remove('hidden', 'success');
                            messageElem.classList.add('error');
                            setTimeout(() => {
                                messageElem?.classList.add('hidden');
                            }, 3000);
                        }
                        return reject('Number exceeds maximum');
                    }

                    try {
                        const res = await fetch(`https://dummyjson.com/todos/random/${numberOfItems}`);
                        const data = await res.json();
                        data.forEach((todo: Todo) => {
                            const todoItem = document.createElement('todo-item');
                            todoItem.setAttribute('task', todo.todo);
                            todoItem.setAttribute('completed', String(todo.completed));
                            todoItem.classList.add('todo-list__item--api');
                            todoItem.setAttribute('draggable', 'true');
                            todoListContainer.prepend(todoItem);
                        });
                        if (validationMessage) validationMessage.textContent = '';

                        // Show the success message
                        if (messageElem) {
                          if(numberOfItems === 1){
                            messageElem.textContent = `${numberOfItems} API task added successfully!`;
                          }else{
                            messageElem.textContent = `${numberOfItems} API tasks added successfully!`;
                          }
                            messageElem.classList.remove('hidden', 'error');
                            messageElem.classList.add('success');
                            setTimeout(() => {
                                messageElem?.classList.add('hidden');
                            }, 3000);
                        }

                        resolve();
                    } catch (error) {
                        console.error('There was a problem with the fetch operation:', error);

                        // Show the error message
                        if (messageElem) {
                            messageElem.textContent = 'Failed to add API tasks. Please try again.';
                            messageElem.classList.remove('hidden', 'success');
                            messageElem.classList.add('error');
                            setTimeout(() => {
                                messageElem?.classList.add('hidden');
                            }, 3000);
                        }

                        reject(error);
                    }
                } else {
                    reject('Required elements not found');
                }
            }
            this.updateTaskCounters();
            this.filterTasks(this.currentFilter);
        });
    }

    handleDragStart(event: DragEvent) {
      const target = event.target as HTMLElement;
      if (target) {
          this.draggedItem = target;
          target.style.opacity = '0.5'; // Make the dragged item semi-transparent
          event.dataTransfer?.setData('text/plain', '');
          event.dataTransfer?.setDragImage(target, 0, 0); // Use the actual element as the drag image
      }
    }

    handleDragOver(event: DragEvent) {
      event.preventDefault(); // Necessary to allow dropping
      const target = event.target as HTMLElement;
      const todoItem = target.closest('todo-item') as HTMLElement;
      const todoListContainer = this.shadowRoot?.querySelector('#todo-list__items') as HTMLUListElement | null;

      if (todoListContainer && todoItem && this.draggedItem && todoItem !== this.draggedItem) {
          // Swap the positions of the dragged item and the item under the mouse
          const draggedIndex = Array.from(todoListContainer.children).indexOf(this.draggedItem);
          const targetIndex = Array.from(todoListContainer.children).indexOf(todoItem);

          if (draggedIndex < targetIndex) {
              todoListContainer.insertBefore(this.draggedItem, todoItem.nextSibling);
          } else {
              todoListContainer.insertBefore(this.draggedItem, todoItem);
          }
      }
    }

    handleDrop(event: DragEvent) {
      event.preventDefault();
      const draggingElement = this.draggedItem as HTMLElement;
      if (draggingElement) {
          draggingElement.style.opacity = '1'; // Reset the opacity after drop
          this.draggedItem = null;
      }
    }

    deleteAllTasks() {
      const shadow = this.shadowRoot;
      if (shadow) {
          const allTasksList = shadow.querySelector('#todo-list__items') as HTMLUListElement | null;
          const placeholderText = shadow.querySelector('#todo-list__placeholder') as HTMLDivElement | null;

          if (allTasksList) {
            allTasksList.innerHTML = '';

            // Show the placeholder text after deleting all tasks
            if (placeholderText) {
              placeholderText.style.display = 'block';
            }
          }
          this.updateTaskCounters();
      }
    }

    deleteAllManualTasks() {
      const shadow = this.shadowRoot;
      if (shadow) {
          const manualTasks = shadow.querySelectorAll('.todo-list__item--manual');
          const placeholderText = shadow.querySelector('#todo-list__placeholder') as HTMLDivElement | null;

          manualTasks.forEach(task => task.remove());

          // Show the placeholder text after deleting all tasks
          if (placeholderText) {
            placeholderText.style.display = 'block';
          }
      }

      this.updateTaskCounters();
    }

    deleteAllApiTasks() {
      const shadow = this.shadowRoot;
      if (shadow) {
          const apiTasks = shadow.querySelectorAll('.todo-list__item--api');
          const placeholderText = shadow.querySelector('#todo-list__placeholder') as HTMLDivElement | null;

          apiTasks.forEach(task => task.remove());

          // Show the placeholder text after deleting all tasks
          if (placeholderText) {
            placeholderText.style.display = 'block';
          }
      }

      this.updateTaskCounters();
    }

    updateTaskCounters() {
      const shadow = this.shadowRoot;
      if (shadow) {
          const totalTasksElem = shadow.querySelector('#total-tasks') as HTMLSpanElement | null;
          const completedTasksElem = shadow.querySelector('#completed-tasks') as HTMLSpanElement | null;
          const activeTasksElem = shadow.querySelector('#active-tasks') as HTMLSpanElement | null;
          const placeholderText = shadow.querySelector('#todo-list__placeholder') as HTMLDivElement | null;

          const allTasks = shadow.querySelectorAll('todo-item');
          const completedTasks = shadow.querySelectorAll('todo-item[completed="true"]');
          const activeTasks = shadow.querySelectorAll('todo-item[completed="false"]');

          const deleteAllBtn = shadow.querySelector('#delete-all') as HTMLButtonElement | null;
          const deleteAllApiBtn = shadow.querySelector('.todo-list__button--delete-api') as HTMLButtonElement | null;
          const deleteAllManualBtn = shadow.querySelector('.todo-list__button--delete-manual') as HTMLButtonElement | null;

          const apiTasks = shadow.querySelectorAll('.todo-list__item--api');
          const manualTasks = shadow.querySelectorAll('.todo-list__item--manual');

          // Hide or show the delete buttons based on the tasks available
        if (allTasks.length === 0) {
            if (deleteAllBtn) deleteAllBtn.style.display = 'none';
        } else {
            if (deleteAllBtn) deleteAllBtn.style.display = 'block';
        }

        if (apiTasks.length === 0) {
            if (deleteAllApiBtn) deleteAllApiBtn.style.display = 'none';
        } else {
            if (deleteAllApiBtn) deleteAllApiBtn.style.display = 'block';
        }

        if (manualTasks.length === 0) {
            if (deleteAllManualBtn) deleteAllManualBtn.style.display = 'none';
        } else {
            if (deleteAllManualBtn) deleteAllManualBtn.style.display = 'block';
        }

          if (totalTasksElem) totalTasksElem.textContent = String(allTasks.length);
          if (completedTasksElem) completedTasksElem.textContent = String(completedTasks.length);
          if (activeTasksElem) activeTasksElem.textContent = String(activeTasks.length);

          // Show placeholder text if no tasks exist
          if (allTasks.length === 0 && placeholderText) {
              placeholderText.style.display = 'block';
          } else if (placeholderText) {
              placeholderText.style.display = 'none';
          }
      }
    }

  filterTasks(filterType: 'all' | 'completed' | 'active') {
      const shadow = this.shadowRoot;
      if (shadow) {
          const allTasks = shadow.querySelectorAll('todo-item');
          const allBtn = shadow.querySelector('#show-all-btn');
          const completeBtn = shadow.querySelector('#show-completed-btn');
          const activeBtn = shadow.querySelector('#show-active-btn');

           // Clear all active-filter classes
          allBtn?.classList.remove('todo-list__filter--active');
          completeBtn?.classList.remove('todo-list__filter--active');
          activeBtn?.classList.remove('todo-list__filter--active');

          allTasks.forEach(task => {
              const taskElement = task as HTMLElement;
              const isCompleted = task.getAttribute('completed') === 'true';

              taskElement.classList.remove('hidden', 'visible');

              switch (filterType) {
                  case 'all':
                      taskElement.classList.add('visible'); // Show all tasks
                      allBtn?.classList.add('todo-list__filter--active');
                      break;
                  case 'completed':
                      if (isCompleted) {
                          taskElement.classList.add('visible'); // Show only completed tasks
                      } else {
                          taskElement.classList.add('hidden'); // Hide non-completed tasks
                      }
                      completeBtn?.classList.add('todo-list__filter--active');
                      break;
                  case 'active':
                      if (!isCompleted) {
                          taskElement.classList.add('visible'); // Show only active tasks
                      } else {
                          taskElement.classList.add('hidden'); // Hide completed tasks
                      }
                      activeBtn?.classList.add('todo-list__filter--active');
                      break;
              }
          });
          this.updateTaskCounters();
      }
  }
  
}

customElements.define('todo-list', TodoList);
