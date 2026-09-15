import { addItem } from "../state.js";
export function initAdd() {
    const form = document.querySelector('form');
    const categorySelector = form.querySelector('.gridButtonContainer');
    let selectedCategory = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('tocaste el submit')
        const formData = new FormData(form);
        const title = formData.get('title');
        const author = formData.get('author') || 'Unknown';
        if(!selectedCategory){
            alert('Please, select one category before submit.');
            return;
        }
        if(!title.trim()){
            alert('Please, write some title.');
            return;
        }
        addItem({
            title,
            author,
            category: selectedCategory
        })

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
        e.target.classList.add('selected');
        selectedCategory = e.target.dataset.category;
    })
}
