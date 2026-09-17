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

updateProfileHeader('frontend');
