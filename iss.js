const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let IP = JSON.parse(body);
    callback(null, IP.ip);

  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}), null`));
      return;
    }

    let coords = JSON.parse(body);
    const {longitude, latitude} = coords;
    callback(null, {longitude, latitude});

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    if (!(coords.latitude <= 90 && coords.latitude >= -90) || !(coords.latitude <= 180 && coords.latitude >= -180)) {
      callback(Error(`Coordinates are not valid`));
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
