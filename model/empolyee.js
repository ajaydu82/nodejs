const { ObjectId } = require("mongodb");
const connectDB = require("../config/db")
const validation = require("../constant/Constant");
const message = require("../constant/Message");

module.exports = {


    //    getAlluser:async function()
    //    {
    //        const database =  await connectDB()
    //        return database.collection("stud").find().toArray();
    //    }

    getuser: async function () {
        const database = await connectDB()
        return database.collection("class").find().toArray();
    }
    ,
    postuser: async function (data) {
        const database = await connectDB()
        try {
            return database.collection("class").insertOne(data)
        }
        catch (error) {
            return error;
        }
    },
    updateuser: async function (id, body) {
        const database = await connectDB()
        try {
            return database.collection("class").updateOne({ _id: ObjectId(id) }, { $set: body })
        } catch (error) {
            return error;
        }
    }
    ,
    deleteuser: async function (id) {
        const database = await connectDB()
        try {
            return database.collection("class").deleteOne({ _id: ObjectId(id) });
        } catch (error) {
            return error;
        }
    }
    ,
    getall_user: async function (pageobj) {
        let { limit, offset, page } = { ...pageobj };
        const res = {};
        const database = await connectDB();
        const total = await database.collection("class").count();
        const totalPage = Math.ceil(total/limit);
        if (page <= totalPage && page >= 1) {
            const data = await database.collection("class").aggregate([
                { $skip: parseInt((page - 1) * limit) },
                { $limit: parseInt(limit) },

            ]).toArray()
            res.status = true;
            res.limit = limit;
            res.totalPage = totalPage;
            res.currentPage = page;
            res.data = data;

        } else {
            res.status = false;
        }
        return res;

    }

}


