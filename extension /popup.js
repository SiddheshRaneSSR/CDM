// popup.js

document.addEventListener('DOMContentLoaded', function () {
    // Get the reference to both sections
    const loggedInSection = document.getElementById('loggedin-section');
    const loggedOutSection = document.getElementById('loggedout-section');
    const loginButton = document.getElementById('login-button');
  
    // Function to update the visibility of sections based on login status
    function updatePopupUI(isLoggedIn) {
      if (isLoggedIn) {
        loggedInSection.style.display = 'block';
        loggedOutSection.style.display = 'none';
      } else {
        loggedInSection.style.display = 'none';
        loggedOutSection.style.display = 'block';
      }
    }
  
    // Function to send a message to the background script requesting login status
    function getLoginStatus() {
      chrome.runtime.sendMessage({ requestLoginStatus: true }, function (response) {
        // if (response && response.isLoggedIn !== undefined) {
          updatePopupUI(response.isLoggedIn);
        //}
      });
    }
  
    // Call the function to get the login status when the popup is opened
    getLoginStatus();
  
    // Event listener for the login button
    loginButton.addEventListener('click', function () {
      // Open a new tab or redirect to your website's login page
      chrome.tabs.create({ url: 'http://localhost:3000/login' });
    });
  });
  