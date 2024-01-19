const checkValidity = (value, required) => {

    let isValid = true;

    if (required.empty) {
        isValid = value.trim().length !== 0 && isValid;
    }

    if (required.minLength) {
        isValid = value.trim().length > required.minLength && isValid;
    }

    if (required.maxLength) {
        isValid = value.trim().length < required.maxLength && isValid;
    }

    if (required.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;

}

export default checkValidity;
