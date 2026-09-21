import { addItem } from "../state.js";
export async function initAdd() {
    const form = document.querySelector('form');
    const categorySelector = form.querySelector('.gridButtonContainer');
    let selectedCategory = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('tocaste el submit')
        const formData = new FormData(form);
        const title = formData.get('title');
        const author = formData.get('author') || 'Unknown';
        const cover = formData.get('cover') || null;

        if (!selectedCategory) {
            alert('Please, select one category before submit.');
            return;
        }
        if (!title.trim()) {
            alert('Please, write some title.');
            return;
        }
        try {
            await addItem({
                title,
                author,
                cover,
                category: selectedCategory
            })
        } catch (error) {
            alert("can't add item: " + error.message);
            return;
        }
        form.reset();
        categorySelector.querySelectorAll('.categoryButton').forEach(btn => btn.classList.remove('selected'));
        selectedCategory = null;
        console.log('item guardado')
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
