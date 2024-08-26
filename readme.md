# InflApp

[Live Demo](https://infla-app.vercel.app/)

InflApp is an application designed to track and visualize price changes for groceries over time. It allows users to input product data, view historical price changes, and sort articles based on various criteria.

## Features

- **Track Price Changes:** Monitor how the price of groceries has changed over time.
- **User-Friendly Interface:** Simple and intuitive interface for adding, editing, and viewing product data.
- **Sorting Options:** Sort articles by price increase and time period.
- **Error Handling:** Includes robust error checking and user feedback.

## How It Works

1. **Add New Product:**

   - Click the "+" button to open a form for adding a new product.
   - Enter the product's name, start date, start price, end date, and end price.
   - Save the product to store it in the database and display it on the list.

2. **View Price Changes:**

   - See how the price of the product has changed between the start and end dates.
   - Calculate and display the percentage change and the duration in days.

3. **Sort and Filter:**
   - Sort products by price increase or by the time period for which the price was tracked.

**Note:** The backend for this application is hosted separately. You can find the backend repository [here](https://github.com/bartoszGic/Inflapp-backend).
