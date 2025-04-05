// Authentication related functionality

// Check if user is logged in on pages that require authentication
function checkAuth() {
    // Skip auth check on login and register pages
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('register.html')) {
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }
}

// Run auth check when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Setup login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Setup register form handler
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Setup logout button handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Display username if user is logged in
    const usernameElement = document.getElementById('username-display');
    if (usernameElement) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            usernameElement.textContent = currentUser.username;
        }
    }
});

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching username and password
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store current user in localStorage (without password for security)
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            username: user.username
        }));
        
        // Redirect to todo list page
        window.location.href = 'index.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.classList.add('show');
    }
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        errorMessage.classList.add('show');
        return;
    }
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        errorMessage.textContent = 'Username already exists';
        errorMessage.classList.add('show');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username: username,
        password: password // In a real app, you would hash this password
    };
    
    // Add new user to users array
    users.push(newUser);
    
    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Handle logout
function handleLogout() {
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
}