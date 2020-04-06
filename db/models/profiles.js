const client = require('../client');

const profiles = {
  read: async () => {
    return (await client.query('SELECT * from user_profiles')).rows;
  },
  create: async ({ user_profile }) => {
    const SQL = `INSERT INTO user_profiles(communicationPreference, gender, orientation, politicalAffiliation, religiousAffiliation, careerId, education, pets, age, financialStatus) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`;
    return (
      await client.query(SQL, [
        user_profile.user_id,
        user_profile.communicationPreference,
        user_profile.gender,
        user_profile.orientation,
        user_profile.politicalAffiliation,
        user_profile.religiousAffiliation,
        user_profile.careerId,
        user_profile.education,
        user_profile.pets,
        user_profile.age,
        user_profile.financialStatus,
      ])
    ).rows[0];
  },
};

module.exports = profiles;
