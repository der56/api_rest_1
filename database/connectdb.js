import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('db is connected 👌👌');
} catch(error){
    console.log('there is an error trying to connect to the database:' + error);
}