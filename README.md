# GigFlow Platform

A comprehensive platform connecting freelancers with clients, enabling seamless gig management and real-time collaboration.

## Features

-   **User Authentication**: Secure registration and login for freelancers and clients.
-   **Gig Management**: Post, browse, and manage gigs.
-   **Bidding System**: Freelancers can place bids on active gigs.
-   **Real-time Notifications**: Instant updates for hiring actions using Socket.io.
-   **Responsive Design**: Modern UI built with React and Tailwind CSS.

## Tech Stack

### Frontend

-   **React**: UI library
-   **Vite**: Build tool
-   **Tailwind CSS**: Styling
-   **Socket.io-client**: Real-time communication

### Backend

-   **Node.js & Express**: Server framework
-   **MongoDB**: Database
-   **Mongoose**: ODM
-   **Socket.io**: Real-time engine
-   **JWT**: Authentication

## Setup Instructions

### Prerequisites

-   Node.js installed
-   MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd gigflow-platform
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following variables:

    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173
    NODE_ENV=development
    ```

    Start the backend server:

    ```bash
    npm run dev
    ```

3. **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file in the `frontend` directory with the following variables:

    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

## API Endpoints

-   **Auth**: `/api/auth` (Register, Login)
-   **Gigs**: `/api/gigs` (CRUD operations)
-   **Bids**: `/api/bids` (Place and manage bids)
