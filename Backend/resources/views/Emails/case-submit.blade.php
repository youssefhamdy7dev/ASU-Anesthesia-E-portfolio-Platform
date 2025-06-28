<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
    <div>
        <h2>Welcome to <a href="http://localhost:3000/supervisor" target="blank">ASU Anesthesia E-Portfolio</a></h2>
        <div>
            <p><i>Dear {{ $body }},</i><br><br>
                We hope this message finds you well.<br>
                We wanted to inform you that a new case has been submitted by one of your assigned residents on the ASU
                Anesthesia e-portfolio platform.<br><br>
                As a supervisor, your expertise and review are crucial in evaluating and providing guidance on resident
                cases.<br>
                We kindly request you to review the case at your earliest convenience and take the necessary
                action—either accepting or rejecting it—based on your professional judgment.
                <br><br>
                To access the pending cases and take action, follow this link:
                <a href="http://localhost:3000/supervisor" target="blank">Pending Cases Link</a><br><br>
                Thank you for your commitment to mentoring and guiding our residents. Your valuable contributions play a
                significant role in their growth and development.
                <br><br><i>Best regards,</i><br>
                <i>ASU Anesthesia E-Portfolio Team</i>
            </p>
        </div>
    </div>
</body>

</html>
