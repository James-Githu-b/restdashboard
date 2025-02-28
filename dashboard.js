document.addEventListener('DOMContentLoaded', function () {
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

  // Function to extract the user ID from the Roblox profile link
  function extractUserId(url) {
    const match = url.match(/https:\/\/www\.roblox\.com\/users\/(\d+)\/profile/);
    return match ? match[1] : null;
  }

  // Function to convert rank name to rank ID
  function getRankId(rankName) {
    const rankMapping = {
      "Customer": 1,
      "Trainee": 2,
      "Team Member": 3,
      "Kitchen Leader": 4,
      "Restaurant Supervisor": 5,
      "Restaurant Manager": 6,
      "Corporate Intern": 7,
      "Corporate Team": 8,
      "Executive Intern": 9,
      "Executive Team": 10,
      "Development Team": 11,
      "Chairperson": 12,
      "Vice President": -1 // Will show alert for this rank
    };

    return rankMapping[rankName] || -1; // -1 means rank does not exist or is too high
  }

  // Function to assign the role via API
  function assignRole(userId, rankId) {
    const url = `https://api.romanager.bot/v1/role/${userId}`;
    const body = JSON.stringify({
      roleRank: rankId
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '25ea98b3-61d1-4aaf-9413-f0e28aca78f0' // Your API Key
    };

    fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: body
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Role assigned successfully!');
      } else {
        alert('Failed to assign role. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while assigning the role.');
    });
  }

  // Function to handle "Promote" button click
  document.getElementById('promote-btn').addEventListener('click', function() {
    // Ask the user for the Roblox profile link
    const robloxProfileLink = prompt("Please enter the Roblox profile link:");

    if (robloxProfileLink) {
      const userId = extractUserId(robloxProfileLink);
      if (userId) {
        // Ask for the rank name with exact spelling
        const rankName = prompt("Please enter the rank name (exact spelling):");

        if (rankName) {
          // Convert rank name to rank ID
          const rankId = getRankId(rankName);

          if (rankId === -1) {
            alert("The rank is too high or does not exist. Please check the spelling or try a valid rank.");
          } else {
            // Call the function to assign the role
            assignRole(userId, rankId);
          }
        } else {
          alert("You must enter a rank name.");
        }
      } else {
        alert("Invalid Roblox profile link. Please enter a valid link.");
      }
    } else {
      alert("You must enter a Roblox profile link.");
    }
  });

  // Handle "Demote" button click (set rank ID to 1, "Customer" rank)
  document.getElementById('demote-btn').addEventListener('click', function() {
    // Ask the user for the Roblox profile link
    const robloxProfileLink = prompt("Please enter the Roblox profile link:");

    if (robloxProfileLink) {
      const userId = extractUserId(robloxProfileLink);
      if (userId) {
        // The rank is always set to "Customer" (rank ID = 1) for demote
        const rankId = 1;

        // Call the function to assign the "Customer" rank
        assignRole(userId, rankId);
      } else {
        alert("Invalid Roblox profile link. Please enter a valid link.");
      }
    } else {
      alert("You must enter a Roblox profile link.");
    }
  });

  // Handle "Sign Out" button click (logging out the user)
  document.getElementById('sign-out-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
  });
});
