// returns a good response
const goodResponse = (h, data) => {
    return h.response(data).code(200);
}

// returns a bad response
const badResponse = (h, err) => {
    console.log(err);
    return h.response('error').code(400);
}

module.exports = {goodResponse, badResponse};