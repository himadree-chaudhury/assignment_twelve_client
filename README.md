# Matrimony Platform - Client Side

**Website Name**: Matrimony Connect  
**Admin Email**: admin@matrimonyconnect.com  
**Admin Password**: Admin123!  
**Live Site URL**: [https://matrimony-connect.vercel.app](https://matrimony-connect.vercel.app)  
**Client Repository**: [https://github.com/username/matrimony-client](https://github.com/username/matrimony-client)

## Overview

Matrimony Connect is a user-friendly platform built with React and Tailwind CSS, designed to help users find potential life partners. The client-side application provides an intuitive interface with responsive design, private routes, and seamless data fetching using Tanstack Query. This repository contains the frontend code for the Matrimony platform, with over 20 notable GitHub commits.

## Features

- **Responsive Design**: Fully responsive homepage, biodatas page, and dashboards for mobile, tablet, and desktop views.
- **Dynamic Navbar**: Includes logo, website name, and conditional Dashboard link based on user login status.
- **Eye-Catching Banner**: Features a visually appealing slider showcasing the platform's purpose.
- **Premium Member Cards**: Displays 6 premium biodata cards with age-based sorting (ascending/descending).
- **Biodatas Page with Filters**: Allows filtering by age, biodata type, and division, with pagination for 20 biodata cards.
- **Secure Authentication**: Supports email/password and Google Sign-in, with JWT-protected private routes.
- **Biodata Details Page**: Shows detailed biodata info, with premium member contact visibility and favorite functionality.
- **User Dashboard**: Includes routes for editing biodata, viewing biodata, managing contact requests, favorites, and submitting success stories.
- **Admin Dashboard**: Provides admin tools to manage users, approve premium requests, and view success stories, with a pie chart for stats.
- **Success Story Section**: Displays marriage success stories sorted by date, with couple images and reviews.
- **SweetAlert2 Notifications**: Custom alerts for CRUD operations, login, and signup, enhancing user experience.
- **Tanstack Query Integration**: Efficient data fetching for all GET requests, ensuring fast and reliable UI updates.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/matrimony-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd matrimony-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add environment variables (e.g., Firebase config, API URL):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

- Access the live site at [https://matrimony-connect.vercel.app](https://matrimony-connect.vercel.app).
- Log in with the admin credentials (`admin@matrimonyconnect.com`, `Admin123!`) to explore admin features.
- Create a user account to experience biodata creation, filtering, and contact requests.

## Technologies Used

- React
- Tailwind CSS
- React Router
- Tanstack Query
- SweetAlert2
- Firebase (for Google Sign-in)
- Stripe (for payments)
