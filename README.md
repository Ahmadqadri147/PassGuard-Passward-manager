# PassGuard - Password Manager

PassGuard is a secure and user-friendly password manager application built using the MERN stack (MongoDB, Express, React, Node.js). It allows you to store, manage, and retrieve your passwords efficiently with a modern interface.

## Features

- **Store Passwords**: Save your credentials for various websites securely.
- **Edit & Update**: Easily modify existing password entries.
- **Delete**: Remove passwords you no longer need.
- **Copy to Clipboard**: Quickly copy usernames, passwords, or URLs with a single click.
- **Toggle Visibility**: Show or hide passwords for security.
- **Interactive UI**: Built with Tailwind CSS for a clean and responsive design.
- **Notifications**: Real-time feedback using React Toastify.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Icons**: Lordicon, Flaticon

## Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas connection string.

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd passwardmanager-express
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup**
   Ensure your backend server is running on `http://localhost:3000`.
   ```bash
   # Navigate to backend directory
   npm install
   node server.js
   ```

## Usage

1. Open the application in your browser (usually `http://localhost:5173`).
2. Enter the Website URL, Username, and Password.
3. Click **Add Password** to save.
4. Use the **Edit** or **Delete** icons to manage entries.
5. Click the **Copy** icon to copy details to your clipboard.
