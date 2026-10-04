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

let navId = 0;

// Views
async function navigateTo(view) {
    const token = ++navId;
    const isStale = () => token !== navId;
    try {
        switch (view) {
            case 'auth':
                renderContainer.innerHTML = renderAuthView();
                initAuth(renderContainer, isStale);
                break;
            case 'main':
                renderContainer.innerHTML = renderMainView();
                await initMain(renderContainer, isStale);
                break;
            case 'library':
                renderContainer.innerHTML = renderLibraryView();
                await initLibrary(renderContainer, isStale);
                break;
            case 'add':
                renderContainer.innerHTML = renderAddView();
                await initAdd(renderContainer, isStale);
                break;
        }
    } catch (error) {
        if (isStale()) return;
        console.error(`failed to render "${view}"`, error);
    }
}

// Navbar DOM
const navBar = document.querySelector('.nav-bar');
navBar.addEventListener('click', (e) => {
    const button = e.target.closest('.view-btn');
    if (!button) return;
    const view = button.dataset.view;
    if (view) navigateTo(view);
});

renderContainer.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-navigate]');
    if (!trigger) return;
    const view = trigger.dataset.navigate;
    if (view) navigateTo(view);
});

function updateNavVisibility(session) {
    navBar.classList.toggle('hide', !session);
}


// sessions
const { data: {session} } = await supabase.auth.getSession();
let currentUser = session?.user?.id ?? null;

navigateTo(session ? 'add' : 'auth');

supabase.auth.onAuthStateChange((event, session)=>{
    const newUser = session?.user?.id ?? null;
    updateNavVisibility(session);
    if(newUser === currentUser) return;
    currentUser = newUser;
    if (event === 'SIGNED_IN') setTimeout(() => navigateTo('main'), 0);
    else if (event === 'SIGNED_OUT') setTimeout(() => navigateTo('auth'), 0);
})