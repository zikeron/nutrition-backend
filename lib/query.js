const connectDb = require("./connect");
const errorEventHandler = require("./error-handler");

module.exports = {
  getDesserts: async () => {
    let db;
    let courses;

    try {
      db = await connectDb();
      courses = await db
        .collection("desserts")
        .find()
        .toArray();
    } catch (error) {
      errorEventHandler(error);
    }
    return courses;
  },
};
