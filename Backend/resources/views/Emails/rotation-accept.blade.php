<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
    <div>
        <h2>Welcome to <a href="http://localhost:3000" target="blank">ASU Anesthesia E-Portfolio</a></h2>
        <div>
            <p><i>Dear {{ $body }},</i><br><br>
                We are delighted to inform you that your requested rotation has been reviewed and accepted by the
                Program Director.<br>Congratulations on this achievement!<br><br>
                Your rotation has been successfully approved and added to your portfolio in the e-portfolio
                platform.<br><br>
                Check out your rotations list via this link: <a href="http://localhost:3000/view-rotations">Rotations
                    List</a><br><br>
                We appreciate your dedication and enthusiasm in pursuing diverse learning experiences.
                <br><br><i>Best regards,</i><br>
                <i>ASU Anesthesia E-Portfolio Team</i>
            </p>
        </div>
    </div>
</body>

</html>
