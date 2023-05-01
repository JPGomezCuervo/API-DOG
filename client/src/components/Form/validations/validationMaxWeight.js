const validationMaxWeight = (value, errors, {min_weight, max_weight},name) => {
    const cleanedName = name.split('_').join(' ');

    if(!value) {
        return {...errors, weight: `${cleanedName} is required`};
    }
    if (!value.match(/^[0-9]+$/)) {
        return {...errors, weight: `${cleanedName} must contain only numbers`};
    }
    if (value < 0 || value > 100) {
        return {...errors, weight: `${cleanedName} must be between 0 and 100 kg`};
    }
    if (min_weight === max_weight) {
        return {...errors, weight: `${cleanedName} must be different than min weight`};
    }
    if (max_weight === 0) {
     return {...errors, weight: `${cleanedName} cannot be 0`};
    }
    if (max_weight < min_weight) {
        return {...errors, weight: `${cleanedName} must be greater than min weight`};
    }
    return {...errors, weight: ''};
};
export default validationMaxWeight;