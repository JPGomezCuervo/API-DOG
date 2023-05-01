const validationURL = (value, errors) => {
    if (!value) {
        return {...errors, url: 'URL is required'};
    }
    if (!value.match(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/ 
    )) {
        return {...errors, url: 'URL must be valid'};
    }
    if (value.length > 254) {
        return {...errors, url: 'URL must be less than 255 characters'};
    }
    return {...errors, url: ''};
};

export default validationURL;