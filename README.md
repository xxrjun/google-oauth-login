# Google OAuth Authentication with Node.js

## Project Overview

This project is a [Node.js](https://nodejs.org/en) application using [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). It provides authentication via [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2?hl=zh-tw) and includes routes for user profiles and posts.

This is a simple project for the lightning talk on OAuth 2.0 in the Web Programming Course in my sophomore year. You can get the presentation [here](./docs/109403019_lightning_talk_OAuth2.pdf).

## Installation Instructions

### Clone the Repository

```sh
git clone https://github.com/xxrjun/google-login-oauth.git
cd google-login-oauth
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DB_CONNECT=<Your MongoDB connection string>
SECRET=<Your session secret>
GOOGLE_CLIENT_ID=<Your Google Client ID>
GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
```

> [!TIP]
> You can get your MongoDB connection string by creating a new cluster in [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). Please refer to [Get Started with Atlas](https://www.mongodb.com/docs/atlas/getting-started/) for more information.

> [!TIP]
> Please get your Google Client ID and Client Secret by creating a new project in the [Google Developers Console](https://console.developers.google.com) and enabling the Google APIs. Please remember to add Authorized redirect URIs. For the example in this project, the redirect URI is `http://localhost:8080/auth/google/redirect`.

## Usage

### Starting the Server

Run the following command to start the server:

```sh
npm start
```

### Accessing the Application

Open your browser and navigate to `http://localhost:8080` to access the application.

## Project Structure

```
.
├── app.js                     # Main application file
├── config
│   └── passport.js            # Passport configuration
├── models
│   ├── post-model.js          # Post model schema
│   └── user-model.js          # User model schema
├── routes
│   ├── auth-route.js          # Authentication routes
│   └── profile-route.js       # Profile routes
├── views
│   ├── index.ejs              # Home page view
│   └── profile.ejs            # Profile page view
├── package.json               # Project dependencies and scripts
└── package-lock.json          # Dependency lock file
```

## Configuration

**Passport Configuration**: The `config/passport.js` file handles the Google OAuth strategy, including serialization and deserialization of user sessions.

## Dependencies

You can check this in `package.json` file.

- express
- mongoose
- dotenv
- express-session
- passport
- passport-google-oauth20
- ejs
- nodemon

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.
