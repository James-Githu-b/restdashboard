document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('sign-in-form');
  const usernameInput = document.getElementById('signin-username');
  const passwordInput = document.getElementById('signin-password');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // Prevent the default form submit behavior

      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username && password) {
        // Fetch users from the users.json file
        try {
          const response = await fetch('users.json');
          const users = await response.json();

          console.log(users); // Log the fetched data to the console

          // Ensure users is an array before calling .find()
          if (Array.isArray(users)) {
            // Find the user with the matching username and password
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
            alert('Error: Users data is not an array');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('Error fetching user data');
        }
      } else {
        alert('Please enter both username and password');
      }
    });
  } else {
    console.error("Sign-in form not found!");
  }
});
