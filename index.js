const $registrationForm = document.querySelector('#registrationForm');
const $error = document.querySelector('.error');
const $success = document.querySelector('.success');

let password = '';

const validate = ({ value, checked, name, type }) => {
    switch (type) {
        case 'text': {
            const regExp = /^[a-z ,.'-]+$/i;
            return regExp.test(value);
        }
        case 'email': {
            const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regExp.test(value);
        }
        case 'tel': {
            const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regExp.test(value);
        }
        case 'password': {
            if (name === 'password') {
                const regExp = /[0-9]/;
                password = value;
                return regExp.test(value);
            } else if (name === 'confirmPassword') {
                return password === value;
            }
        }
        case 'checkbox': {
            return checked;
        }
    }
}

$registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $formElements = $registrationForm.elements;
    let isSuccess = true;
    for (let i = 0; i < $formElements.length; i++) {
        const $item = $formElements[i];
        if ($item.name && !validate($item)) {
            isSuccess = false;
        }
    }
    $error.innerText = !isSuccess ? 'Some values are incorrect.' : '';
    $success.innerText = isSuccess ? 'All good.' : '';
});
