const connectDb = require("./connect");
const { ObjectID } = require("mongodb");
const errorEventHandler = require("./error-handler");

module.exports = {
  createDessert: async (root, { input }) => {
    const defaults = {
      dessert: "",
      nutritionInfo: {
        calories: 0,
        fat: 0,
        protein: 0,
      }
    };
    const newDessert = Object.assign(defaults, input);
    let db;
    let dessert;
    try {
      db = await connectDb();
      dessert = await db.collection("desserts").insertOne(newDessert);
      newDessert._id = dessert.insertedId;
    } catch (error) {
      errorEventHandler(error);
    }
    return newDessert;
  },
  removeDessert: async (root, { _id }) => {
    let db;
    try {
      db = await connectDb();
      await db.collection("desserts").deleteOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorEventHandler(error);
    }
    return `Course with ID: ${_id} has been removed successfully`;
  },
};
