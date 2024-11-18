const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');
const Wishlist = require('../models/wishlist');
const authenticate = require('../Middleware/authenticate');
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        // console.log(products);
        res.json(products);
    } catch (err) {
        console.error("Error fetching products", err);
        res.status(500).json({'message' : 'Error fetching products', err});
    }
});




router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

router.get('/cart', authenticate ,async (req, res) =>  {
    try {
        const userId = req.user.userId; 
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ 'message': 'Cart not found' });
        res.json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ 'message': 'Error fetching cart', err });
    }
});

router.post('/cart', authenticate ,async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const userId = req.user.userId;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex !== -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ message: 'Error adding to cart', err });
    }
});

router.delete('/cart/:productId', authenticate,async (req, res) => {
    const { productId } = req.params;
    try {
        const userId = req.user.userId;
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error('Error removing from cart:', err);
        res.status(500).json({ message: 'Error removing from cart', err });
    }
});

router.get('/wishlist', authenticate,async (req, res) => {
    try {
        const userId = req.user.userId;
        const wishlist = await Wishlist.findOne({ userId }).populate('items.productId');
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
        res.json(wishlist);
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(500).json({ message: 'Error fetching wishlist', err });
    }
});

router.post('/wishlist', authenticate,async (req, res) => {
    const { productId } = req.body;
    try {
        const userId = req.user.userId;
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        const productExists = wishlist.items.some(item => item.productId.toString() === productId);
        if (!productExists) {
            wishlist.items.push({ productId });
            await wishlist.save();
        }

        res.json(wishlist);
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.status(500).json({ message: 'Error adding to wishlist', err });
    }
});


router.delete('/wishlist/:productId', authenticate,async (req, res) => {
    const { productId } = req.params;
    try {
        const userId = req.user.userId;
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
        await wishlist.save();
        res.json(wishlist);
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.status(500).json({ message: 'Error removing from wishlist', err });
    }
});



module.exports = router;