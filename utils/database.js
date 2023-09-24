import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    if (isConnected) {
        console.log("MongoDB Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlparser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);

    }
};