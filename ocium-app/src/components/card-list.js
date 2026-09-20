import { makeCard } from "./card.js";

export function renderMediaList(items, options = {}){
    if(items.length === 0){
        return `<p class="empty-message">No items yet.</p>`;
    }
    const cardsHTML = items.map(item => makeCard(item, options)).join('');
    return `<div class="media-list">${cardsHTML}</div>`;
}