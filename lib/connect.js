const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection = client.db(DB_NAME);
    console.log(`Successfully connect to mongodb in database`);
  } catch (error) {
    console.log(`Could not connect to db. error: ${error}`);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
