import { renderMainView } from './main/main-view.js';
import { renderLibraryView } from './library/library-view.js';
import { renderAddView } from './add/add-view.js';
import { initAdd } from './add/add.js';
import { initMain } from './main/main.js';
import { initLibrary } from './library/library.js';
import { initAuth } from './auth/auth-init.js';
import { renderAuthView } from './auth/auth-view.js';
import { supabase } from './lib/supabase.js';
const renderContainer = document.querySelector('.render');

// Views
async function navigateTo(view) {
    switch (view) {
        case 'auth':
            renderContainer.innerHTML = renderAuthView();
            initAuth();
            break;
        case 'main':
            renderContainer.innerHTML = renderMainView();
            await initMain();
            break;
        case 'library':
            renderContainer.innerHTML = renderLibraryView();
            await initLibrary();
            break;
        case 'add':
            renderContainer.innerHTML = renderAddView();
            await initAdd();
            break;
    }
}

// Navbar DOM

document.querySelector('.nav-bar').addEventListener('click', (e) => {
    const button = e.target.closest('.view-btn');
    if (!button) return;
    const view = button.dataset.view;
    if (button) navigateTo(view);
});
const { data: {session} } = await supabase.auth.getSession();

navigateTo(session ? 'main' : 'auth');

supabase.auth.onAuthStateChange((event, session)=>{
    if(event === 'SIGNED_IN') {
        navigateTo('main');
    } else if(event === 'SIGNED_OUT') {
        navigateTo('auth')
    }
})