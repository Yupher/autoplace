const filterObj = (obj, ...body) => {

    if (Array.isArray(body[0])) {
        body = body[0];
    }

    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (body.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


module.exports = filterObj;