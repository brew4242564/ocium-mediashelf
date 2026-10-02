import { deleteItem, getItems, toggleDone } from "../state.js";
import { renderMediaList } from "../components/card-list.js";

let currentCategory = null;
let currentPage = 1;
let mediaDone = null;
const PAGE_SIZE = 10;


function paginate(items, page, pageSize) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}


async function renderCurrentPage() {
    const allItems = await getItems();
    let filtered = currentCategory
        ? allItems.filter(item => item.category === currentCategory && item.done === mediaDone)
        : allItems.filter(item => item.done === mediaDone);
    const pageItems = paginate(filtered, currentPage, PAGE_SIZE);
    const container = document.querySelector('.itemsContainer');
    container.innerHTML = renderMediaList(pageItems, { showControls: true });
}

export async function initLibrary() {
    const groupButtons = document.querySelector('.groupButtons');
    currentCategory = null;
    groupButtons.addEventListener('click', async (e) => {
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
        await renderCurrentPage();
    });
    showFinished();
    initCardCOntrol();
    renderCurrentPage();
}

async function showFinished(){
    const finishedCheck = document.querySelector('.check');
    mediaDone = finishedCheck.checked ? true : false;
    finishedCheck.addEventListener('change', async () => {
    mediaDone = finishedCheck.checked;
    console.log(mediaDone);
    await renderCurrentPage();
});
}

export function initCardCOntrol() {
    const container = document.querySelector('.itemsContainer');
    container.addEventListener('click',async (e) => {
        const button = e.target.closest('[data-function]');
        if (!button) return;
        const action = button.dataset.function;
        const id = button.dataset.id;

        switch (action) {
            case 'done':
                await toggleDone(id);
                const card = e.target.closest('.media-card');
                card.classList.toggle('is-done');
                break;
            case 'delete':
                await deleteItem(id);
                await renderCurrentPage();
                break;
        }
    })
}

