#!/bin/bash

# API Test Script for Notification Services
# Make sure the server is running: npm run dev

BASE_URL="http://localhost:5000/api"

echo "🧪 Testing Notification API Endpoints"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Register user with phone
echo -e "${BLUE}1️⃣ Registering user with phone...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test'$(date +%s)'@example.com",
    "password": "password123",
    "phone": "+919876543210"
  }')

echo "$REGISTER_RESPONSE" | jq '.'
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token')
USER_EMAIL=$(echo "$REGISTER_RESPONSE" | jq -r '.data.user.email')
echo ""

# Test 2: Send OTP via Email
echo -e "${BLUE}2️⃣ Sending OTP via Email...${NC}"
curl -s -X POST "$BASE_URL/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryMethod": "email",
    "email": "'"$USER_EMAIL"'"
  }' | jq '.'
echo ""

# Test 3: Send OTP via SMS (will fail if phone not configured)
echo -e "${BLUE}3️⃣ Sending OTP via SMS...${NC}"
curl -s -X POST "$BASE_URL/auth/send-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryMethod": "sms",
    "phone": "+919876543210"
  }' | jq '.'
echo ""

# Test 4: Verify OTP (will fail without actual OTP)
echo -e "${BLUE}4️⃣ Testing OTP Verification (will fail - demo only)...${NC}"
curl -s -X POST "$BASE_URL/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "otp": "123456",
    "email": "'"$USER_EMAIL"'"
  }' | jq '.'
echo ""

# Test 5: Resend OTP
echo -e "${BLUE}5️⃣ Resending OTP via Email...${NC}"
curl -s -X POST "$BASE_URL/auth/resend-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryMethod": "email",
    "email": "'"$USER_EMAIL"'"
  }' | jq '.'
echo ""

echo -e "${GREEN}✅ All tests completed!${NC}"
echo ""
echo "Note: Check your email (or RESEND_VERIFIED_EMAIL) for OTP messages"
echo "SMS tests require valid Twilio credentials"
