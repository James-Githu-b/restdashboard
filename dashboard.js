document.addEventListener('DOMContentLoaded', function () {
  // Ensure all buttons exist before attaching event listeners
  const promoteBtn = document.getElementById('promote-btn');
  const demoteBtn = document.getElementById('demote-btn');
  const signOutBtn = document.getElementById('sign-out-btn');

  if (promoteBtn && demoteBtn && signOutBtn) {
    // Button event listeners
    promoteBtn.addEventListener('click', function () {
      const link = prompt("Enter the user's Roblox profile link:");
      if (link) {
        const userId = link.match(/users\/(\d+)/);
        if (userId && userId[1]) {
          const rank = prompt("Enter the rank name:");

          // Rank to ID mapping
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
            "Vice President": "too high"
          };

          const rankId = rankMapping[rank];

          if (rankId === "too high") {
            alert("The rank is too high or does not exist.");
          } else {
            // Send API request
            fetch(`https://api.romanager.bot/v1/role/${userId[1]}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': '25ea98b3-61d1-4aaf-9413-f0e28aca78f0'
              },
              body: JSON.stringify({
                roleRank: rankId
              })
            })
              .then(response => response.json())
              .then(data => {
                alert(`Successfully promoted user with ID ${userId[1]} to rank ${rank}`);
              })
              .catch(error => {
                alert('Failed to promote user.');
              });
          }
        } else {
          alert("Invalid link format. Please provide a valid Roblox profile link.");
        }
      }
    });

    demoteBtn.addEventListener('click', function () {
      const link = prompt("Enter the user's Roblox profile link:");
      if (link) {
        const userId = link.match(/users\/(\d+)/);
        if (userId && userId[1]) {
          const rank = "Customer"; // Demote to Customer

          // Send API request to demote
          fetch(`https://api.romanager.bot/v1/role/${userId[1]}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '25ea98b3-61d1-4aaf-9413-f0e28aca78f0'
            },
            body: JSON.stringify({
              roleRank: 1 // Customer rank ID
            })
          })
            .then(response => response.json())
            .then(data => {
              alert(`Successfully demoted user with ID ${userId[1]} to ${rank}`);
            })
            .catch(error => {
              alert('Failed to demote user.');
            });
        } else {
          alert("Invalid link format. Please provide a valid Roblox profile link.");
        }
      }
    });

    signOutBtn.addEventListener('click', function () {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      window.location.href = 'login.html';
    });
  } else {
    console.error("One or more buttons not found!");
  }
});
