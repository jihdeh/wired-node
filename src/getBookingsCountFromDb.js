const bookings = {
  1: 10,
  2: 2,
  3: 5,
  4: 0,
};

async function getBookingsCountFromDb(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(bookings[id]), 2000)
  );
}

module.exports = getBookingsCountFromDb;
