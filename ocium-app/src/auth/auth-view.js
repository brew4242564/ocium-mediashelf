export function renderAuthView() {
    return `
        <div class="auth">
        <form class="authForm">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" class="authSubmit">Log in</button>
        </form>
        <p>you don't have an account? <button type="button" class="toggleMode">Sign up</button></p>
    </div>
    `
}