const template = document.createElement('template');

template.innerHTML = `
<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .task-list__item {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .task-list__item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .task-list__text {
    flex-grow: 1;
    font-size: 16px;
  }

  .task-list__toggle-completed {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s, border-color 0.3s;
    display: flex;
    justify-content: center;
    align-items: centr;
  }

  .task-list__toggle-completed.completed {
    background-color: #3786ec; /* Blue background when completed */
    border-color: #3786ec;
  }

  .task-list__delete-btn {
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 0.5em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .task-list__delete-btn:hover {
    background-color: #ff1a1a;
  }
</style>

<div class="task-list__item">
  <button class="task-list__toggle-completed">
    <i class="fa-solid fa-check" style="color: #ffffff;"></i>
  </button>
  <span class="task-list__text">Your task here</span>
  <button class="task-list__delete-btn">
    <i class="fa-solid fa-trash"></i>
  </button>
</div>
`;

export class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const task = this.getAttribute('task-list__text') || 'No task provided';
    const completed = this.getAttribute('completed') === 'true';

    const taskElement = this.shadowRoot?.querySelector('.task-list__text') as HTMLSpanElement;
    const toggleCompletedElement = this.shadowRoot?.querySelector('.task-list__toggle-completed') as HTMLButtonElement;
    const deleteBtnElement = this.shadowRoot?.querySelector('.task-list__delete-btn') as HTMLElement;

    if (taskElement) {
      taskElement.textContent = task;
      taskElement.style.textDecoration = completed ? 'line-through' : 'none';
    }

    if (toggleCompletedElement) {
      if (completed) {
        toggleCompletedElement.classList.add('completed');
      }

      toggleCompletedElement.addEventListener('click', () => {
        const isCompleted = this.getAttribute('completed') === 'true';

        if (taskElement) {
          taskElement.style.textDecoration = isCompleted ? 'none' : 'line-through';
        }

        this.setAttribute('completed', String(!isCompleted));

        // Toggle button style
        toggleCompletedElement.classList.toggle('completed');

        // Dispatch a custom event to notify the parent component
        this.dispatchEvent(new CustomEvent('task-updated', {
          detail: { completed: !isCompleted },
          bubbles: true,
          composed: true,
        }));
      });
    }

    if (deleteBtnElement) {
      deleteBtnElement.addEventListener('click', () => {
        this.remove();
      });
    }
  }
}

customElements.define('todo-item', TodoItem);
