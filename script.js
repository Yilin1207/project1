const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const profilePhoto = document.getElementById('profilePhoto');
const sideItems = document.querySelectorAll('.side-list li');
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

    profileName.textContent = activePanel.dataset.name;
    profileRole.textContent = activePanel.dataset.role;
    profilePhoto.src = profilePhotos[targetId] || activePanel.dataset.photo;
    profilePhoto.alt = activePanel.dataset.name;
}

const taskElement = document.getElementById('task-element');
if (taskElement) {
    taskElement.textContent = 'Сәлем, әлем!';
}

const oldElement = document.querySelector('.old');
if (oldElement) {
    oldElement.remove();
}

const newDiv = document.createElement('div');
newDiv.className = 'new-div';
newDiv.textContent = 'Мен жаңа элементпін';
document.body.appendChild(newDiv);

const classToggleButton = document.createElement('button');
classToggleButton.type = 'button';
classToggleButton.textContent = 'active класын ауыстыру';
document.body.appendChild(classToggleButton);

const classListParagraph = document.createElement('p');
classListParagraph.className = 'class-list-output';
document.body.appendChild(classListParagraph);

function showElementClasses() {
    const classes = Array.from(newDiv.classList);
    const classListText = classes.length > 0 ? classes.join(', ') : 'Кластар жоқ';

    console.log('Элемент кластары:', classes);
    classListParagraph.textContent = `Элемент кластары: ${classListText}`;
}

classToggleButton.addEventListener('click', () => {
    newDiv.classList.toggle('active');
    showElementClasses();
});

showElementClasses();

const toggleParagraph = document.createElement('p');
toggleParagraph.textContent = 'Бұл ауыспалы абзац';
toggleParagraph.style.cursor = 'pointer';
toggleParagraph.addEventListener('click', () => {
    toggleParagraph.style.color = 'blue';
    toggleParagraph.style.fontSize = '24px';
});
document.body.appendChild(toggleParagraph);

function selectProfile(targetId) {
    const button = document.querySelector(`.tab-button[data-target="${targetId}"]`);
    if (!button) return;
    button.click();
}

function showHome() {
    document.body.classList.add('home-active');
    window.location.hash = 'home';
}

for (const button of tabButtons) {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;

        for (const item of tabButtons) {
            item.classList.toggle('active', item === button);
        }

        for (const panel of tabPanels) {
            panel.classList.toggle('active', panel.id === targetId);
        }

        const activeIndex = Array.from(tabButtons).indexOf(button);
        for (const item of sideItems) {
            item.classList.toggle('active', item === sideItems[activeIndex]);
        }

        updateProfileHeader(targetId);
    });
}

for (const item of sideItems) {
    item.addEventListener('click', () => {
        const index = Array.from(sideItems).indexOf(item);
        const button = tabButtons[index];
        if (button) button.click();
    });
}

for (const card of document.querySelectorAll('[data-open-profile]')) {
    card.addEventListener('click', () => {
        document.body.classList.remove('home-active');
        selectProfile(card.dataset.openProfile);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

for (const control of document.querySelectorAll('[data-action="home"]')) {
    control.addEventListener('click', (event) => {
        event.preventDefault();
        showHome();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

updateProfileHeader('frontend');
