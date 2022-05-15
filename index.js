const STORAGE_API_HOST = `https://wk4-hosting.herokuapp.com`;

window.addEventListener('DOMContentLoaded', () => {
    // fields for creating new user and retrieve user by username
    const addUsername = document.querySelector('#username');
    const addAge = document.querySelector('#age');
    const findByUserName = document.querySelector('#findByUsername');

    // button for adding user and finding user
    const addUserButton = document.querySelector('#register');
    const findUserButton = document.querySelector('#findMe');

    // textarea field
    const userDetails = document.querySelector('#userDetails');

    // time retrieved
    const timeRetrieved = document.querySelector('#time-retrieved');

    // uploads user input to create user when button is clicked
    addUserButton.onclick = (event) => {
        event.preventDefault();
        const usernameVal = addUsername.value;
        const ageVal = addAge.value;
        const data = {username: usernameVal, age: ageVal};
        fetch(`${STORAGE_API_HOST}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                alert("You are registered!");
            })
            .catch((error) => alert(error.message))
            .finally(() => {
                // reset input fields after registering user
                addUsername.value = '';
                addAge.value = '';
            })
    }

    // retrieves the user details by its username
    findUserButton.onclick = (event) => {
        event.preventDefault();
        // for testing
        // alert("This button is working");
        const findUserNameVal = findByUserName.value;
        fetch(`${STORAGE_API_HOST}/users/${findUserNameVal}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const usernameReturned = json.username;
                const ageReturned = json.age;
                userDetails.value = "Username: " + usernameReturned + "\n" + "Age: " + ageReturned;
                timeRetrieved.textContent = new Date().toLocaleString();
            })
            .catch((error) => alert(error.message))
    }

});