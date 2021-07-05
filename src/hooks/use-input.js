import { useState } from 'react';

const useInput = (validations) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const isValid = validateInput();

    const hasError = !isValid && touched;

    const onValueChange = (event) => {
        setTouched(true);
        setValue(event.target.value);
    }

    const reset = () => {
        setValue('');
        setTouched(false);
    }

    function validateInput() {
        let valid = true;
        if (validations) {
            validations.forEach(validation => {
                switch (validation) {
                    case 'required':
                        valid = value.trim() !== '';
                        break;
                    case 'min':
                        valid = +value > 0;
                        break;
                    case 'discount':
                        valid = +value >= 0 && +value <= 100;
                        break;
                    default:
                        valid = true;
                }
            });
        }
        return valid;
    }

    return {
        value,
        isValid,
        hasError,
        onValueChange,
        reset
    };
}

export default useInput;