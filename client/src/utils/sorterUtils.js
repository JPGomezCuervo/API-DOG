//Sorteadores bàsicos

const sortAtoZ = (array) => {
    return array.sort((a, b) => a.name.localeCompare(b.name));
}


const sortZtoA = (array) => {

    return array.sort((a, b) => b.name.localeCompare(a.name));
};


const sortLightier = (array) => {
    return array.sort((a, b) => {
        if (parseInt(a.averageWeight) > parseInt(b.averageWeight)) return 1;
        if (parseInt(a.averageWeight) < parseInt(b.averageWeight)) return -1;
        return 0;  
    }
    );
}

const sortHeavier = (array) => {
    return array.sort((a, b) => {
        if (parseInt(a.averageWeight) < parseInt(b.averageWeight)) return 1;
        if (parseInt(a.averageWeight) > parseInt(b.averageWeight)) return -1;
        return 0;
    }
    );
}

// Crea un objeto con las letras separadas

const objectByLetters = (array) => {
    const dogsByInitialLetter = {};

    for (let dog of array) {
        const inital = dog.name.charAt(0);
        if (!dogsByInitialLetter[inital]) {
            dogsByInitialLetter[inital] = [];
        }
        dogsByInitialLetter[inital].push(dog);
    }
    return dogsByInitialLetter;
};
// crea un objeto con los pesos separados
const objectByNumbers = (array) => {
    if (array[0].averageWeight > array.at(-1).averageWeight) {
        const dogsByNumber = {};
    
        for (let i = 0 ; i < array.length; i++) {
            const number = Math.floor((array[i].averageWeight))
            if (!dogsByNumber[number]) {
                dogsByNumber[number] = [];
            }
            dogsByNumber[number].push(array[i]);
        }
        dogsByNumber.type = 'Mayor a menor'
        return dogsByNumber;
    } else {
        const dogsByNumber = {};
    
        for (let i = 0 ; i < array.length; i++) {
            const number = (array[i].averageWeight);
            if (!dogsByNumber[number]) {
                dogsByNumber[number] = [];
            }
            dogsByNumber[number].push(array[i]);
        }

        dogsByNumber.type = 'Menor a mayor'
        return dogsByNumber;

    }
};

// organiza el array de cada propiedad de acuerdo al segundo filtro

const secondFilter = (obj, filter) => {

    for (let key in obj) {
        if (key !== 'type') {
            obj[key] = filter(obj[key]);
        }
        
    };
    return obj;
};

// convierte el objeto en un array
const objectToArray = (obj) => {
    const array = [];
    for (let key in obj) {
        array.push(obj[key]);
    };
    return array;
};

// Aplanador de arrays

const flatten = (array) => {
    return array.flat();
};
// middleware que determina si el array debe estar ordendo de mayor a menor o viceversa, si es de mayor a menor, se invierte el array

const reverse = (obj) => {
    if (obj.type === 'Mayor a menor') {
    const array = [];
    for (let key in obj) {
        array.push(obj[key]);
    };
    const reversed = array.reverse();
    return reversed.splice(1);
    } else {
        const array = [];
        for (let key in obj) {
            array.push(obj[key]);
        };
        array.pop();
        return array;
    }
};


export {
    sortAtoZ,
    sortZtoA,
    sortLightier,
    sortHeavier,
    objectByLetters,
    objectByNumbers,
    secondFilter,
    objectToArray,
    flatten,
    reverse
}