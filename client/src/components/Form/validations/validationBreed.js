const validationBreed = (value, errors) => {
    if(!value) {
        return {...errors, breed: 'Breed is required'};
    }

    if (value.length < 3) {
        return {...errors, breed: 'Breed must be at least 3 characters long'};
    }
    if (value.length > 30) {
        return {...errors, breed: 'Breed must be less than 20 characters long'};
    }
    if (!value.match(/^[a-zA-Z\s]+$/)) {
        return {...errors, breed: 'Breed must contain only letters'};
    }
    return {...errors, breed: ''};
}; 

export default validationBreed;