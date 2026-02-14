# eCommerce Product List

A React Native mobile application for browsing and managing an eCommerce product catalog with features like product listing, detailed product views, quantity selection, and a shopping cart system.

## Overview

eCommerceProductList is a mobile shopping application built with React Native. It allows users to browse products, view detailed information, select quantities, and manage a shopping cart with persistent storage.

## Features

**Key Features:**

- Browse product listings with images and details
- View detailed product information
- Add/remove products from cart
- Adjust product quantities in cart
- Persistent cart storage using AsyncStorage
- Navigation between screens (Home, Product Details, Cart)
- Redux state management

### 1. Clone or Extract the Project

```bash
cd eCommerceProductList
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

## Project Structure

```
eCommerceProductList/
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── headerStyle.js
│   │       ├── productDetailScreenStyle.js
│   │       ├── productdetailsStyle.js
│   │       ├── productstyle.js
│   │       └── quantitystyle.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Product.js
│   │   ├── ProductDetails.js
│   │   ├── ProductCartDetails.js
│   │   ├── QuantitySelector.js
│   │   └── redux/
│   │       ├── actions.js
│   │       ├── constants.js
│   │       ├── reducer.js
│   │       ├── rootReducer.js
│   │       └── store.js
│   └── Data/
│       └── product.js
├── App.tsx
├── index.js
└── README.md
```

#### **Platform-Specific Directories**

## Running the App

### Android

Start the Metro bundler:

```bash
npm start
```

In a new terminal, run:

```bash
npx react-native run-android
```

## Project Setup Details

### State Management

The app uses **Redux** with **redux-persist** for state management:

- **Redux Store:** Manages cart state globally
- **Redux Persist:** Automatically saves cart state to AsyncStorage
- **AsyncStorage:** Provides persistent storage on device

### Navigation

The app uses **React Navigation** with **Native Stack Navigator**:

- **Product Screen (Home):** Displays list of all products
- **ProductDetails Screen:** Shows detailed information about a selected product
- **ProductCartDetails Screen:** Manages and displays shopping cart items

### Storage

- **AsyncStorage:** Stores cart items persistently across app sessions
- **Redux Persist:** Automatically syncs Redux state with AsyncStorage

## Developer

Anjali Kashyap (React-Native Developer)
