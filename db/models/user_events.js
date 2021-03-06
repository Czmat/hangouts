const client = require('../client');

const user_events = {
  read: async () => {
    return (await client.query('SELECT * from user_events')).rows;
  },
  create: async ({ joinedUserId, eventId, isFavorite, status }) => {
    const SQL = `INSERT INTO user_events(
      "joinedUserId",
      "eventId",
      "isFavorite",
      status
      ) values($1, $2, $3, $4 ) returning *`;

    return (
      await client.query(SQL, [
        joinedUserId || null,
        eventId,
        isFavorite || false,
        status || null,
      ])
    ).rows[0];
  },
  update: async ({ isFavorite, status }, id) => {
    const SQL = `UPDATE "user_events" set "isFavorite"=$1, status=$2  WHERE id = $3 returning *`;

    const updatedEvent = (
      await client.query(SQL, [isFavorite || false, status, id])
    ).rows[0];
    return updatedEvent;
  },
  delete: async (id) => {
    return await client.query(
      `DELETE FROM "user_events" WHERE id=$1 returning *`,
      [id]
    );
  },
};

module.exports = user_events;
