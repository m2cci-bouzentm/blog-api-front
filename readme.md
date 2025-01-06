## Live Preview

- **Author Frontend**: [https://blog-api-front-author.vercel.app](https://blog-api-front-author.vercel.app)
- **User Frontend**: [https://blog-api-user-front.vercel.app](https://blog-api-user-front.vercel.app)

## API Repository**
- **Node.js API (Original): [https://github.com/m2cci-bouzentm/node-blog-api/tree/main](https://github.com/m2cci-bouzentm/node-blog-api/tree/main)
- **Spring Boot API (Migrated): [https://github.com/m2cci-bouzentm/springboot-blog-api](https://github.com/m2cci-bouzentm/springboot-blog-api)

# Blog Website

This project consists of two separate applications: one for authors to manage blog posts and another for users to view and comment on posts. Both applications use a Node.js Express-based API for backend services.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Applications](#running-the-applications)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/blog-api-front.git
   cd blog-api-front
   ```

2. Install dependencies for both `author-front` and `user-front`:
   ```sh
   cd author-front
   npm install
   cd ../user-front
   npm install
   ```

## Running the Applications

1. Start the backend API server (make sure you have Node.js and Express set up):

   ```sh
   cd path/to/your/backend
   npm install
   npm start
   ```

2. Start the `author-front` application:

   ```sh
   cd author-front
   npm run dev
   ```

3. Start the `user-front` application:
   ```sh
   cd user-front
   npm run dev
   ```

## Features

### Author Frontend

- **Login/Signup**: Authors can log in or sign up.
- **Create Post**: Authors can create new blog posts.
- **Edit Post**: Authors can edit existing blog posts.
- **Edit / Delete Comments**: Authors can edit / delete existing comments.
- **Publish/Unpublish Post**: Authors can publish or unpublish their posts.
- **Settings**: Authors can update their profile settings.

### User Frontend

- **Login/Signup**: Users can log in or sign up.
- **View Posts**: Users can view all published blog posts.
- **View Post Details**: Users can view details of a specific post.
- **Comment on Posts**: Logged-in users can comment on posts.
- **Settings**: Users can update their profile settings.

## Technologies Used

- **Frontend**: React, React-router, TypeScript, Shadcn, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Prisma, JWT, Express Validator
- **Authentication**: JSON Web Tokens (JWT)
- **Editor**: TinyMCE (for rich text editing in posts)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
