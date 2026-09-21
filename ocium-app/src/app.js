import { renderMainView } from './main/main-view.js';
import { renderLibraryView } from './library/library-view.js';
import { renderAddView } from './add/add-view.js';
import { initAdd } from './add/add.js';
import { initMain } from './main/main.js';
import { initLibrary } from './library/library.js';
const renderContainer = document.querySelector('.render');

// Views
async function navigateTo(view) {
    switch (view) {
        case 'main':
            renderContainer.innerHTML = renderMainView();
            await initMain();
            break;
        case 'library':
            renderContainer.innerHTML = renderLibraryView();
            await initLibrary();
            break;
        case 'add':
            renderContainer.innerHTML = renderAddView();
            await initAdd();
            break;
    }
}

// Navbar DOM

document.querySelector('.nav-bar').addEventListener('click', (e) => {
    const button = e.target.closest('.view-btn');
    if (!button) return;
    const view = button.dataset.view;
    if (button) navigateTo(view);
});

navigateTo('library');

