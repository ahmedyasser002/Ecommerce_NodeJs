export const emailTemplate = (email) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #333333; }
    p { color: #555555; font-size: 16px; line-height: 1.5; }
    .btn { display: inline-block; margin-top: 20px; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none; }
    .btn:hover { background-color: #45a049; }
    .footer { margin-top: 30px; font-size: 12px; color: #999999; }
</style>
</head>
<body>
<div class="container">
    <h1>Email Verification</h1>
    <p>Hi there,</p>
    <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
    <a href="http://localhost:5000/verify/${email}" class="btn">Verify Email</a>
    <p>If you didn't create an account, you can safely ignore this email.</p>
    <div class="footer">&copy; 2026 Your Company. All rights reserved.</div>
</div>
</body>
</html>
  `;
};