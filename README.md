# Food Recipes - Hôm nay ăn gì

Welcome to "Food Recipes - Hôm nay ăn gì", a convenient app designed to help you choose recipes faster. With our app, you can easily find recipes that you can make using the ingredients available in your fridge.

## Deployed App

[Food Recipes - Hôm nay ăn gì](https://food-recipies-taupe.vercel.app/)

## Features

Our app has three main flows:

1. **Suggest Recipes:** Select the ingredients you have, and the app will recommend recipes you can prepare.
2. **Show Detailed Recipes:** View detailed steps and ingredients for each recipe.
3. **Add Recipes:** Contribute your own recipes to the app.

## Technology Stack

- **Frontend:** Next.js 14
- **Backend:** Server actions in Next.js 14, integrated with Prisma and MongoDB for database management.
- **Image Uploads:** Handled by Uploadthing.

## Getting Started

Follow these instructions to set up the app on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js installed on your machine. If not, download and install it from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/btdat1412/food-recipies.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd food-recipies
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**

   -Create a `.env` file in the root of the project and add the following:

   ```bash
   DATABASE_URL=your_database_url
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```

   -Replace `your_database_url`, `your_uploadthing_secret`, and `your_uploadthing_app_id` with your actual MongoDB URL, Uploadthing secret, and app ID respectively.

5. **Run the app:**
   ```bash
   npm run dev
   ```
   The app will start running on `localhost:3000` (or another port if specified).
