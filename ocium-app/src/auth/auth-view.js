export function renderAuthView() {
    return `
        <div class="auth">
        <form class="authForm">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" class="authSubmit">Login</button>
        </form>
        <p>you dont have account? <button type="button" class="toggleMode">Register.</button></p>
    </div>
    `
}