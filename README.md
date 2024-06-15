
# iNoteBook - Notes Taking Application

iNotebook is a full-stack notes-taking application built using the MERN stack and styled with Material Ui. It allows users to create, read, update, and delete notes.

## Features

- CRUD (Create, Read, Update, Delete) operations for notes
- User authentication (signup and login)
- Responsive design using Material UI

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Material UI
- JWT (JSON Web Token for authentication )

## Demo

Check out the deployed version of iNoteBook on Render: [iNoteBook Demo]([https://inotebook-1rmf.onrender.com/](https://inote-book-ohjb.onrender.com))

## Screenshots
<img width="941" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/4677e816-9dcc-46ab-9a87-7c43b5306276">

<img width="959" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/ad6f1889-aac9-40d4-9c04-c5385010901d">

<img width="959" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/9eb1d9db-6889-404d-a5c8-882c778371d3">

<img width="959" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/6a2f019d-caea-4a0f-867a-39eb02f66cef">

<img width="372" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/c8ceb658-1553-42b6-b4bf-53c814ca1561">
<img width="373" alt="image" src="https://github.com/Ankur-nbj/iNote-Book/assets/108694248/e03b8eee-8c79-4520-b049-1f826eda5f33">



## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/iNote-Book.git
   cd iNote-Book
   ```

2. Navigate to the server directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env` file in the `server` directory and add the following:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL='http://localhost:3000'
   ```

   Replace `your_mongodb_uri` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT token.

4. Navigate to the client directory and install dependencies:

   ```bash
   cd ../client
   npm install
   ```

5. Start the server and client:

   In the `server` directory, start the backend server:

   ```bash
   npm start
   ```

   In the `client` directory, start the React development server:

   ```bash
   npm start
   ```

   The client server will open automatically in your default browser at `http://localhost:3000`.

## Usage

- Register and login to create, view, update, and delete your notes.
- Use the responsive UI to manage your notes efficiently.

## Contributing

Contributions are welcome! Fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
