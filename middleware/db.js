import mongoose from 'mongoose';

const connectDB = async () => { mongoose.connect("mongodb+srv://Remixrty666:Kotyagotya0316@molty.3kwwc.mongodb.net/payment-details?retryWrites=true&w=majority"); console.log('success'); }

export default connectDB;