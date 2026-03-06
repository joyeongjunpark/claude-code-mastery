function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

//투두 항목 유효성 검사 함수
function isValidTodo(todo) {
    // 필수 필드 검증
    if (typeof todo.id !== 'number' ||
        typeof todo.title !== 'string' ||
        typeof todo.completed !== 'boolean') {
        return false;
    }

    // 옵션 필드 검증
    if (todo.deadline !== undefined && todo.deadline !== null && typeof todo.deadline !== 'string') {
        return false;
    }
    if (todo.memo !== undefined && typeof todo.memo !== 'string') {
        return false;
    }
    if (todo.priority !== undefined && !['normal', 'high', 'low'].includes(todo.priority)) {
        return false;
    }

    return true;
}

//투두 리스트 가져오는 함수
function getTodoList() {
    const list = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false },
    ];

    // 리스트 유효성 검사
    const allValid = Array.isArray(list) && list.every(isValidTodo);
    if (!allValid) {
        throw new Error('투두 리스트에 유효하지 않은 항목이 있습니다.');
    }

    return list;
}

console.log(getTodoList());

//투두 리스트 추가하는 함수
function addTodo(title) {
    return { id: 4, title: title, completed: false };
}

console.log(addTodo('Todo 4'));

//투두 리스트 수정하는 함수
function updateTodo(id, title) {
    return { id: id, title: title, completed: true };
}

console.log(updateTodo(4, 'Todo 4'));

// -------------------------
// 브라우저용 투두 앱 로직
// -------------------------

// 로컬 스토리지 키 이름
const STORAGE_KEY = 'todo-list-v1';

// 투두 리스트 기본 데이터 (초기 예시)
function getInitialTodoList() {
    // 기본 예시 데이터
    const list = [
        { id: 1, title: '샘플: 투두를 완료로 체크해 보세요.', completed: false },
        { id: 2, title: '샘플: 투두를 삭제해 보세요.', completed: false }
    ];

    return list;
}

// 투두 리스트를 로컬 스토리지에서 불러오는 함수
function loadTodoList() {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return getInitialTodoList();
    }

    try {
        const parsed = JSON.parse(saved);
        const isValid = Array.isArray(parsed) && parsed.every(isValidTodo);

        if (!isValid) {
            // 유효하지 않은 데이터면 초기 데이터로 대체
            return getInitialTodoList();
        }

        return parsed;
    } catch (error) {
        // 파싱 오류 시에도 초기 데이터 사용
        return getInitialTodoList();
    }
}

// 투두 리스트를 로컬 스토리지에 저장하는 함수
function saveTodoList(list) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// 새 투두를 생성하는 함수
function createTodo(list, title, deadline, memo, priority) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        return null;
    }

    const maxId = list.reduce((max, todo) => Math.max(max, todo.id), 0);

    const normalizedPriority =
        priority === 'high' || priority === 'low' || priority === 'normal'
            ? priority
            : 'normal';

    // 마감일 검증 (YYYY-MM-DD 형식)
    let normalizedDeadline = null;
    if (deadline) {
        const deadlinePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (deadlinePattern.test(deadline)) {
            normalizedDeadline = deadline;
        }
    }

    return {
        id: maxId + 1,
        title: trimmedTitle,
        completed: false,
        deadline: normalizedDeadline,
        memo: memo ? memo.trim() : '',
        priority: normalizedPriority
    };
}

function getPriorityLabel(priority) {
    if (priority === 'high') return '높음';
    if (priority === 'low') return '낮음';
    return '보통';
}

// DOM 선택
const inputElement = document.getElementById('todo-input');
const deadlineElement = document.getElementById('todo-deadline');
const memoElement = document.getElementById('todo-memo');
const priorityElement = document.getElementById('todo-priority');
const addButtonElement = document.getElementById('add-button');
const listElement = document.getElementById('todo-list');
const counterElement = document.getElementById('todo-counter');
const emptyStateElement = document.getElementById('empty-state');
const filterGroupElement = document.getElementById('filter-group');
const clearCompletedButtonElement = document.getElementById('clear-completed-button');

// 상태
let todos = loadTodoList();
let currentFilter = 'all'; // all | active | completed

// 카운터 렌더링
function renderCounter() {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;

    if (!counterElement) return;

    const strongElement = counterElement.querySelector('strong');
    const spanElement = counterElement.querySelector('span');

    if (strongElement) {
        strongElement.textContent = `${active}개 남음`;
    }

    if (spanElement) {
        spanElement.textContent = `완료 ${completed} / 전체 ${total}`;
    }
}

// 현재 필터에 따른 투두 목록 반환
function getFilteredTodos() {
    if (currentFilter === 'active') {
        return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === 'completed') {
        return todos.filter((todo) => todo.completed);
    }
    return todos;
}

// 리스트 비어있을 때 상태 렌더링
function renderEmptyState() {
    if (!emptyStateElement) return;

    const filtered = getFilteredTodos();
    emptyStateElement.hidden = filtered.length > 0;
}

// 투두 리스트 렌더링
function renderTodoList() {
    if (!listElement) return;

    // 기존 내용 비우기
    listElement.innerHTML = '';

    const filteredTodos = getFilteredTodos();

    filteredTodos.forEach((todo) => {
        const item = document.createElement('li');
        item.className = 'todo-item';
        if (todo.completed) {
            item.classList.add('completed');
        }

        const priority = todo.priority || 'normal';
        if (priority === 'high') {
            item.classList.add('priority-high');
        } else if (priority === 'low') {
            item.classList.add('priority-low');
        }

        const main = document.createElement('div');
        main.className = 'todo-main';

        const checkbox = document.createElement('button');
        checkbox.className = 'todo-checkbox';
        if (todo.completed) {
            checkbox.classList.add('completed');
            checkbox.textContent = '✓';
        }
        checkbox.type = 'button';
        checkbox.addEventListener('click', () => {
            toggleTodoCompleted(todo.id);
        });

        const textWrapper = document.createElement('div');
        textWrapper.style.display = 'flex';
        textWrapper.style.flexDirection = 'column';
        textWrapper.style.gap = '2px';
        textWrapper.style.minWidth = '0';

        const title = document.createElement('div');
        title.className = 'todo-title';
        if (todo.completed) {
            title.classList.add('completed');
        }
        title.textContent = todo.title;

        const meta = document.createElement('div');
        meta.className = 'todo-meta';
        const parts = [`#${todo.id}`];
        if (priority) {
            parts.push(`우선순위: ${getPriorityLabel(priority)}`);
        }
        if (todo.deadline) {
            parts.push(`마감일: ${todo.deadline}`);
        }
        meta.textContent = parts.join(' · ');

        textWrapper.appendChild(title);
        textWrapper.appendChild(meta);

        if (todo.memo) {
            const memo = document.createElement('div');
            memo.className = 'todo-memo';
            memo.textContent = todo.memo;
            textWrapper.appendChild(memo);
        }

        main.appendChild(checkbox);
        main.appendChild(textWrapper);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'icon-button';
        deleteButton.type = 'button';
        deleteButton.textContent = '✕';
        deleteButton.title = '삭제';
        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        actions.appendChild(deleteButton);

        item.appendChild(main);
        item.appendChild(actions);

        listElement.appendChild(item);
    });

    renderCounter();
    renderEmptyState();
}

// 투두 추가
function handleAddTodo() {
    if (!inputElement) return;

    const title = inputElement.value;
    const deadline = deadlineElement && deadlineElement.value ? deadlineElement.value : null;
    const memo = memoElement ? memoElement.value : '';
    const priority =
        priorityElement && priorityElement.value
            ? priorityElement.value
            : 'normal';

    const newTodo = createTodo(todos, title, deadline, memo, priority);

    if (!newTodo) {
        return;
    }

    todos = [...todos, newTodo];
    saveTodoList(todos);
    inputElement.value = '';
    if (deadlineElement) {
        deadlineElement.value = '';
    }
    if (memoElement) {
        memoElement.value = '';
    }
    if (priorityElement) {
        priorityElement.value = 'normal';
    }
    renderTodoList();
}

// 완료 여부 토글
function toggleTodoCompleted(id) {
    todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodoList(todos);
    renderTodoList();
}

// 투두 삭제
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodoList(todos);
    renderTodoList();
}

// 완료된 투두 일괄 삭제
function clearCompletedTodos() {
    const hasCompleted = todos.some((todo) => todo.completed);
    if (!hasCompleted) {
        return;
    }

    todos = todos.filter((todo) => !todo.completed);
    saveTodoList(todos);
    renderTodoList();
}

// 필터 버튼 활성화 상태 렌더링
function renderFilterButtons() {
    if (!filterGroupElement) return;

    const buttons = filterGroupElement.querySelectorAll('.filter-button');
    buttons.forEach((button) => {
        const filter = button.getAttribute('data-filter');
        if (filter === currentFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 필터 변경
function changeFilter(filter) {
    currentFilter = filter;
    renderFilterButtons();
    renderTodoList();
}

// 이벤트 리스너 등록
function registerEventListeners() {
    if (addButtonElement) {
        addButtonElement.addEventListener('click', () => {
            handleAddTodo();
        });
    }

    if (inputElement) {
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleAddTodo();
            }
        });
    }

    if (filterGroupElement) {
        filterGroupElement.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            if (target.matches('.filter-button')) {
                const filter = target.getAttribute('data-filter');
                if (filter === 'all' || filter === 'active' || filter === 'completed') {
                    changeFilter(filter);
                }
            }
        });
    }

    if (clearCompletedButtonElement) {
        clearCompletedButtonElement.addEventListener('click', () => {
            clearCompletedTodos();
        });
    }
}

// 초기화
function initTodoApp() {
    registerEventListeners();
    renderFilterButtons();
    renderTodoList();
}

// DOMContentLoaded 이후 초기화 보장
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTodoApp();
    });
} else {
    initTodoApp();
}