const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'learning';

let db;
const databaseConnect = () =>
    MongoClient.connect(url).then((client, err) => {
        assert.equal(null, err);
        db = client.db(dbName)
        console.log("Database connected successfully")
    })

const getAuthorsAward = async (awards) => {
    const collection = await db.collection('authors')
    let query_result = collection.find({awards : {$exists:true}, $where: `this.awards.length >= ${awards}` }).toArray()
    return query_result
}

const getAuthorsYear = async (year) => {
    const collection = await db.collection('authors')
    let query_result = collection.find({ awards: { $elemMatch: { year: { $gte: year } } } }).toArray()
    return query_result
}

const getAllSelling = async () =>{
    const collection = await db.collection('books')
    let query_result = collection.aggregate([{
        $group: {
          _id: { authorId : "$authorId" },
          totalBookSold: { $sum: "$sold"  },
          totalProfit: { $sum: { $multiply: [ "$price", "$sold" ] } },
        }
      }]).toArray()
    return query_result
}

const getHighPrice = async (birthDate, totalPrice) => {
    const collection = await db.collection('authors')
    let query_result = collection.aggregate([
        { $match: { birth: { $gte: new Date(birthDate) } } },
        {
            $lookup:
            {
                from: "books",
                localField: "_id",
                foreignField: "authorId",
                as: "bookDetails"
            }
        },
        { $project: { _id: 1, totalBookPrice: { $sum: "$bookDetails.price" } } },
        { $match: { totalBookPrice: { $gte: totalPrice } } }]).toArray()
    return query_result
}

module.exports = { databaseConnect , getAuthorsAward, getAuthorsYear, getAllSelling, getHighPrice}

