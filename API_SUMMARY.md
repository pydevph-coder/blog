# API Documentation Summary

This document provides a quick reference guide to all APIs in the blog application.

## Quick Reference

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/auth/check` | GET | Check authentication status | No |
| `/api/track` | POST | Track page views and user actions | No |
| `/api/contact` | POST | Submit contact form | No |
| `/rss.xml` | GET | Get RSS feed of published posts | No |
| `/vlogs` | GET | Redirect to vlogs category | No |
| `/admin/logout` | GET | Logout admin user | Yes |

## API Categories

### 🔐 Authentication APIs
- **GET /api/auth/check** - Verify admin authentication status

### 📊 Analytics & Tracking APIs
- **POST /api/track** - Track page views and user interactions

### 📧 Communication APIs
- **POST /api/contact** - Submit contact form (sends email)

### 📰 Content APIs
- **GET /rss.xml** - RSS feed of published posts
- **GET /vlogs** - Redirect to vlogs category

### 👤 Admin APIs
- **GET /admin/logout** - Logout and clear admin session

## Diagrams

Visual documentation is available in the `public/diagrams/api/` directory:

1. **api-endpoints.mmd** - Overview of all API endpoints and their connections
2. **api-flow.mmd** - Sequence diagrams showing request/response flows
3. **api-architecture.mmd** - System architecture and component relationships
4. **api-request-response.mmd** - Decision flow for each API endpoint

## Full Documentation

For complete API documentation including:
- Detailed request/response formats
- Example requests
- Error handling
- Data models
- Security considerations

See **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## Viewing Diagrams

Diagrams are in Mermaid format (`.mmd`). You can view them:
- Using the diagram viewer at `/diagrams/viewer.html` (if available)
- Online at [Mermaid Live Editor](https://mermaid.live/)
- In VS Code with the Mermaid extension
- In GitHub (renders automatically)

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: Set via `NEXT_PUBLIC_SITE_URL` environment variable






