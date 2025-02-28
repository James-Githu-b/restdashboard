document.addEventListener('DOMContentLoaded', function () {
  // Log to see if elements are being found
  console.log(document.getElementById('promote-btn'));  // Should log the button element if found
  console.log(document.getElementById('demote-btn'));   // Should log the button element if found
  console.log(document.getElementById('sign-out-btn')); // Should log the button element if found

  // Check if the user is logged in
  if (!localStorage.getItem('loggedIn')) {
    // If not logged in, redirect to login page
    window.location.href = 'login.html';
  }

  // If the user is logged in, retrieve the username from localStorage
  const username = localStorage.getItem('username');

  // Display the username in the welcome message
  if (username) {
    document.getElementById('username-placeholder').textContent = username;
  }

  // Logout functionality
  document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
  });

  // Continue with the rest of the code...
});
