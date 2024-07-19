import mongoose from "mongoose";

const uri = process.env.MONGO_CONN_STR ?? "";

async function connect(dbName: string) {
    return mongoose.connect(uri + dbName);
}

export default { connect }