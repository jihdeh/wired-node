const profiles = {
  1: { industry: "automotive" },
  2: { industry: "telecom" },
  3: { industry: "automotive" },
  4: { industry: "agriculture" },
};

async function getProfileFromDb(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(profiles[id]), 2000)
  );
}

module.exports = getProfileFromDb;
