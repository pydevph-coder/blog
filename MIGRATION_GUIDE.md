# Migration Guide: Mobile App Tables

This guide explains the new database tables added for mobile app functionality.

## New Tables

### 1. `users` Table
Stores mobile app user information based on device identifiers.

**Fields:**
- `id` (String, Primary Key) - Unique identifier (CUID)
- `device_id` (String, Unique) - Unique device identifier
- `installed_date` (DateTime) - When the app was first installed (defaults to now)
- `last_login` (DateTime, Nullable) - Last login timestamp
- `device_model` (String, Nullable) - Device model name
- `android_version` (String, Nullable) - Android OS version
- `createdAt` (DateTime) - Record creation timestamp
- `updatedAt` (DateTime) - Record last update timestamp

**Indexes:**
- Unique index on `device_id`

### 2. `reports` Table
Stores user reports/bug reports submitted from the mobile app.

**Fields:**
- `id` (String, Primary Key) - Unique identifier (CUID)
- `user_id` (String, Foreign Key) - References `users.id`
- `message` (Text) - Report message content
- `date` (DateTime) - Report submission date (defaults to now)
- `solved` (Boolean) - Whether the report has been resolved (defaults to false)
- `date_solved` (DateTime, Nullable) - When the report was solved
- `createdAt` (DateTime) - Record creation timestamp
- `updatedAt` (DateTime) - Record last update timestamp

**Indexes:**
- Index on `user_id` (for efficient user report queries)
- Index on `solved` (for filtering solved/unsolved reports)
- Index on `date` (for date-based queries)

**Relations:**
- Foreign key to `users` table with CASCADE delete (if user is deleted, their reports are deleted)

### 3. `version_control` Table
Manages app versions, build information, and update notifications.

**Fields:**
- `id` (String, Primary Key) - Unique identifier (CUID)
- `app` (String) - App identifier/name
- `version` (String) - Version number/string
- `build_date` (DateTime) - When the build was created
- `update_message` (Text, Nullable) - Short update message
- `notification` (Text, Nullable) - Long text message to display to users
- `createdAt` (DateTime) - Record creation timestamp
- `updatedAt` (DateTime) - Record last update timestamp

**Indexes:**
- Unique composite index on `(app, version)` - Ensures one version per app
- Index on `app` (for filtering by app)
- Index on `build_date` (for date-based queries)

## Migration File

The migration file is located at:
```
prisma/migrations/20260107064414_add_mobile_app_tables/migration.sql
```

## Applying the Migration

### Option 1: Using Prisma Migrate (Recommended)

When your database is accessible, run:

```bash
npx prisma migrate dev
```

This will:
1. Apply the migration to your database
2. Regenerate the Prisma client with the new models

### Option 2: Manual SQL Execution

If you need to apply the migration manually:

1. Connect to your PostgreSQL database
2. Execute the SQL file:
```bash
psql -d your_database -f prisma/migrations/20260107064414_add_mobile_app_tables/migration.sql
```

Or copy and paste the SQL from the migration file into your database client.

### Option 3: Using Prisma Migrate Deploy (Production)

For production environments:

```bash
npx prisma migrate deploy
```

## After Migration

After applying the migration, regenerate the Prisma client:

```bash
npx prisma generate
```

## Usage Examples

### Creating a User
```typescript
const user = await prisma.user.create({
  data: {
    deviceId: "unique-device-id-123",
    deviceModel: "Samsung Galaxy S21",
    androidVersion: "13",
    lastLogin: new Date(),
  },
});
```

### Creating a Report
```typescript
const report = await prisma.report.create({
  data: {
    userId: user.id,
    message: "App crashes when opening settings",
    solved: false,
  },
});
```

### Creating Version Control Entry
```typescript
const version = await prisma.versionControl.create({
  data: {
    app: "com.example.app",
    version: "1.2.0",
    buildDate: new Date(),
    updateMessage: "Bug fixes and performance improvements",
    notification: "We've fixed several bugs and improved app performance. Please update to the latest version for the best experience.",
  },
});
```

### Querying Unsolved Reports
```typescript
const unsolvedReports = await prisma.report.findMany({
  where: {
    solved: false,
  },
  include: {
    user: true,
  },
  orderBy: {
    date: "desc",
  },
});
```

### Getting Latest Version for an App
```typescript
const latestVersion = await prisma.versionControl.findFirst({
  where: {
    app: "com.example.app",
  },
  orderBy: {
    buildDate: "desc",
  },
});
```

## Schema Relationships

```
users (1) ──< (many) reports
```

- One user can have many reports
- Reports are automatically deleted when a user is deleted (CASCADE)

## Notes

- All tables use snake_case for database column names (mapped from camelCase in Prisma)
- All tables include `createdAt` and `updatedAt` timestamps
- The `users` table uses `device_id` as a unique identifier (not email/username)
- The `reports` table tracks resolution status with `solved` boolean and `date_solved` timestamp
- The `version_control` table supports multiple apps with unique version constraints per app

