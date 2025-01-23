const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInButton1 = document.getElementById('signInButton1'); // New ID for the "Sign In" button in the form

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Add event listener for the "Sign In" button in the form
signInButton1.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission
    window.location.href = "../index.html"; // Redirect to main page
});
