# URL Shortener

A simple Node.js application built with Express.js to shorten URLs, manage them, and generate QR codes for the shortened URLs.

## Features
- Shorten a given URL.
- Redirect to the original URL using the shortened version.
- Generate and retrieve QR codes for shortened URLs.
- List all shortened URLs with their details.

## Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/georgegozal/nodejs_url_shortener_api.git
   cd nodejs_url_shortener_api

2. Install dependencies:
    ```bash
    npm install

3. Initialize Databse
    ```bash
    sequelize init
    sequelize db:migrate

4. Run the application:
    ```bash
    npm start
5. The server will be available at http://localhost:3000 (default).

## API Endpoints
1. Shorten a URL
    POST /
    Create a new shortened URL for a given original URL.

    Request Body:
    ```bash
    {
        "url": "https://example.com"
    }

Response:

    {
    "success": true,
    "message": "URL shortened successfully",
    "data": {
        "original": "https://example.com",
        "shortened": "http://localhost:3000/abcde",
        "qrCode": "http://localhost:3000/qr/abcde"
        }
    }



2. Redirect to Original URL
GET /:shortened
Redirects to the original URL using the shortened version.

Example:
Visiting http://localhost:3000/abcde redirects to https://example.com.

3. List All URLs
GET /urls/list
Retrieves all shortened URLs with their details.

Response:

    {
    "success": true,
    "data": [
            {
            "originalUrl": "https://example.com",
            "shortenedUrl": "http://localhost:3000/abcde",
            "createdAt": "2025-01-22T10:00:00Z",
            "qrCode": "http://localhost:3000/qr/abcde"
            }
        ]
    }

4. Get QR Code
GET /qr/:shortened
Retrieves the QR code for the given shortened URL.

Example:
Request: http://localhost:3000/qr/abcde
Response: Displays the QR code as an image.

License
This project is licensed under the `MIT` License. See the [LICENSE](LICENSE) file for details.
