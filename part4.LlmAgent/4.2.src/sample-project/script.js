// Cursor AI에게 요청: TODO 앱 기능을 완성해주세요

let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText === '') {
        alert('할 일을 입력해주세요!');
        return;
    }
    
    // Cursor AI에게 요청: 
    // 1. todos 배열에 새 항목 추가
    // 2. 화면에 todo 목록 업데이트
    // 3. 입력 필드 초기화
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(todo);
    renderTodos();
    input.value = '';
}

function renderTodos() {
    // Cursor AI에게 요청: todos 배열을 HTML로 렌더링
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id})" class="toggle-btn">
                    ${todo.completed ? '✓' : '○'}
                </button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">
                    ✕
                </button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Cursor AI에게 요청: toggleTodo와 deleteTodo 함수 구현

function toggleTodo(id) {
    // 완료 상태 토글 기능 구현
}

function deleteTodo(id) {
    // 할 일 삭제 기능 구현
}

// Enter 키로 추가 기능
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
