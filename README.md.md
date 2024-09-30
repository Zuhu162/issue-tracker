# Next.js Issue Tracker

This project is a full-stack issue tracking application built with Next.js 13+, TypeScript, and Prisma. It features a modern UI created with Radix UI and Tailwind CSS, and implements user authentication using NextAuth.js.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete issues
- Assign issues to users
- Filter, sort, and paginate issues
- Markdown support for issue descriptions
- User authentication with Google
- Dashboard with latest issues and statistics
- Responsive design

## Technologies Used

- Next.js 13+ (with App Router)
- TypeScript
- Prisma (ORM)
- MySQL
- Radix UI
- Tailwind CSS
- NextAuth.js
- React Query

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database
4. Configure your `.env` file with necessary environment variables
5. Run Prisma migrations: `npx prisma migrate dev`
6. Start the development server: `npm run dev`

## Project Structure

The project follows a standard Next.js 13+ structure with the App Router:

```
/app
  /api           # API routes
  /components    # Reusable React components
  /issues        # Issue-related pages and components
  /dashboard     # Dashboard page and components
/prisma          # Prisma schema and migrations
/public          # Static assets
```

## API Endpoints

- `GET /api/issues`: Fetch issues (with filtering, sorting, and pagination)
- `POST /api/issues`: Create a new issue
- `PATCH /api/issues/:id`: Update an existing issue
- `DELETE /api/issues/:id`: Delete an issue
- `GET /api/users`: Fetch users for assignee selection

## Authentication

This project uses NextAuth.js for authentication with Google as the provider. To set up authentication:

1. Create a Google OAuth application and obtain the client ID and secret
2. Add these credentials to your `.env` file
3. Configure NextAuth.js in `pages/api/auth/[...nextauth].js`

## Database

The project uses Prisma with MySQL. The main models are:

- `Issue`: Represents a tracked issue
- `User`: Represents an authenticated user

Refer to the `prisma/schema.prisma` file for detailed model definitions.

## Deployment

This project is configured for easy deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Connect your Vercel account to your GitHub account
3. Import the project in Vercel
4. Configure environment variables in Vercel dashboard
5. Deploy!

## Performance Optimization

- Server-side rendering (SSR) is used for initial page loads
- React Query is used for efficient data fetching and caching
- Code splitting and lazy loading are implemented for optimal bundle sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
