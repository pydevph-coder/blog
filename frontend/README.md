# Mobile App Frontend (Kivy)

Python/Kivy frontend for the blog mobile app. This frontend allows users to register, login, and submit reports to the server.

## Features

- **User Registration/Login**: Register device and login using device ID
- **Report Submission**: Submit bug reports and feedback
- **Report History**: View previous reports and their status
- **API Integration**: Full integration with the backend API

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. For Android development, you may also need:
```bash
pip install buildozer
pip install pyjnius
```

## Configuration

Set the API base URL before running:

```python
# In main.py or via environment variable
API_BASE_URL = "http://your-server.com/api"
```

For local testing:
- **Local machine**: `http://localhost:3000/api`
- **Android emulator**: `http://10.0.2.2:3000/api`
- **Physical device on same network**: `http://YOUR_IP:3000/api`

## Running the App

### Desktop/Development
```bash
python main.py
```

### Android Build

1. Create `buildozer.spec` file (see example below)
2. Build APK:
```bash
buildozer android debug
```

## Project Structure

```
frontend/
├── main.py                 # Main app entry point
├── api_client.py           # API client for backend communication
├── screens/
│   ├── user_screen.py      # User registration/login screen
│   └── report_screen.py    # Report submission screen
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## API Client Usage

```python
from api_client import APIClient

# Initialize client
client = APIClient("http://localhost:3000/api")

# Register user
response = client.register_user(
    device_id="unique-device-id",
    device_model="Samsung Galaxy S21",
    android_version="13"
)

# Create report
response = client.create_report(
    user_id="user-id-here",
    message="App crashes when opening settings"
)

# Get latest version
response = client.get_latest_version("com.example.app")
```

## Screens

### User Registration Screen
- Displays device ID (auto-generated)
- Allows entering device model and Android version
- Registers/login user with server
- Shows user information after registration

### Report Screen
- Submit bug reports and feedback
- View recent reports with status (solved/pending)
- Requires user registration first

## Building for Android

Create a `buildozer.spec` file:

```ini
[app]
title = Mobile App
package.name = mobileapp
package.domain = com.example
source.dir = .
source.include_exts = py,png,jpg,kv,atlas
version = 0.1
requirements = python3,kivy,requests

[android]
permissions = INTERNET
```

Then run:
```bash
buildozer android debug
```

## Testing

1. Start your backend server (Next.js app)
2. Update `API_BASE_URL` in `main.py` or set environment variable
3. Run the app: `python main.py`
4. Test user registration
5. Test report submission

## Notes

- Device ID is generated and stored locally
- On Android, device information is automatically detected
- For web/desktop testing, device info may need manual entry
- All API calls include error handling
- UI updates happen asynchronously to avoid blocking

## Troubleshooting

**Connection errors:**
- Check API_BASE_URL is correct
- Ensure backend server is running
- Check network connectivity
- For Android emulator, use `10.0.2.2` instead of `localhost`

**Import errors:**
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version (3.7+ required)

**Android build issues:**
- Install buildozer dependencies
- Check Android SDK is properly configured
- Review buildozer.spec settings


