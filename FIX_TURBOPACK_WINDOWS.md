# Fix Turbopack Symlink Error on Windows

## The Problem
Turbopack needs to create symlinks for Prisma client, but Windows requires admin privileges or Developer Mode to create symlinks.

## Solution: Enable Windows Developer Mode

This is the **recommended solution** - it allows symlink creation without admin privileges.

### Steps:

1. **Open Windows Settings**
   - Press `Win + I` or click Start → Settings

2. **Navigate to Developer Settings**
   - Go to **Privacy & Security** → **For developers**
   - Or search for "Developer Mode" in Settings

3. **Enable Developer Mode**
   - Toggle **"Developer Mode"** to **ON**
   - Windows may ask for confirmation - click **Yes**

4. **Restart your dev server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

That's it! After enabling Developer Mode, Turbopack will be able to create symlinks without issues.

## Alternative Solutions

### Option 2: Run Terminal as Administrator
1. Right-click on your terminal/command prompt
2. Select "Run as Administrator"
3. Navigate to your project and run `npm run dev`

**Note:** You'll need to do this every time you start the dev server.

### Option 3: Downgrade Next.js (Not Recommended)
If you really want to avoid Turbopack, you could downgrade to Next.js 15, but this is not recommended as you'll miss out on new features.

## Verify It's Working

After enabling Developer Mode and restarting:
- The dev server should start without symlink errors
- You should see: `▲ Next.js 16.1.0 (Turbopack)`
- No more "required privilege" errors

## Why This Happens

Windows has security restrictions on creating symlinks (symbolic links) to prevent potential security issues. Developer Mode relaxes this restriction for development purposes, allowing tools like Turbopack to work properly.

## Still Having Issues?

If you still get errors after enabling Developer Mode:
1. Make sure you restarted the dev server completely
2. Try clearing the `.next` cache: `Remove-Item -Recurse -Force .next`
3. Restart your computer (sometimes Windows needs a restart for Developer Mode to take effect)







