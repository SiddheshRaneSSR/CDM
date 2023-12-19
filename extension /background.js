// background.js

// Function to fetch the login API
async function checkLoginStatus() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'yourUsername', password: 'yourPassword' }) // Replace with actual credentials or retrieve them from the user
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.isLoggedIn) {
          console.log('User is authenticated and currently logged in.');
          return true;
        } else {
          console.log('User is not logged in.');
          return false;
        }
      } else {
        console.error('Login API returned an error:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.requestLoginStatus) {
      // Respond with the current login status
      sendResponse({ isLoggedIn: isLoggedIn });
    }
  });




  // Call the function to check login status whenever needed
  async function performLoginCheck() {
    const isLoggedIn = await checkLoginStatus();
    // Do something with the login status (e.g., update a variable)
    console.log('User is logged in:', isLoggedIn);
  }
  
  // Call the login check function when the extension starts
  performLoginCheck();
  