import { renderMediaList } from "../components/card-list.js";
import { makeCard } from "../components/card.js";
import { getItems } from "../state.js";


export async function initMain(root, isStale) {
    const carrousel = root.querySelector('.media-carrousel');
    if (!carrousel) return;
    initRandomButtons(root, isStale);
    const items = await getItems();
    if (isStale()) return;
    const recents = items.slice(-5).reverse(); // last 5
    carrousel.innerHTML = renderMediaList(recents);
}



export function initRandomButtons(root, isStale) {
    const container = root.querySelector('.gridButtonContainer');
    const randomResultContainer = root.querySelector('.randomResult');
    if (!container) return;
    container.addEventListener('click', async(e) => {
        const button = e.target.closest('.categoryButton');
        if (!button) return;
        console.log('funciono')
        if (button.dataset.category) {
            const random = await getRandom(button.dataset.category);
            if(isStale() || !randomResultContainer) return;
            console.log(random)
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