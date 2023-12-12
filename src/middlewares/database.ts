import db from '../database/models';

export default () => {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('Connected to Database')
    })
    .catch((err: string) => {
      console.error('Unable to connect to the database: ', err);
    });
  };