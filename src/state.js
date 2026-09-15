const STORAGE_KEY = 'mediaItems';

function getItems(){
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveItems(items){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addItem(item){
    const items = getItems();
    const newItem = {
        id: Date.now(),
        done: false,
        dateAdded: Date.now(),
        ...item
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

