const login = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#userEmail').value;
  const password = document.querySelector('#userPassword').value;
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signUp = async (event) => {
  event.preventDefault();

  const fullName = document.querySelector('#fullName-signUp').value;
  const email = document.querySelector('#email-signUp').value;
  const password = document.querySelector('#pwd-signUp').value;

  if (fullName && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const createAcc = async (req, res) => {
  document.location.replace('/createAccount');
};
document.querySelector('.login-page');
document.addEventListener('submit', login);

document.querySelector('.signUp');
document.addEventListener('submit', signUp);
