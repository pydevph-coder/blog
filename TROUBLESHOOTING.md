# Troubleshooting Guide

## 500 Error on POST /api/users

If you're getting a 500 error when posting to `/api/users`, follow these steps:

### Step 1: Check Server Console Logs

The API route now includes detailed logging. Look for:
- `[API] POST /api/users - Starting request`
- `[API] Request body: {...}`
- `[API] Checking if user exists...`
- Any error messages with `[API]` prefix

### Step 2: Common Issues and Solutions

#### Issue: "Table 'users' does not exist" or "Unknown table"
**Solution**: The database migration hasn't been applied.

```bash
# Apply the migration
npx prisma migrate dev

# Or if you just want to push the schema (for development)
npx prisma db push
```

#### Issue: "Can't reach database server" (P1001)
**Solution**: Database connection problem.

1. Check your `.env.local` or `.env` file has `DATABASE_URL`
2. Verify the database is running
3. Test connection: `npx prisma db pull` (should connect)

#### Issue: Prisma Client not generated
**Solution**: Regenerate Prisma client.

```bash
npx prisma generate
```

#### Issue: Turbopack symlink error
**Solution**: Already fixed - removed `--turbopack` from dev script. Restart your dev server.

### Step 3: Enable Detailed Logging

The Prisma client is now configured to log all queries in development mode. You should see:
- All database queries
- Query parameters
- Query results
- Any errors

### Step 4: Test Database Connection

```bash
# Test if Prisma can connect
npx prisma db pull

# Or open Prisma Studio to view database
npx prisma studio
```

### Step 5: Check Error Response

The API now returns detailed error information in development mode. Check the response body:

```json
{
  "error": "Error message here",
  "details": "Full error details",
  "code": "P1001" // Prisma error code if applicable
}
```

### Step 6: Verify Migration Status

```bash
# Check migration status
npx prisma migrate status

# See what migrations exist
ls prisma/migrations/
```

### Common Prisma Error Codes

- **P1001**: Can't reach database server
- **P2002**: Unique constraint violation (duplicate entry)
- **P2025**: Record not found
- **P3000**: Migration failed
- **42P01**: PostgreSQL table doesn't exist

### Quick Fix Checklist

- [ ] Restart dev server (without Turbopack)
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev` or `npx prisma db push`
- [ ] Check `DATABASE_URL` in `.env.local`
- [ ] Verify database is accessible
- [ ] Check server console for detailed error logs

### Still Having Issues?

1. Check the server console output - it now has detailed `[API]` prefixed logs
2. Check Prisma query logs - all queries are logged in development
3. Check the error response body for specific error codes
4. Verify the migration file exists: `prisma/migrations/20260107064414_add_mobile_app_tables/migration.sql`







