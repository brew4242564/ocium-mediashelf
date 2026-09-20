import { deleteItem, getItems, toggleDone } from "../state.js";
import { renderMediaList } from "../components/card-list.js";

let currentCategory = null;
let currentPage = 1;
const PAGE_SIZE = 10;
const library = document.querySelector('.library');
function paginate(items, page, pageSize) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}


function renderCurrentPage() {
    const allItems = getItems();
    const filtered = currentCategory
        ? allItems.filter(item => item.category === currentCategory)
        : allItems;
    const pageItems = paginate(filtered, currentPage, PAGE_SIZE);
    const container = document.querySelector('.itemsContainer');
    container.innerHTML = renderMediaList(pageItems, { showControls: true });
}

export function initLibrary() {
    const groupButtons = document.querySelector('.groupButtons');
    currentCategory = null;
    groupButtons.addEventListener('click', (e) => {
        const button = e.target.closest('.categoryButton');
        if (!button) return;

        groupButtons.querySelectorAll('.categoryButton').forEach(
            btn => {
                btn.classList.remove('active');
            }
        );

        button.classList.add('active');
        currentCategory = button.dataset.category;
        if (currentCategory == "all") currentCategory = null;
        currentPage = 1;
        renderCurrentPage();
    });

    initCardCOntrol();
    renderCurrentPage();
}

export function initCardCOntrol() {
    const container = document.querySelector('.itemsContainer');

    container.addEventListener('click', (e) => {
        const button = e.target.closest('[data-function]');
        if (!button) return;
        const action = button.dataset.function;
        const id = Number(button.dataset.id);

        switch (action) {
            case 'done':
                toggleDone(id);
                const card = e.target.closest('.media-card');
                card.classList.toggle('is-done');
                break;
            case 'delete':
                deleteItem(id);
                renderCurrentPage();
                break;
        }
    })
}

