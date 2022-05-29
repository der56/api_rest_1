import mongoose from "mongoose";

//URi_MONGO es la variable de el enlace a mi db para usar esta variable crear archivo .env y poner URI_MONGO=enlaceDB

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('db is connected 👌👌');
} catch(error){
    console.log('there is an error trying to connect to the database:' + error);
}