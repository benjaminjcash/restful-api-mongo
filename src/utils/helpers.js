exports.sanitizeObject = (obj) => {
    let sanitizedObject = Object.assign(obj, {});
    Object.keys(sanitizedObject).forEach((key) => {
        if(sanitizedObject[key] == '') {
            delete sanitizedObject[key];
        }
    });
    return sanitizedObject;
}