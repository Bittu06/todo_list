// Select DOM elements
const inputBox = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');

// Get current user from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Add task function
function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        // Create list item
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        // Create delete button
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'; // × symbol
        li.appendChild(span);
    }
    // Clear input field
    inputBox.value = '';
    // Save data to local storage
    saveData();
}

// Add task when Add button is clicked
addBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        addTask();
    }
});

// Mark task as completed or delete task
listContainer.addEventListener('click', function(e) {
    // If clicked on list item, toggle checked class
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
    // If clicked on × symbol, remove the list item
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save data to local storage (per user)
function saveData() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        localStorage.setItem(`todoData_${currentUser.id}`, listContainer.innerHTML);
    }
}

// Load data from local storage (per user)
function loadData() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        listContainer.innerHTML = localStorage.getItem(`todoData_${currentUser.id}`) || '';
    } else {
        listContainer.innerHTML = '';
    }
}

// Load saved data when page loads
document.addEventListener('DOMContentLoaded', loadData);