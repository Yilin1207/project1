// ===== Вкладки и резюме разработчиков =====
const themeToggle = document.getElementById('themeToggle');
let savedColorMode = 'light';
try {
    savedColorMode = localStorage.getItem('color-mode') === 'dark' ? 'dark' : 'light';
} catch {}

function applyColorMode(mode) {
    const isDark = mode === 'dark';
    document.body.dataset.colorMode = isDark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-checked', String(isDark));
    try {
        localStorage.setItem('color-mode', document.body.dataset.colorMode);
    } catch {}
}

applyColorMode(savedColorMode);
themeToggle.addEventListener('click', () => {
    const nextMode = document.body.dataset.colorMode === 'dark' ? 'light' : 'dark';
    applyColorMode(nextMode);
});

const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const profilePhoto = document.getElementById('profilePhoto');
const profilePhotos = {
    frontend: 'assets/frontend-developer.jpeg',
    backend: 'assets/backend-developer.jpeg',
    devops: 'assets/devops-engineer.jpeg'
};

function updateProfileHeader(targetId) {
    const activePanel = document.getElementById(targetId);
    if (!activePanel) return;

    const theme = activePanel.dataset.theme || 'frontend';
    document.body.dataset.theme = theme;
    const isTasksPanel = targetId.startsWith('task-');
    document.body.classList.toggle('tasks-active', isTasksPanel);

    if (isTasksPanel) return;

    profileName.textContent = activePanel.dataset.name;
    profileRole.textContent = activePanel.dataset.role;
    profilePhoto.src = profilePhotos[targetId] || activePanel.dataset.photo;
    profilePhoto.alt = activePanel.dataset.name;
}

// ===== Тапсырма 1: изменение текста «Сәлем, әлем!» =====
const taskElement = document.getElementById('task-element');
const greetingButton = document.getElementById('greetingButton');
greetingButton.addEventListener('click', () => {
    const isGreeting = taskElement.textContent === 'Сәлем, әлем!';
    taskElement.textContent = isGreeting ? 'Бастапқы мәтін' : 'Сәлем, әлем!';
    greetingButton.textContent = isGreeting ? 'Мәтінді өзгерту' : 'Бастапқы мәтінді қайтару';
});

// ===== Тапсырма 2: создание и удаление нового элемента =====
const newElementButton = document.getElementById('newElementButton');
const newDiv = document.createElement('div');
newDiv.className = 'new-div';
newDiv.textContent = 'Мен жаңа элементпін';
newElementButton.addEventListener('click', () => {
    if (newDiv.isConnected) {
        newDiv.remove();
        newElementButton.textContent = 'Элементті қосу';
    } else {
        document.body.appendChild(newDiv);
        newElementButton.textContent = 'Элементті алып тастау';
    }
});

// ===== Тапсырма 3: изменение и восстановление стиля абзаца =====
const toggleParagraph = document.getElementById('toggleParagraph');
function toggleParagraphStyle() {
    const isChanged = toggleParagraph.classList.toggle('changed');
    toggleParagraph.setAttribute('aria-pressed', String(isChanged));
}
toggleParagraph.addEventListener('click', toggleParagraphStyle);
toggleParagraph.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleParagraphStyle();
});

// ===== Тапсырма 4: управление классом active =====
const classTarget = document.getElementById('classTarget');
const classToggleButton = document.getElementById('classToggleButton');
const classListOutput = document.getElementById('classListOutput');

function showElementClasses() {
    const classes = Array.from(classTarget.classList);
    console.log('Элемент кластары:', classes);
    classListOutput.textContent = `Элемент кластары: ${classes.join(', ')}`;
}

classToggleButton.addEventListener('click', () => {
    const isActive = classTarget.classList.toggle('active');
    classToggleButton.textContent = isActive ? 'active класын жою' : 'active класын қосу';
    showElementClasses();
});

showElementClasses();

// ===== Тапсырма 5: создание таблицы, окрашивание и подсчёт ячеек =====
const tableForm = document.getElementById('tableForm');
const rowCountInput = document.getElementById('rowCount');
const columnCountInput = document.getElementById('columnCount');
const cellColorInput = document.getElementById('cellColor');
const tableContainer = document.getElementById('tableContainer');
const tableError = document.getElementById('tableError');
const coloredCellCount = document.getElementById('coloredCellCount');

function countCellsByColor(color) {
    const cells = tableContainer.querySelectorAll('td');
    return Array.from(cells).filter((cell) => cell.dataset.color === color.toLowerCase()).length;
}

function updateColoredCellCount() {
    coloredCellCount.textContent = `Таңдалған түспен боялған ұяшықтар саны: ${countCellsByColor(cellColorInput.value)}`;
}

function createTable(rows, columns) {
    if (!Number.isInteger(rows) || !Number.isInteger(columns) ||
        rows < 1 || rows > 50 || columns < 1 || columns > 50) {
        tableError.textContent = 'Жолдар мен бағандар саны 1–50 аралығындағы бүтін сан болуы керек.';
        return;
    }

    tableError.textContent = '';
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = `${rows} жол × ${columns} баған`;
    table.appendChild(caption);
    const tbody = document.createElement('tbody');

    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const row = document.createElement('tr');
        for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
            const cell = document.createElement('td');
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = `${rowIndex + 1}:${columnIndex + 1}`;
            button.setAttribute('aria-label', `${rowIndex + 1}-жол, ${columnIndex + 1}-баған: бояу`);
            button.setAttribute('aria-pressed', 'false');
            cell.appendChild(button);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.replaceChildren(table);
    updateColoredCellCount();
    return table;
}

tableForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createTable(Number(rowCountInput.value), Number(columnCountInput.value));
});

tableContainer.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || !tableContainer.contains(button)) return;

    const cell = button.closest('td');
    const color = cellColorInput.value.toLowerCase();
    if (cell.dataset.color === color) {
        delete cell.dataset.color;
        cell.style.backgroundColor = '';
    } else {
        cell.dataset.color = color;
        cell.style.backgroundColor = color;
    }
    button.setAttribute('aria-pressed', String(Boolean(cell.dataset.color)));
    updateColoredCellCount();
});

cellColorInput.addEventListener('input', updateColoredCellCount);

// ===== Переключение вкладок мышью и клавиатурой =====
function activateTab(selectedButton, moveFocus = false) {
    const targetId = selectedButton.dataset.target;

    for (const button of tabButtons) {
        const isSelected = button === selectedButton;
        button.classList.toggle('active', isSelected);
        button.setAttribute('aria-selected', String(isSelected));
        button.tabIndex = isSelected ? 0 : -1;
    }

    for (const panel of tabPanels) {
        const isSelected = panel.id === targetId;
        panel.classList.toggle('active', isSelected);
        panel.hidden = !isSelected;
    }

    updateProfileHeader(targetId);
    if (moveFocus) selectedButton.focus();
}

for (const button of tabButtons) {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', (event) => {
        const currentIndex = tabButtons.indexOf(button);
        let nextIndex = currentIndex;

        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabButtons.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabButtons.length - 1;
        if (nextIndex === currentIndex) return;

        event.preventDefault();
        activateTab(tabButtons[nextIndex], true);
    });
}

activateTab(tabButtons[0]);
