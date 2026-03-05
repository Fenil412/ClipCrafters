# PowerShell API Test Script for Notification Services
# Make sure the server is running: npm run dev

$BaseUrl = "http://localhost:5000/api"

Write-Host "🧪 Testing Notification API Endpoints" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Register user with phone
Write-Host "1️⃣ Registering user with phone..." -ForegroundColor Blue
$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$registerBody = @{
    name = "Test User"
    email = "test$timestamp@example.com"
    password = "password123"
    phone = "+919876543210"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $registerBody

$registerResponse | ConvertTo-Json -Depth 10
$token = $registerResponse.data.token
$userEmail = $registerResponse.data.user.email
Write-Host ""

# Test 2: Send OTP via Email
Write-Host "2️⃣ Sending OTP via Email..." -ForegroundColor Blue
$otpEmailBody = @{
    deliveryMethod = "email"
    email = $userEmail
} | ConvertTo-Json

$otpEmailResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/send-otp" `
    -Method Post `
    -ContentType "application/json" `
    -Body $otpEmailBody

$otpEmailResponse | ConvertTo-Json -Depth 10
Write-Host ""

# Test 3: Send OTP via SMS
Write-Host "3️⃣ Sending OTP via SMS..." -ForegroundColor Blue
$otpSmsBody = @{
    deliveryMethod = "sms"
    phone = "+919876543210"
} | ConvertTo-Json

try {
    $otpSmsResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/send-otp" `
        -Method Post `
        -ContentType "application/json" `
        -Body $otpSmsBody
    $otpSmsResponse | ConvertTo-Json -Depth 10
} catch {
    Write-Host "SMS test failed (expected if Twilio not configured)" -ForegroundColor Yellow
}
Write-Host ""

# Test 4: Verify OTP (will fail without actual OTP)
Write-Host "4️⃣ Testing OTP Verification (will fail - demo only)..." -ForegroundColor Blue
$verifyBody = @{
    otp = "123456"
    email = $userEmail
} | ConvertTo-Json

try {
    $verifyResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/verify-otp" `
        -Method Post `
        -ContentType "application/json" `
        -Body $verifyBody
    $verifyResponse | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Verification failed (expected - invalid OTP)" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: Resend OTP
Write-Host "5️⃣ Resending OTP via Email..." -ForegroundColor Blue
$resendBody = @{
    deliveryMethod = "email"
    email = $userEmail
} | ConvertTo-Json

$resendResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/resend-otp" `
    -Method Post `
    -ContentType "application/json" `
    -Body $resendBody

$resendResponse | ConvertTo-Json -Depth 10
Write-Host ""

Write-Host "✅ All tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Check your email (or RESEND_VERIFIED_EMAIL) for OTP messages" -ForegroundColor Yellow
Write-Host "SMS tests require valid Twilio credentials" -ForegroundColor Yellow
