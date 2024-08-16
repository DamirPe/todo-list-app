import './style.css'
import './TodoList/todoList'

import '@fortawesome/fontawesome-free/css/all.min.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <todo-list></todo-list>
  </div>
` 
