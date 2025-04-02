import knex from 'knex';
import knexConfig from '../config/knexfile';

const db = knex(knexConfig);

const User = {
  createUser: (user: { username: string; password: string }) => db('users').insert(user),
  getUserByUsername: (username: string) => db('users').where({ username }).first(),
  findOne:(username: string) => db('users').where({ username }).first()
};

export default User;  // <== Usa export default
