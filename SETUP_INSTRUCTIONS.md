# Setup Instructions

## Database Migration

Before using the new mobile app APIs, you need to apply the database migration to create the new tables.

### Step 1: Apply Migration

When your database is accessible, run:

```bash
# Apply the migration
npx prisma migrate dev

# Or if you just want to apply existing migrations
npx prisma migrate deploy
```

This will create the following tables:
- `users` - Mobile app users
- `reports` - User reports/bug reports  
- `version_control` - App version management

### Step 2: Regenerate Prisma Client

After applying migrations, regenerate the Prisma client:

```bash
npx prisma generate
```

### Step 3: Verify Tables

You can verify the tables were created by checking your database or running:

```bash
npx prisma studio
```

This opens a GUI to view your database tables.

## Troubleshooting

### Error: "Table 'users' doesn't exist"

This means the migration hasn't been applied yet. Run:
```bash
npx prisma migrate dev
```

### Error: "Cannot find module '@prisma/client'"

Regenerate the Prisma client:
```bash
npx prisma generate
```

### Error: "P1001: Can't reach database server"

Check your `DATABASE_URL` in `.env.local` or `.env` file. Make sure:
- The database server is running
- The connection string is correct
- Network/firewall allows the connection

### Error: "P2002: Unique constraint failed"

This is normal if you're trying to create a duplicate entry (e.g., user with same device_id). The API handles this gracefully.

## Testing the APIs

Once migrations are applied, you can test the APIs:

```bash
# Register a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "test-device-123",
    "deviceModel": "Test Device",
    "androidVersion": "13"
  }'

# Create a report (replace USER_ID with actual user ID from registration)
curl -X POST http://localhost:3000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "message": "Test report"
  }'
```

## Development vs Production

- **Development**: Error messages include detailed information
- **Production**: Error messages are generic for security

To see detailed errors during development, check the server console logs.







