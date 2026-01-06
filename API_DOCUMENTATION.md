# API Documentation

This document provides comprehensive documentation for all APIs available in the blog application.

## Table of Contents

- [Overview](#overview)
- [Authentication APIs](#authentication-apis)
- [Content APIs](#content-apis)
- [Tracking APIs](#tracking-apis)
- [Contact APIs](#contact-apis)
- [Admin APIs](#admin-apis)
- [Data Models](#data-models)
- [Error Handling](#error-handling)

---

## Overview

This is a Next.js blog application built with:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Cookie-based admin authentication

All API routes are located in the `src/app/api/` directory and follow Next.js App Router conventions.

**Base URL**: `https://your-domain.com` (or `http://localhost:3000` for local development)

---

## Authentication APIs

### Check Authentication Status

Check if the current user is authenticated as an admin.

**Endpoint**: `GET /api/auth/check`

**Description**: Verifies if the user has a valid admin session by checking for the admin cookie.

**Request**:
- **Method**: `GET`
- **Headers**: 
  - `Cookie: admin=1` (if authenticated)

**Response**:
- **Status Code**: `200 OK`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "isAuthenticated": true
}
```

**Example Request**:
```bash
curl -X GET http://localhost:3000/api/auth/check \
  -H "Cookie: admin=1"
```

**Example Response**:
```json
{
  "isAuthenticated": true
}
```

**Notes**:
- Returns `isAuthenticated: false` if no valid admin cookie is present
- Cookie must have value `"1"` to be considered authenticated

---

## Content APIs

### RSS Feed

Get the RSS feed of published blog posts.

**Endpoint**: `GET /rss.xml`

**Description**: Returns an RSS 2.0 XML feed containing the latest 50 published posts.

**Request**:
- **Method**: `GET`
- **Headers**: None required

**Response**:
- **Status Code**: `200 OK`
- **Content-Type**: `application/rss+xml; charset=utf-8`
- **Body**: RSS 2.0 XML format

**Example Request**:
```bash
curl -X GET http://localhost:3000/rss.xml
```

**Example Response**:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[My Blog]]></title>
    <link>http://localhost:3000</link>
    <description><![CDATA[Blog Description]]></description>
    <item>
      <title><![CDATA[Post Title]]></title>
      <link>http://localhost:3000/post/post-slug</link>
      <description><![CDATA[Post excerpt]]></description>
      <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
      <guid>http://localhost:3000/post/post-slug</guid>
    </item>
    <!-- ... more items ... -->
  </channel>
</rss>
```

**Query Parameters**: None

**Notes**:
- Only returns posts with status `PUBLISHED`
- Posts are ordered by `publishedAt` in descending order (newest first)
- Limited to 50 most recent posts
- Site URL and name are configured via environment variables:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SITE_NAME`
  - `NEXT_PUBLIC_SITE_DESCRIPTION`

---

### Vlogs Redirect

Redirect to the vlogs category page.

**Endpoint**: `GET /vlogs`

**Description**: Simple redirect endpoint that redirects to `/category/vlogs`.

**Request**:
- **Method**: `GET`

**Response**:
- **Status Code**: `302 Found` (Redirect)
- **Location**: `/category/vlogs`

**Example Request**:
```bash
curl -X GET http://localhost:3000/vlogs -L
```

**Notes**:
- This is a convenience endpoint for accessing vlogs content

---

## Tracking APIs

### Track Page View or User Action

Track page views and user interactions for analytics.

**Endpoint**: `POST /api/track`

**Description**: Records page views or user actions in the database for analytics purposes. Supports two types of tracking: page views and user actions.

**Request**:
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (JSON):

For Page View:
```json
{
  "type": "pageview",
  "path": "/post/my-article"
}
```

For User Action:
```json
{
  "type": "action",
  "action": "click",
  "target": "subscribe-button",
  "metadata": {
    "section": "footer",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Request Body Fields**:
- `type` (required): Either `"pageview"` or `"action"`
- `path` (required for pageview): The page path being viewed
- `action` (required for action): The action type (e.g., "click", "view", "search", "download")
- `target` (optional): The target element or identifier
- `metadata` (optional): Additional JSON data about the action

**Response**:
- **Status Code**: `200 OK` (success) or `500 Internal Server Error` (failure)
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "success": true
}
```

**Example Request (Page View)**:
```bash
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "type": "pageview",
    "path": "/post/my-article"
  }'
```

**Example Request (User Action)**:
```bash
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "type": "action",
    "action": "click",
    "target": "newsletter-signup",
    "metadata": {
      "location": "sidebar"
    }
  }'
```

**Example Response**:
```json
{
  "success": true
}
```

**Error Response**:
```json
{
  "success": false
}
```

**Notes**:
- Page views are stored in the `PageView` table with metadata like IP address, user agent, referrer, device, browser, and OS
- User actions are stored in the `UserAction` table
- The API automatically extracts request metadata (IP, user agent, etc.) from headers
- Errors are logged to the console but don't expose sensitive information

**Data Stored**:
- **PageView**: path, referrer, userAgent, ipAddress, country, city, device, browser, os, createdAt
- **UserAction**: action, target, metadata (JSON), path, userAgent, ipAddress, createdAt

---

## Contact APIs

### Submit Contact Form

Submit a contact form message via email.

**Endpoint**: `POST /api/contact`

**Description**: Sends an email notification when a user submits the contact form. Uses Gmail SMTP to send emails.

**Request**:
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about your blog",
  "message": "I have a question about..."
}
```

**Request Body Fields**:
- `name` (required): Sender's name
- `email` (required): Sender's email address
- `subject` (optional): Email subject line
- `message` (required): The message content

**Response**:
- **Status Code**: `200 OK` (success), `400 Bad Request` (missing fields), or `500 Internal Server Error` (email not configured or send failed)
- **Content-Type**: `application/json`
- **Body** (success):
```json
{
  "ok": true
}
```

**Body** (error):
```json
{
  "error": "Missing required fields"
}
```
or
```json
{
  "error": "Email not configured"
}
```
or
```json
{
  "error": "Failed to send"
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "This is a test message"
  }'
```

**Example Response**:
```json
{
  "ok": true
}
```

**Environment Variables Required**:
- `GMAIL_USER`: Gmail account email address
- `GMAIL_APP_PASSWORD`: Gmail app-specific password
- `CONTACT_TO_EMAIL`: Recipient email address (defaults to `GMAIL_USER` if not set)

**Notes**:
- Uses Nodemailer with Gmail SMTP service
- Email is sent from `GMAIL_USER` to `CONTACT_TO_EMAIL`
- Reply-To header is set to the sender's email
- Subject line is prefixed with `[Contact]` if provided, otherwise defaults to `[Contact] New message`
- Email body includes name, email, and message in plain text format

---

## Admin APIs

### Admin Logout

Logout the current admin user and clear authentication cookies.

**Endpoint**: `GET /admin/logout`

**Description**: Clears the admin authentication cookie and redirects to the home page.

**Request**:
- **Method**: `GET`
- **Headers**: 
  - `Cookie: admin=1` (if authenticated)

**Response**:
- **Status Code**: `302 Found` (Redirect)
- **Location**: `/` (home page)
- **Headers**: 
  - `Set-Cookie: admin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`

**Example Request**:
```bash
curl -X GET http://localhost:3000/admin/logout -L
```

**Notes**:
- Clears the admin cookie by setting it to empty and expiring it
- Cookie is set with `httpOnly`, `sameSite=lax`, and `path=/`
- Always redirects to the home page after logout
- Multiple cookie clearing mechanisms are used to ensure compatibility

---

## Data Models

### Database Schema Overview

The application uses PostgreSQL with Prisma ORM. Key models include:

#### Post
- `id`: String (CUID)
- `title`: String
- `slug`: String (unique)
- `excerpt`: String (optional)
- `contentMarkdown`: Text
- `contentHtml`: Text (optional)
- `status`: PostStatus (DRAFT, PUBLISHED, ARCHIVED)
- `publishedAt`: DateTime (optional)
- `canonicalUrl`: String (optional)
- `metaTitle`: String (optional)
- `metaDescription`: String (optional)
- `ogImageUrl`: String (optional)
- `readingTimeMin`: Int (optional)
- `views`: Int (default: 0)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: `category`, `tags` (via PostTag)

#### Category
- `id`: String (CUID)
- `name`: String
- `slug`: String (unique)
- `description`: String (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: `posts`

#### Tag
- `id`: String (CUID)
- `name`: String
- `slug`: String (unique)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: `posts` (via PostTag)

#### PageView
- `id`: String (CUID)
- `path`: String
- `referrer`: String (optional)
- `userAgent`: String (optional)
- `ipAddress`: String (optional)
- `country`: String (optional)
- `city`: String (optional)
- `device`: String (optional)
- `browser`: String (optional)
- `os`: String (optional)
- `createdAt`: DateTime
- Indexes: `path`, `createdAt`

#### UserAction
- `id`: String (CUID)
- `action`: String
- `target`: String (optional)
- `metadata`: Text (JSON string, optional)
- `path`: String (optional)
- `userAgent`: String (optional)
- `ipAddress`: String (optional)
- `createdAt`: DateTime
- Indexes: `action`, `createdAt`, `target`

#### ContactSubmission
- `id`: String (CUID)
- `name`: String
- `email`: String
- `subject`: String (optional)
- `message`: Text
- `createdAt`: DateTime
- `read`: Boolean (default: false)

#### AuditLog
- `id`: String (CUID)
- `action`: String
- `entity`: String
- `entityId`: String (optional)
- `details`: Text (optional)
- `ipAddress`: String (optional)
- `userAgent`: String (optional)
- `createdAt`: DateTime
- Indexes: `action`, `entity`, `createdAt`

---

## Error Handling

### Standard Error Responses

All APIs follow consistent error handling patterns:

1. **400 Bad Request**: Missing or invalid required fields
   ```json
   {
     "error": "Missing required fields"
   }
   ```

2. **500 Internal Server Error**: Server-side errors (database, email service, etc.)
   ```json
   {
     "error": "Failed to send"
   }
   ```
   or
   ```json
   {
     "success": false
   }
   ```

### Error Response Format

Error responses typically include:
- **Status Code**: Appropriate HTTP status code
- **Content-Type**: `application/json`
- **Body**: JSON object with an `error` or `success` field

### Common Error Scenarios

1. **Missing Environment Variables**: 
   - Contact API requires Gmail credentials
   - Returns 500 with "Email not configured"

2. **Database Errors**: 
   - Tracking and RSS APIs may fail if database is unavailable
   - Errors are logged but return generic error responses

3. **Invalid Request Data**: 
   - Missing required fields return 400
   - Invalid JSON returns 400

---

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for:
- Contact form submissions
- Tracking endpoints
- Authentication endpoints

---

## Security Considerations

1. **Authentication**: 
   - Admin authentication uses secure HTTP-only cookies
   - Cookie value is simple (`"1"`), consider using JWT tokens for production

2. **Input Validation**: 
   - Contact form validates required fields
   - Consider adding more robust validation (e.g., email format, message length)

3. **CORS**: 
   - No explicit CORS configuration (uses Next.js defaults)
   - Consider configuring CORS for cross-origin requests if needed

4. **IP Address Tracking**: 
   - IP addresses are extracted from headers (`x-forwarded-for`, `x-real-ip`)
   - Be aware of privacy regulations (GDPR, etc.) when storing IP addresses

5. **Email Security**: 
   - Uses Gmail app-specific passwords (not account passwords)
   - Consider implementing email validation and spam protection

---

## Testing

### Example cURL Commands

**Check Authentication**:
```bash
curl -X GET http://localhost:3000/api/auth/check \
  -H "Cookie: admin=1"
```

**Track Page View**:
```bash
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{"type":"pageview","path":"/post/test"}'
```

**Submit Contact Form**:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

**Get RSS Feed**:
```bash
curl -X GET http://localhost:3000/rss.xml
```

**Admin Logout**:
```bash
curl -X GET http://localhost:3000/admin/logout -L
```

---

## Mobile App APIs

### User Registration/Login

Register a new user or update existing user information (login).

**Endpoint**: `POST /api/users`

**Description**: Creates a new user if device ID doesn't exist, or updates last login and device info if user exists.

**Request**:
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "deviceId": "unique-device-id-123",
  "deviceModel": "Samsung Galaxy S21",
  "androidVersion": "13"
}
```

**Request Body Fields**:
- `deviceId` (required): Unique device identifier
- `deviceModel` (optional): Device model name
- `androidVersion` (optional): Android OS version

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "deviceId": "unique-device-id-123",
    "installedDate": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "deviceModel": "Samsung Galaxy S21",
    "androidVersion": "13"
  }
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "device-123",
    "deviceModel": "Samsung Galaxy S21",
    "androidVersion": "13"
  }'
```

---

### Get User Information

Get user information by device ID.

**Endpoint**: `GET /api/users?deviceId={deviceId}`

**Description**: Retrieves user information including recent reports.

**Request**:
- **Method**: `GET`
- **Query Parameters**:
  - `deviceId` (required): Device identifier

**Response**:
- **Status Code**: `200 OK` or `404 Not Found`
- **Body**:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "deviceId": "unique-device-id-123",
    "installedDate": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "deviceModel": "Samsung Galaxy S21",
    "androidVersion": "13",
    "reports": [...]
  }
}
```

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/users?deviceId=device-123"
```

---

### Create Report

Submit a bug report or feedback.

**Endpoint**: `POST /api/reports`

**Description**: Creates a new report associated with a user.

**Request**:
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "userId": "user-id-here",
  "message": "App crashes when opening settings"
}
```

**Request Body Fields**:
- `userId` (required): User ID
- `message` (required): Report message content

**Response**:
- **Status Code**: `200 OK` or `404 Not Found` (if user doesn't exist)
- **Body**:
```json
{
  "success": true,
  "report": {
    "id": "report-id",
    "userId": "user-id-here",
    "message": "App crashes when opening settings",
    "date": "2024-01-01T12:00:00.000Z",
    "solved": false
  }
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-123",
    "message": "App crashes when opening settings"
  }'
```

---

### Get Reports

Get reports with optional filters.

**Endpoint**: `GET /api/reports`

**Description**: Retrieves reports with optional filtering by user, solved status, and pagination.

**Request**:
- **Method**: `GET`
- **Query Parameters**:
  - `userId` (optional): Filter by user ID
  - `solved` (optional): Filter by solved status (`true` or `false`)
  - `limit` (optional): Maximum number of reports (default: 50)
  - `offset` (optional): Offset for pagination (default: 0)

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "success": true,
  "reports": [
    {
      "id": "report-id",
      "userId": "user-id",
      "message": "Report message",
      "date": "2024-01-01T12:00:00.000Z",
      "solved": false,
      "dateSolved": null,
      "user": {
        "id": "user-id",
        "deviceId": "device-123",
        "deviceModel": "Samsung Galaxy S21",
        "androidVersion": "13"
      }
    }
  ],
  "total": 10,
  "limit": 50,
  "offset": 0
}
```

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/reports?userId=user-123&solved=false&limit=10"
```

---

### Get Single Report

Get a single report by ID.

**Endpoint**: `GET /api/reports/{id}`

**Description**: Retrieves a single report with user information.

**Request**:
- **Method**: `GET`
- **Path Parameters**:
  - `id`: Report ID

**Response**:
- **Status Code**: `200 OK` or `404 Not Found`
- **Body**: Same format as report in Get Reports response

**Example Request**:
```bash
curl -X GET http://localhost:3000/api/reports/report-id-123
```

---

### Update Report

Update report status (mark as solved).

**Endpoint**: `PATCH /api/reports/{id}`

**Description**: Updates report solved status.

**Request**:
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Path Parameters**:
  - `id`: Report ID
- **Body**:
```json
{
  "solved": true
}
```

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "success": true,
  "report": {
    "id": "report-id",
    "solved": true,
    "dateSolved": "2024-01-01T12:00:00.000Z",
    ...
  }
}
```

**Example Request**:
```bash
curl -X PATCH http://localhost:3000/api/reports/report-id-123 \
  -H "Content-Type: application/json" \
  -d '{"solved": true}'
```

---

### Get Latest Version

Get the latest version information for an app.

**Endpoint**: `GET /api/version?app={app}`

**Description**: Retrieves the most recent version information for a specific app.

**Request**:
- **Method**: `GET`
- **Query Parameters**:
  - `app` (required): App identifier (e.g., "com.example.app")

**Response**:
- **Status Code**: `200 OK` or `404 Not Found`
- **Body**:
```json
{
  "success": true,
  "version": {
    "id": "version-id",
    "app": "com.example.app",
    "version": "1.2.0",
    "buildDate": "2024-01-01T00:00:00.000Z",
    "updateMessage": "Bug fixes and performance improvements",
    "notification": "We've fixed several bugs and improved app performance. Please update to the latest version for the best experience."
  }
}
```

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/version?app=com.example.app"
```

---

### Get Version List

Get list of versions with optional filtering.

**Endpoint**: `GET /api/version/list`

**Description**: Retrieves a list of versions, optionally filtered by app.

**Request**:
- **Method**: `GET`
- **Query Parameters**:
  - `app` (optional): Filter by app identifier
  - `limit` (optional): Maximum number of versions (default: 50)

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "success": true,
  "versions": [
    {
      "id": "version-id",
      "app": "com.example.app",
      "version": "1.2.0",
      "buildDate": "2024-01-01T00:00:00.000Z",
      "updateMessage": "Bug fixes",
      "notification": "Update message"
    }
  ],
  "count": 1
}
```

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/version/list?app=com.example.app&limit=10"
```

---

### Create Version (Admin Only)

Create a new version entry.

**Endpoint**: `POST /api/version`

**Description**: Creates a new version entry. Requires admin authentication.

**Request**:
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `Cookie: admin=1` (admin authentication required)
- **Body**:
```json
{
  "app": "com.example.app",
  "version": "1.2.0",
  "buildDate": "2024-01-01T00:00:00.000Z",
  "updateMessage": "Bug fixes and performance improvements",
  "notification": "Long notification message to display to users..."
}
```

**Request Body Fields**:
- `app` (required): App identifier
- `version` (required): Version string
- `buildDate` (required): Build date (ISO 8601 format)
- `updateMessage` (optional): Short update message
- `notification` (optional): Long notification message for users

**Response**:
- **Status Code**: `200 OK`, `401 Unauthorized`, or `409 Conflict` (if version already exists)
- **Body**:
```json
{
  "success": true,
  "version": {
    "id": "version-id",
    "app": "com.example.app",
    "version": "1.2.0",
    ...
  }
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/version \
  -H "Content-Type: application/json" \
  -H "Cookie: admin=1" \
  -d '{
    "app": "com.example.app",
    "version": "1.2.0",
    "buildDate": "2024-01-01T00:00:00.000Z",
    "updateMessage": "Bug fixes",
    "notification": "Please update to the latest version"
  }'
```

---

## Version History

- **v1.1.0** (Current): Added Mobile App APIs
  - User registration and login
  - Report submission and management
  - Version control endpoints
- **v1.0.0**: Initial API documentation
  - Authentication check endpoint
  - Contact form submission
  - Page view and user action tracking
  - RSS feed generation
  - Admin logout

---

## Support

For issues or questions about the API, please refer to the main project README or contact the development team.

