const info = (message) => {
    if (process.env.NODE_ENV === 'local') {
        console.log(message);
    } else {
        // use logger like logstash, etc
        console.log(message);
    }
};

const error = (message) => {
    if (process.env.NODE_ENV === 'local') {
        console.log(message);
    } else {
        // use logger like logstash, etc
        console.log(message);
    }
};

module.exports = {
    info,
    error,
};
