require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const productRoutes = require('./Routes/api');
const authRouutes = require('./Routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log('MongoDB URI:', process.env.MONGO_URI);
app.use('/api', productRoutes);
app.use('/auth', authRouutes);
app.use(express.static(path.join(__dirname, 'public')))


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
