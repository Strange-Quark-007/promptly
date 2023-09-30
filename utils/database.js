import mongoose from "mongoose";

export const connectToDB = async () => {

    let isConnected = false;

    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlparser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
    } catch (error) {
        // console.log(error);
    }
};