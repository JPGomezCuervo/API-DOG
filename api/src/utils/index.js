const averageWeight = require("./averageWeight");
const imperialToMetric = require("./imperialToMetric");
const containsNaN = require("./containsNaN");
const allDogsCleanerAPI = (data) => {
    return data.map((dog) => {
        
        const {id, name, height, weight, life_span, temperament, image} = dog;
        if (id && name && height.metric && containsNaN(weight)&& life_span && image.url) {
            return {
                id,
                name,
                height: `${height.metric} cm` ,
                weight: `${weight.metric} kg`,
                life_span,
                image: image.url,
                temperament,

                averageWeight: averageWeight(weight.metric)
            } 
        } else {
            return {
                id,
                name,
                height: `${height.metric} cm` ,
                weight: `${Math.floor(imperialToMetric(averageWeight(weight.imperial)))} kg`,
                life_span,
                image: image.image,
                temperament,
                averageWeight: Math.floor(imperialToMetric(averageWeight(weight.imperial))),
            }
        }
    })
};
const   allDogsCleanerDB = (data) => {
        return data.map((dog) => {
            const {id, name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments} = dog;
            const nameToUpperCase = name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return {
                    id,
                    name: nameToUpperCase,
                    height: `${min_height} - ${max_height} cm` ,
                    weight: `${min_weight} - ${max_weight} kg`,
                    life_span: `${min_life_span} - ${max_life_span} years`, 
                    image,
                    averageWeight: averageWeight(`${min_weight} - ${max_weight} kg`),
                    temperament: temperaments
                 
            }
        })
};
const individualCleanerDB = (data) => {
    const {id, name, min_height, max_height, min_weight, max_weight, min_life_span, max_life_span, image, temperaments} = data;
    const nameToUpperCase = name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            id,
            name: nameToUpperCase,
            height: `${min_height} - ${max_height} cm` ,
            weight: `${min_weight} - ${max_weight} kg`,
            life_span: `${min_life_span} - ${max_life_span} years`, 
            image,
            averageWeight: averageWeight(`${min_weight} - ${max_weight} kg`),
            temperament: temperaments
        
    }
};
const individualCleanerAPI = (data) => {
    
    return {
        id: data.id,
        name: data.name,
        height: `${data.height.metric} cm` ,
        weight: `${data.weight.metric} kg`,
        life_span: data.life_span,
        image: data.image.url
    }
};


const detailCleanerAPI = (data) => {
    return {
        id: data.id,
        name: data.name,
        height: `${data.height.metric} cm` ,
        weight: `${data.weight.metric} kg`,
        life_span: data.life_span,
        temperament: data.temperament,
        image: data.image.url
        
    }
};

module.exports ={
    allDogsCleanerAPI,
    individualCleanerAPI,
    detailCleanerAPI,
    allDogsCleanerDB, 
    individualCleanerDB
}
