const validationTemperaments = (temperaments, errors) => {
  if (temperaments.length === 0) {
    return {...errors, temperaments: 'Temperaments are required'};
  }
  if (temperaments.length > 11) {
    return {...errors, temperaments:'Temperaments must be less than 11'};
    }
    return { ...errors, temperaments: '' } 
};

export default validationTemperaments;