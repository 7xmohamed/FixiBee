<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Reset Your Password</h2>

        <p>You are receiving this email because we received a password reset request for your account.</p>

        <p>Click the button below to reset your password:</p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.frontend_url') }}/reset-password/{{ $token }}"
                style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
            </a>
        </div>

        <p>If you did not request a password reset, no further action is required.</p>

        <p>This password reset link will expire in 60 minutes.</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <p style="color: #666; font-size: 12px;">If you're having trouble clicking the "Reset Password" button, copy and
            paste the URL below into your web browser:</p>
        <p style="color: #666; font-size: 12px; word-break: break-all;">
            {{ config('app.frontend_url') }}/reset-password/{{ $token }}
        </p>
    </div>
</body>

</html>
