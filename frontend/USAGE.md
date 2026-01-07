# Frontend Usage Guide

## Automatic User Registration

The app now automatically registers/login users based on their device ID (Android ID or UUID). **Users don't need to manually login** - the app handles this automatically.

## How It Works

1. **On App Startup**: The app automatically registers/login the user using their device ID
2. **On Report Screen**: When users navigate to the report screen, the app ensures they're registered
3. **Report Submission**: Users can immediately submit reports without any login step

## Device ID

- **Android**: Uses `Settings.Secure.ANDROID_ID` (unique per device)
- **Testing/Web**: Generates a UUID and stores it locally
- The device ID is persistent and unique to each device

## User Flow

### Before (Manual Login Required)
1. User opens app
2. User navigates to "User Registration" screen
3. User clicks "Register / Login"
4. User navigates to "Submit Report" screen
5. User can now submit reports

### Now (Automatic)
1. User opens app
2. User navigates to "Submit Report" screen
3. App automatically registers/login using device ID
4. User can immediately submit reports

## API Flow

When a user submits a report:

1. App checks if user is registered (has `user_id`)
2. If not registered:
   - Automatically calls `POST /api/users` with device ID
   - Gets back user ID
   - Stores user ID for future use
3. Submits report using the user ID

## Benefits

- **No login required**: Seamless user experience
- **Automatic**: Users don't need to understand registration
- **Persistent**: Device ID is stored locally, so registration persists
- **Unique**: Each device gets its own user account automatically

## Code Example

```python
# The report screen automatically handles user registration
report_screen = ReportScreen(api_base_url="http://localhost:3000/api")

# When user submits a report, it automatically:
# 1. Registers/login if needed
# 2. Submits the report
# 3. Shows success/error message
```

## Error Handling

If registration fails:
- User sees an error message
- Submit button remains disabled
- User can retry by navigating away and back

If report submission fails:
- User sees an error message
- Report is not lost (stays in text field)
- User can retry submission


