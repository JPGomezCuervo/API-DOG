import validationBreed from './validationBreed';
import validationMinHeight from './validationMinHeight';
import validationMaxHeight from './validationMaxHeight';
import validationMinWeight from './validationMinWeight';
import validationMaxWeight from './validationMaxWeight';
import validationMinLifeSpan from './validationMinLifeSpan';
import validationMaxLifeSpan from './validationMaxLifeSpan';
import validationURL from './validationURL';

    const validations = (value, name, errors, input) => {

        switch (name) {
            case 'breed':
                return validationBreed(value, errors);

            case 'min_height':
                return validationMinHeight(value, errors, input, name);

            case 'max_height':
                return validationMaxHeight(value, errors, input, name);

            case 'min_weight':
                return validationMinWeight(value, errors, input, name);

            case 'max_weight':
                    return validationMaxWeight(value, errors, input, name);
            case 'min_life_span':
                return validationMinLifeSpan(value, errors, input, name);
            
            case 'max_life_span':
                return validationMaxLifeSpan(value, errors, input, name);
            case 'url':
                return validationURL(value, errors);
                
            default:
                return {...errors};

        }
    };

    export default validations;