import { signIn, signUp } from "../lib/auth";

export function initAuth(root, isStale){
    const form = root.querySelector('.authForm');
    const submitBtn = root.querySelector('.authSubmit');
    const toggleBtn = root.querySelector('.toggleMode');
    if (!form || !submitBtn || !toggleBtn) return;
    let mode = 'signin';


    toggleBtn.addEventListener('click', ()=> {
        mode = mode === 'signin' ? 'signup' : 'signin';
        submitBtn.textContent = mode === 'signin' ? 'Sign in' : 'Sign up';
        toggleBtn.textContent = mode === 'signin' ? 'Sign up' : 'Log In'
    })

    form.addEventListener('submit', async(e) =>{
        e.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if(mode == 'signin'){
                await signIn(email, password);
            }else{
                await signUp(email, password);
                alert('Account created.');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}