const client = require('../client');
const { hash } = require('../auth');

const users = {
  read: async () => {
    return (await client.query('SELECT * from users')).rows;
  },
  create: async ({
    firstname,
    lastname,
    username,
    zipcode,
    email,
    password,
    birthday,
    gender,
    role,
  }) => {
    const SQL = `INSERT INTO users(
      firstname,
      lastname,
      username,
      zipcode,
      email,
      password,
      birthday,
      gender,
      role) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

    return (
      await client.query(SQL, [
        firstname,
        lastname,
        username,
        zipcode,
        email,
        await hash(password),
        birthday,
        gender,
        role || null,
      ])
    ).rows[0];
  },
};

module.exports = users;
