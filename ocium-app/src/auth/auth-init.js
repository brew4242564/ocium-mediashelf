import { signIn, signUp } from "../lib/auth";

export function initAuth(){
    const form = document.querySelector('.authForm');
    const submitBtn = document.querySelector('.authSubmit');
    const toggleBtn = document.querySelector('.toggleMode');
    let mode = 'signin';


    toggleBtn.addEventListener('click', ()=> {
        mode = mode === 'signin' ? 'signup' : 'signin';
        submitBtn.textContent = mode === 'signin' ? 'Sign in' : 'Sign up';
        toggleBtn.textContent = mode === 'sigin' ? 'Sign up' : 'Log In'
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
                alert('Account created. Verify your email.');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}