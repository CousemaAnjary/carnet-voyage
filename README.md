# Carnet Voyage

![App Icon](./client/public/64x64.png)

## Project Overview

Carnet Voyage is a travel diary application that allows users to document their travel experiences. Users can add new travel entries, update existing ones, and view their travel history. The application leverages modern web technologies to provide a seamless and interactive user experience.

## Features

- **Add New Travel Entries**: Users can create new entries for their travels, including details such as destination, dates, photos, and notes.
- **Update Travel Entries**: Users can edit their existing travel entries to keep their travel diary up to date.
- **View Travel History**: Users can browse through their past travel entries and reminisce about their journeys.
- **Offline Support**: The application supports offline usage, allowing users to access their travel entries without an internet connection.


**Important: The offline support work only in production.**

## Technologies Used

- **Frontend**: React, Vite, TypeScript
- **Backend**: Laravel 10
- **Database**: MySQL for backend storage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- PHP (version 8.0 or higher)
- Composer (version 2.0 or higher)
- MySQL (or any other supported database)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/CousemaAnjary/carnet-voyage
```

2. Navigate to the project directory:
```bash
    cd carnet-voyage
```

### Frontend Intialization

1. Navigate to the frontend directory:
```bash
    cd client
```

2. Install the dependencies:
```bash
    npm install
```

3. Start the developpement server:
```bash
    npm run dev
```
4. Open your browser and navigate to http://localhost:3000 to view the application.

### Backend Initialization

1. Navigate to the backend directory:
```bash
    cd server
```

2. Install the dependencies:
```bash
    composer install
```

3. Copy the .env.example file to .env:
```bash
    cp .env.example .env
```

4. Configure your database settings in the .env file:
```markdown
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_user
    DB_PASSWORD=your_database_password
```

5. Run the database migrations:
```bash
    php artisan migrate
```

6. Start the backend server:
```bash
    php artisan serve
```

8. The backend server will run on http://localhost:8000.

### Building for Production and Run it

1. To buid the application for production run:
```bash
    npm run build
```
The production-ready files will be generated in the dist directory

2. To run production build run:
```bash 
    npm run preview
```
