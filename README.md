# React E-Commerce Application

This is a simple shopping cart application built with React, utilizing React Router for navigation between different components such as the product list, cart, and wishlist. The app supports adding products to the cart, adjusting product quantities, removing products, searching by name, filtering by price range, and moving products between the cart and wishlist.

## Features

- **Product List**: View all products with filters for price range and name search.
- **Cart**: Add products to the cart, adjust quantities, remove items, and move items to the wishlist.
- **Wishlist**: Move products from the cart to the wishlist or remove items from the wishlist.
- **Persistent Data**: Cart and wishlist data are stored in `localStorage` to persist across page reloads.
- **Responsive Design**: The app is styled to be responsive and user-friendly.

## Components

### `App.js`

This is the main component that sets up routing and state management for the cart and wishlist. It contains the following key functionalities:

- **Cart and Wishlist Management**: Add products to the cart or wishlist, remove items, update quantities, and move items between the cart and wishlist.
- **Persistent State**: Uses `localStorage` to save cart and wishlist data.
- **Search Functionality**: Allows users to search products by name or description.

### `ProductList.js`

Displays the list of products. It includes:

- **Price Range Filter**: Users can filter products by setting a minimum and maximum price.
- **Name Search Filter**: Users can search products by name.
- **Add to Cart / Wishlist**: Provides buttons to add products to the cart or wishlist.

### `Cart.js`

Displays the user's cart with the following features:

- **Increment / Decrement Quantity**: Users can adjust product quantities in the cart.
- **Remove from Cart**: Users can remove products from the cart.
- **Move to Wishlist**: Users can move items from the cart to the wishlist.

### `WishList.js`

Displays the user's wishlist, allowing them to:

- **Move to Cart**: Move items from the wishlist to the cart.
- **Remove from Wishlist**: Remove products from the wishlist.

### `NavBar.js`

A simple navigation bar that includes links to the product list, cart, and wishlist. It also contains a search bar for filtering products by name.

### `ProductDetails.js`

Displays detailed information about a specific product, allowing users to add it to their cart or wishlist.

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ICSI518/assignment2-Nitish2665.git
### For the backend Part you need to go to the backend folder by the command "cd backend" and then install the node modules by the command `npm install` and run npm install and then `node app.js` simultaneously.
### This will host the backend in the 5000 port of the localhost
### Web Address: http://16.171.17.140:5000/
### EC2 instance: 16.171.17.140


## Updates - 
    - added User Auth
    - updated Cart and Wishlist

## Docker File Setup
    - Added DOCKERFILE and docker-compose.yml
    - To run the Docker
        docker-compose build up
        