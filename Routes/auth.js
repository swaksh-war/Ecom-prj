const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../Middleware/authenticate');
const JWT_SECRET_KEY = 'abcdefghijklmnopqrstuvwxyz'

router.post('/register', async (req, res) => {
    const {username, email ,password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json(({message: 'Email already in use'}));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (err) {
        res.status(500).json({message: "Error Registering User", error});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {expiresIn: '1h'});
        res.json({ token });
    } catch (err) {
        res.status(500).json({message: 'Error loggin in', err});
    }
});


router.put('/profile', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { username, email, password } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(userId, updateData, {new: true}).select('password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message : 'Error updating user profile', err});
    }
});


module.exports = router;