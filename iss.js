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
  request('https://freegeoip.app/json/shit', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let coords = JSON.parse(body);
    const {longitude, latitude} = coords;
    callback(null, {longitude, latitude});

  });
};


module.exports = { fetchMyIP, fetchCoordsByIP};


