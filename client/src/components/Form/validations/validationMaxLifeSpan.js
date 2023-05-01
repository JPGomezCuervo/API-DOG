const validationMaxLifeSpan = (value, errors, {min_life_span, max_life_span}, name) => {
    const cleanedName = name.split('_').join(' ');
   
   if (!value) {
    return {...errors, life_span: `${cleanedName} is required`};
   }
    if (!value.match(/^[0-9]+$/)) {
        return {...errors, life_span: `${cleanedName} must contain only numbers`};
    }
    if (value < 0 || value > 25) {
        return {...errors, life_span: `${cleanedName} must be between 0 and 25 years`};
    }
    if (min_life_span === max_life_span) {
        return {...errors, life_span: `${cleanedName} must be different than min life span`};
    }
    if (max_life_span === 0) {
        return {...errors, life_span: `${cleanedName} cannot be 0`};
    }
    if (max_life_span < min_life_span) {
        return {...errors, life_span: `${cleanedName} must be greater than min life span`};
    }
    return {...errors, life_span: ''};
};

export default validationMaxLifeSpan;