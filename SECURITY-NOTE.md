# 🔐 Security Note

## Important: Credentials Management

This project uses environment variables for sensitive credentials.

### Setup

1. Copy the example environment file:
```bash
cp server/.env.example server/.env
```

2. Edit `server/.env` and add your actual credentials:
   - Twilio Account SID and Auth Token (from https://console.twilio.com)
   - Resend API Key (from https://resend.com/api-keys)
   - JWT Secret (generate a strong random string)
   - Other API keys as needed

3. Never commit the `.env` file (it's already in `.gitignore`)

### Files

- `.env.example` - Template with placeholders (safe to commit)
- `.env` - Your actual credentials (never commit)
- `.gitignore` - Ensures `.env` is not committed

### Best Practices

- ✅ Use placeholders in committed files
- ✅ Keep real credentials in `.env` only
- ✅ Use different credentials for development and production
- ❌ Never commit real API keys or tokens
- ❌ Never share credentials in documentation

### Getting Credentials

**Twilio:**
- Sign up at https://www.twilio.com
- Get Account SID and Auth Token from Console
- Purchase a phone number

**Resend:**
- Sign up at https://resend.com
- Create an API key
- Verify your domain

For more information, see the official documentation for each service.
