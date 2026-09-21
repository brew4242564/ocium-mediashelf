import { renderMediaList } from "../components/card-list.js";
import { makeCard } from "../components/card.js";
import { getItems } from "../state.js";


export async function initMain() {
    const carrousel = document.querySelector('.media-carrousel');
    const items = await getItems();
    const recents = items.slice(-5).reverse(); // last 5
    carrousel.innerHTML = renderMediaList(recents);
    initRandomButtons();
}



export function initRandomButtons() {
    const container = document.querySelector('.gridButtonContainer');
    const randomResultContainer = document.querySelector('.randomResult');
    container.addEventListener('click', (e) => {
        if (!e.target.classList.contains('categoryButton')) return;
        console.log('funciono')
        if (e.target.dataset.category) {
            const random = getRandom(e.target.dataset.category);
            if(!random) return;
            randomResultContainer.innerHTML = makeCard(random)
        }
    })
}

async function getRandom(category) {
    const allItems = await getItems();
    console.log(allItems);
    const filtered = allItems.filter(item => item.category === category && item.done === false);
    if(filtered.length === 0) return null;
    const aux = Math.floor(Math.random() * filtered.length);
    return(filtered[aux]);
}                                                                                                   