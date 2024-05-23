import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    // Add your MongoDB connection URI here
    const MONGODB_URI = 'mongodb+srv://aditya4sure:evcharging@findthegod.rw5ldjz.mongodb.net/?retryWrites=true&w=majority&appName=FindTheGod';

    await mongoose.connect(MONGODB_URI, {
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return;
  }
};

export default connectDb;
