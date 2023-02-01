import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb+srv://mongoOnline:MongoPassTemp@cluster0.rqwqclw.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    console.log(dbUrl);
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
