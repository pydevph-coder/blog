# How to Restart Server Without Turbopack

## Steps to Fix the Turbopack Error

1. **Stop the current dev server**
   - Press `Ctrl+C` in the terminal where `npm run dev` is running
   - Make sure it's completely stopped

2. **Clear Next.js cache**
   ```bash
   # Delete .next folder
   rm -rf .next
   # Or on Windows PowerShell:
   Remove-Item -Recurse -Force .next
   ```

3. **Restart the dev server**
   ```bash
   npm run dev
   ```

4. **Verify it's not using Turbopack**
   - You should see: `▲ Next.js 16.x.x`
   - You should NOT see: `▲ Next.js 16.x.x (turbo)`
   - The startup message should not mention Turbopack

## If Still Having Issues

### Option 1: Use explicit webpack flag
```bash
npm run dev -- --no-turbo
```

### Option 2: Update package.json script
```json
"dev": "next dev --no-turbo"
```

### Option 3: Enable Windows Developer Mode
1. Open Windows Settings
2. Go to Update & Security → For developers
3. Enable "Developer Mode"
4. This allows symlink creation without admin privileges

## Verify It's Working

After restarting, test the API:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"test-123","deviceModel":"Test","androidVersion":"13"}'
```

You should get a JSON response, not HTML error page.







