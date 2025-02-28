document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('sign-in-form');
  const usernameInput = document.getElementById('signin-username');
  const passwordInput = document.getElementById('signin-password');

  // If the form exists, add the submit event listener
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // Prevent the default form submit behavior

      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username && password) {
        // Fetch users from the users.json file (this simulates reading from a backend)
        const response = await fetch('users.json');
        const users = await response.json();
        
        // Check if the username and password match any entry in the JSON file
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          // If the user is found, login successful
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', username); // Store username

          alert('Login successful!');
          window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } else {
          alert('Invalid username or password'); // Show an error if login fails
        }
      } else {
        alert('Please enter both username and password');
      }
    });
  } else {
    console.error("Sign-in form not found!");
  }
});
