const getBookingsCountFromDb = require("./getBookingsCountFromDb");
const getProfileFromDb = require("./getProfileFromDb");

const expertIds = [1, 2, 3, 4];

let tempBookingCache = {};
let tempProfileCache = {};

const getBooking = async (id) => {
  if (!tempBookingCache[id]) {
    const bookingCount = await getBookingsCountFromDb(id);
    if (bookingCount) {
      tempBookingCache[id] = bookingCount;
      return tempBookingCache;
    }
  }
  return tempBookingCache;
};

const getProfile = async (id) => {
  if (!tempProfileCache[id]) {
    const profile = await getProfileFromDb(id);
    tempProfileCache[id] = profile;
    return tempProfileCache;
  }
  return tempProfileCache;
};

/** run db fetch asynchronously and cache-in-memory for reference */
expertIds.map((ids) => Promise.all([getBooking(ids), getProfile(ids)]));

const getResult = async (bookingCount, profilesId) => {
  let result = [];
  let industries = {}; // save industry name as key with result element index as value

  for (expertId in bookingCount) {
    profile = profilesId[expertId];

    if (profile.industry in industries) {
      const getIndustryIndex = industries[profile.industry];
      result[getIndustryIndex].bookings += bookingCount[expertId];
    } else {
      result.push({ ...profile, bookings: bookingCount[expertId] });
      industries[profile.industry] = result.length - 1;
    }
  }
  return result;
};

const result = async () => {
  console.time("timer");

  const bookingCount = await expertIds.reduce(async (_, ids) => {
    const getBookingCount = getBooking(ids);
    return getBookingCount;
  }, 0);

  const profiles = await Object.keys(bookingCount).reduce(async (_, ids) => {
    const getProfileInd = getProfile(ids);
    return getProfileInd;
  }, 0);

  const result = await getResult(bookingCount, profiles);
  console.timeEnd("timer");

  return result;
};

result().then((response) => console.log(response));

// todo, implement the transformation
// the expected output should be:
// [
//   { industry: 'automotive', bookings: 15 },
//   { industry: 'telecom', bookings: 2 }
// ]
