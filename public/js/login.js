
const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('').value;
    const password = document.querySelector('').value;
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

    const name = document.querySelector('').value;
    const email = document.querySelector('').value;
    const password = document.querySelector('').value;

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                fullName,
                email,
                password
            })
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};


const createAcc = async (req, res) => {
    document.location.replace('/createAccount')
}
document.querySelector('');
document.addEventListener('submit', login);

document.querySelector('');
document.addEventListener('submit', signUp);