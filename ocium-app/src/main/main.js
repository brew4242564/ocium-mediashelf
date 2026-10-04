import { renderMediaList } from "../components/card-list.js";
import { makeCard } from "../components/card.js";
import { getItems, getRecentItems } from "../state.js";

let randomId = 0;


export async function initMain(root, isStale) {
    const carrousel = root.querySelector('.media-carrousel');
    if (!carrousel) return;
    initRandomButtons(root, isStale);
    const recents = await getRecentItems(5);
    if (isStale()) return;
    carrousel.innerHTML = renderMediaList(recents);
}



export function initRandomButtons(root, isStale) {
    const container = root.querySelector('.gridButtonContainer');
    const randomResultContainer = root.querySelector('.randomResult');
    if (!container) return;
    container.addEventListener('click', async(e) => {
        const button = e.target.closest('.categoryButton');
        if (!button) return;
        if (button.dataset.category) {
            const myId = ++randomId;
            const random = await getRandom(button.dataset.category);
            if(isStale() || myId !== randomId || !randomResultContainer) return;
            randomResultContainer.innerHTML = makeCard(random)
        }
    })
}

async function getRandom(category) {
    const allItems = await getItems();
    const filtered = allItems.filter(item => item.category === category && item.done === false);
    if(filtered.length === 0) return null;
    const aux = Math.floor(Math.random() * filtered.length);
    return(filtered[aux]);
}                                                                                                   