const { nextISSTimesForMyLocation } = require('./iss');

//Test Cases for each function :

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('72.140.31.170', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned :' , data);

// });


// const coords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
 
// });


const showFlyOverTimes = (flyOverTimes) => {
  flyOverTimes.forEach(time => {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${date} for ${time.duration} seconds!`);
  });
};



nextISSTimesForMyLocation((error, flyTimes) => {
  if (error) {
    return console.log(`Something's wrong...`, error);
  }
  showFlyOverTimes(flyTimes);
});

