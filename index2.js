const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');


fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(nextISSTimesForMyLocation)
.then((passTime => console.log(passTime)))
.catch((err) => {
  console.log("Something went wrong...", err.message)
})
