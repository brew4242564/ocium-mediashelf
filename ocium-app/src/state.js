const STORAGE_KEY = 'mediaItems';

function escapeHTML(str){
    const div = document.createElement('div')
    div.textContent = str;
    return div.innerHTML;
}

function isSafeIMG(url){
    try{
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    }catch{
        return false;
    }
}

function getItems(){
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveItems(items){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addItem(item){
    const items = getItems();
    const cleanTitle = item.title?.trim();
    if(!cleanTitle){
        throw new Error('title is required')
    };
    const safeItem = {
        ...item,
        title: escapeHTML(cleanTitle),
        author: escapeHTML((item.author || 'Unknown').trim()),
        cover: (item.cover && isSafeIMG(item.cover)) ? escapeHTML(item.cover) : null,
    };

    const newItem = {
        id: Date.now(),
        done: false,
        dateAdded: Date.now(),
        cover: null,
        ...safeItem
    }
    items.push(newItem)
    saveItems(items);
}

function deleteItem(id){
    const items = getItems().filter(item => item.id !== id);
    saveItems(items);
}

function toggleDone(id){
    const items = getItems().map(item =>
        item.id === id ? {...item, done: !item.done} : item
    );
    saveItems(items);
}



export { getItems, addItem, deleteItem, toggleDone }

