# Email Configuration Guide for Smart Billing App

## Setting Up Gmail for Password Reset Emails

Your app now has full email support for password reset! Follow these steps to make it work:

### Step 1: Enable 2-Factor Authentication in Google Account
1. Go to https://myaccount.google.com
2. Select "Security" from the left sidebar
3. Scroll to "How you sign in to Google"
4. Enable "2-Step Verification"

### Step 2: Generate App Password
1. Go back to Google Account settings → Security
2. Scroll down to "App passwords" (appears only after 2FA is enabled)
3. Select "Mail" and "Windows Computer" (or your device)
4. Google will generate a 16-character app password
5. Copy this password

### Step 3: Update .env File
Edit the file `backend/.env` and update:

```
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password-from-step-2
```

Example:
```
SMTP_USER=john.doe@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

### Step 4: Test Password Reset
1. Make sure your backend is running
2. In the login page, click "Forgot Password"
3. Enter your email address
4. Check your email inbox for the reset link

## Alternative: Using Other Email Services

### Using Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Using SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Troubleshooting

### Email not sending?
1. Check that SMTP_USER and SMTP_PASS are correct
2. Ensure 2FA is enabled on your Google account
3. Check browser console for errors
4. Make sure your app password is correct (16 characters with spaces)

### "Less secure app access" error?
- Google has removed this option. Use App Passwords instead (see Step 2)

### Rate limit errors?
- Gmail limits emails to 300 per day. You're well within this limit.

## Features Implemented

✅ Forgot Password - sends email with reset link
✅ Reset Password - user can set new password with token
✅ Token expiration - reset link valid for 1 hour
✅ Secure token hashing - tokens are hashed in database
✅ Professional email templates - HTML formatted emails

