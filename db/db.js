module.exports = {
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'productManagement',
    password: '111111',
    port: 5432
  },
  afterCreate(){
    console.log('created');
  },
  log(msg){
    console.log(msg);
  }
};

