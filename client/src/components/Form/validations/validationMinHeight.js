const validationMaxHeight = (value, errors, {min_height, max_height}, name) => {
    const cleanedName = name.split('_').join(' ');

    if(!value) {
        return {...errors, height: `${cleanedName} is required`};
    }
    if (!value.match(/^[0-9]+$/)) {
        return {...errors, height: `${cleanedName} must contain only numbers`};
    }
    if (value < 0 || value > 100) {
        return {...errors, height: `${cleanedName} must be between 0 and 100 cm`};
    }
    if (min_height === max_height) {
        return {...errors, height: `${cleanedName} must be different than min height`};
    }
    if (max_height === 0) {
        return {...errors, height: `${cleanedName} cannot be 0`};
    }
    if (max_height < min_height) {
        return {...errors, height: `Max height must be greater than min height`};
    }
    return {...errors, height: ''};
    
};

export default validationMaxHeight;