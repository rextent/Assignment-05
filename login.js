
document.getElementById('submit-btn').addEventListener('click', function () {
    const inputUserName = document.getElementById('input-username');
    const username = inputUserName.value;
    console.log(username);

    const inputPassword = document.getElementById('input-pin');
    const password = inputPassword.value;
    console.log(password);

    if(username =='admin' && password =='admin123'){
        window.location.assign('./home.html')
    }
    else{
        alert('login Failed');
        return;
    }
})