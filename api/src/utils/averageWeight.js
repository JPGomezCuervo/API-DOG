const averageWeight = (weight) => {
    
        const getNumbers = weight.split(' ').map(element =>
             parseFloat(element)).filter(element => !isNaN(element));
        
        
        if (getNumbers.length === 1) return weight.averageWeight = getNumbers[0];  
        const average = (getNumbers[0] + getNumbers[1]) / 2;
        weight.averageWeight = average;
        return Math.floor(average);

};
module.exports = averageWeight;