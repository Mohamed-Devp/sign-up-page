const submitButton = document.querySelector('.info-form button');
const inputContainrs = document.querySelectorAll('.input-container');
const infoForm = document.querySelector('.info-form');

const placeholders = [
    'First Name', 'Last Name',
    'Email Adress', 'Password'
]

// Returns true is a given email s is valid, false otherwise
function isValid(s) {
    if (!s.trim()) {
        return false;
    }
    
    const info = s.split('@');
    if (info.length !== 2) {
        return false;
    }

    const [username, domainName] = info;
    if (!username.trim() || !domainName.trim() || !domainName.includes('.')) {
        return false;
    }

    return true;
}

function onSubmit() {
    let correctInfo = 0;

    inputContainrs.forEach((container, index)=> {
        if (!(container instanceof HTMLElement)) {
            return;
        }

        const input = container.firstElementChild;

        if (!(input instanceof HTMLInputElement)) {
            return;
        }

        if ((index == 2 && isValid(input.value)) || (index != 2 && input.value)) {
            // Trigger an error message if the info is invalid
            container.classList.remove('error');
            input.placeholder = placeholders[index];

            correctInfo += 1;

        } else {
            // Otherwise hide the message
            const placeholder = index === 2 ? 'email@example.com' : '';

            container.classList.add('error');
            input.placeholder = placeholder;
            input.value = '';   
        }
    });

    // Update the body grid columns based on the given valid info
    if (window.innerWidth >= 1050) { // For responsive design
        document.body.style.gridTemplateRows = correctInfo === 4
            ? '50px 450px'
            : '50px 500px';

    } else {
        if (infoForm instanceof HTMLElement) {
            infoForm.style.height = correctInfo === 4
                ? '450px'
                : '500px';
        }
    }
}

// Runs once the DOM content is loaded
function onMount() {
    if (submitButton instanceof HTMLElement) {
        submitButton.addEventListener('click', onSubmit);
    }
}

document.addEventListener('DOMContentLoaded', onMount);