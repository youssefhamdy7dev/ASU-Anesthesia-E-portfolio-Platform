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
                We would like to inform you that a new assessment document has been uploaded by one of your assigned
                residents on the ASU Anesthesia e-portfolio platform.<br>This assessment requires your review and
                confirmation.<br><br>
                As a supervisor, your valuable input and approval are essential in validating the assessment
                document.<br>
                Kindly log in to the e-portfolio platform to review the assessment and take the necessary
                action.<br><br>
                We kindly request you to review the assessment at your earliest convenience and take the necessary
                action—either accepting or rejecting it—based on your professional judgment.
                <br><br>
                To access the pending assessments and take action, follow this link:
                <a href="http://localhost:3000/supervisor/pending-assessments" target="blank">Pending Assessments
                    Link</a><br><br>
                Thank you for your commitment to mentoring and guiding our residents. Your valuable contributions play a
                significant role in their growth and development.
                <br><br><i>Best regards,</i><br>
                <i>ASU Anesthesia E-Portfolio Team</i>
            </p>
        </div>
    </div>
</body>

</html>
