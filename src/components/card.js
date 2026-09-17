export function makeCard(item, options = {}) {
    const done = item.done ? 'is-done' : '';
    const { showControls = false } = options;
    const titleText = encodeURIComponent(item.title);
    const isCover = item.cover;
    let coverImg;

    const controls = showControls ? `
    <div class="card-controls">
        <button type="button" class="doneButton" data-id="${item.id}" data-function='done'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-pending"><path d="M20 6 9 17l-5-5"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-done"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
        </button>
        <button type="button" class="deleteButton" data-id="${item.id}" data-function='delete'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/></svg>
        </button>
            </div>
            `
        : '';
    
        if(!isCover){
            coverImg = `<img src="https://placehold.co/300x400?text=${titleText}" alt="${item.title}" draggable="false">`
        }else{
            coverImg = `<img src="${item.cover}" alt="${item.title}" draggable="false">`
        }
    return `
    <div class="media-card" data-id="${item.id}">
    <div class="cover-placeholder">
        ${coverImg}
    </div>
    <div class="info">
        <h3 class="media-title">${item.title}</h3>
    <p class="media-author">${item.author}</p>
    ${controls}
    </div>
</div>
    `
}