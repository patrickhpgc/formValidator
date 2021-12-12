let validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = document.querySelectorAll('input');

        validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let element = inputs[i];

            let check = validator.checkInput(element);

            if (check !== true) {
                send = false;
                validator.showError(element, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');

                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'O campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo precisa ter pelo menos ${rDetails[1]} caracters.`;
                        }
                        break;
                    case 'email':
                        if(input.value !=''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Email inválido.';
                            }
                        }   
                        break;    
                    default:
                        break;
                }

            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = 'red';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors: () => {
        let errorElements = document.querySelectorAll('.error');
        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
            
        }

        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('.formCadastro');
form.addEventListener('submit', validator.handleSubmit);