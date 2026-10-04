import { signIn, signUp } from "../lib/auth";

const COPY = {
    signin: { submit: 'Log in', toggle: 'Sign up' },
    signup: { submit: 'Sign up', toggle: 'Log in' },
};

export function initAuth(root, isStale){
    const form = root.querySelector('.authForm');
    const submitBtn = root.querySelector('.authSubmit');
    const toggleBtn = root.querySelector('.toggleMode');
    if (!form || !submitBtn || !toggleBtn) return;
    let mode = 'signin';

    const paint = () => {
        submitBtn.textContent = COPY[mode].submit;
        toggleBtn.textContent = COPY[mode].toggle;
    };
    paint();

    toggleBtn.addEventListener('click', ()=> {
        mode = mode === 'signin' ? 'signup' : 'signin';
        paint();
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