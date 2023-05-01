

const containsNaN = (weight) => {
    const metricWeight = weight.metric;
    const splitter = metricWeight.split(' ');
    return !splitter.some(element => element === 'NaN');
};
module.exports = containsNaN;