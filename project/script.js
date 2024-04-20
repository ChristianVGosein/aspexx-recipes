
  // Element selectors
  let loginBtn = document.querySelector('#loginBtn');
  let logoutBtn = document.querySelector('#logoutBtn');
  let reviewForm = document.querySelector('#reviewForm');
  let signupForm = document.querySelector('#signupForm'); // Assuming there's a signup form in your HTML
  
  function setLoggedInUI(user){
      M.toast({html: 'Logged In!'});
      document.querySelector('#user').textContent = `Signed in as ${user.displayName || "Anonymous"}`;
      document.querySelector('#loginBtn').style.display = 'none';
      document.querySelector('#logoutBtn').style.display = 'inline-block';
  }
  
  function setLoggedOutUI(){
      M.toast({html: 'Logged Out!'});
      document.querySelector('#user').textContent = '';
      document.querySelector('#loginBtn').style.display = 'inline-block';
      document.querySelector('#logoutBtn').style.display = 'none';
  }
  
  // Event listeners
  logoutBtn.addEventListener('click', () => logout(auth));
  loginBtn.addEventListener('click', () => signIn(auth));
  reviewForm.addEventListener('submit', submitReview);
  setAuthListeners(auth, setLoggedInUI, setLoggedOutUI);
  
  // New function to handle user signup
  function handleSignup(email, password, username) {
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Update profile with username
              return updateProfile(userCredential.user, {
                  displayName: username
              });
          })
          .then(() => {
              setLoggedInUI(auth.currentUser);
          })
          .catch((error) => {
              M.toast({html: `Signup Error: ${error.message}`});
              console.error("Signup failed:", error);
          });
  }
  
  // Attach event to signup form
  if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = document.querySelector('#signupEmail').value; // Assuming input ID is 'signupEmail'
          const password = document.querySelector('#signupPassword').value; // Assuming input ID is 'signupPassword'
          const username = document.querySelector('#signupUsername').value; // Assuming input ID is 'signupUsername'
          handleSignup(email, password, username);
      });
  }
  
  
  // Function to handle changes in the dropdown
  function handleSelectChange(selectedValue) {
    if (selectedValue === 'logout') {
        logout();
    } else {
        window.location.href = selectedValue;
    }
  }
  
  function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log('User logged out');
        window.location.href = 'index.html'; // Redirect to the login page or a public page
    }).catch((error) => {
        console.error('Logout failed', error);
        alert('Logout failed: ' + error.message);
    });
  }


