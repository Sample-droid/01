// test-login.js

// If you’re on Node v18+ you can use the built-in fetch.
// Otherwise install node-fetch: npm install node-fetch
// and uncomment the next line:
// const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('http://localhost:8000/login/logincheck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Admin',
        
        
        password: '00000'
      }),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response body:', data);
  } catch (err) {
    console.error('Error calling logincheck:', err);
  }
})();
