<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Reset Your Password</h2>

        <p>You are receiving this email because we received a password reset request for your account.</p>

        <p>Your password reset token is: {{ $token }}</p>

        <p>If you did not request a password reset, no further action is required.</p>
    </div>
</body>

</html>
