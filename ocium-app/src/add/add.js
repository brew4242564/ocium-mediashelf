import { addItem } from "../state.js";
import { renderWarn } from "./add-view.js";
export async function initAdd(root, isStale) {
    const form = root.querySelector('form');
    const categorySelector = root.querySelector('.gridButtonContainer');
    const submitBtn = form.querySelector('.addButton');
    if (!form || !categorySelector || !submitBtn) return;
    let selectedCategory = null;
    let submitting = false;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitting) return;
        console.log('tocaste el submit')
        const formData = new FormData(form);
        const title = formData.get('title');
        const author = formData.get('author') || 'Unknown';
        const cover = formData.get('cover') || null;

        if (!selectedCategory) {
            // title - category
            createWarn("Category not selected", "Please, select one category before submit.");
            return;
        }
        if (!title.trim()) {
            createWarn("Untitled", "Please, write some title");
            return;
        }
        submitting = true;
        submitBtn.disabled = true;
        try {
            await addItem({
                title,
                author,
                cover,
                category: selectedCategory
            })
            if (isStale()) return;
            form.reset();
            categorySelector.querySelectorAll('.categoryButton').forEach(btn => btn.classList.remove('selected'));
            selectedCategory = null;
            console.log('item guardado')
        } catch (error) {
            alert("can't add item: " + error.message);
        } finally {
            submitting = false;
            submitBtn.disabled = false;
        }
    })


    categorySelector.addEventListener('click', (e) => {
        e.preventDefault();
        const button = e.target.closest('.categoryButton');
        if (!button) return;
        console.log('tocaste un boton')
        form.querySelectorAll('.categoryButton').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedCategory = button.dataset.category;
    })
}

function createWarn(title, text) {
    const warn = renderWarn(title, text);
    const warnContainer = document.querySelector(".warnContainer");
    warnContainer.innerHTML = warn;

    warnContainer.classList.remove("invisible");
    setTimeout(() => {
        warnContainer.classList.add("invisible");
    }, 5000);

    warnContainer.addEventListener("transitionend", () => {
        if (warnContainer.classList.contains("invisible")) {
            warnContainer.innerHTML = "";
        }
    }, { once: true });
}

