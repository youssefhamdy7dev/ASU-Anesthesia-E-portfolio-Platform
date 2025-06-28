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
            <p><i>Dear Program Director,</i><br><br>
                We hope this email finds you well. We wanted to bring to your attention an important matter regarding
                a<br>
                supervisor's inactivity on the ASU Anesthesia e-portfolio platform.
                <br><br>Despite multiple pending cases and assigned residents, it appears that <i
                    style="font-weight: bold">{{ $name }}</i> has<br>
                not been actively engaging with the e-portfolio platform.<br>This lack of involvement can significantly
                impact the progress and development of our residents, hindering their learning experience.<br><br>
                We kindly request your intervention and guidance in addressing this issue.<br>It is crucial to ensure
                that
                all supervisors fulfill their responsibilities promptly and actively engage with their assigned
                residents' cases and portfolios.<br><br>
                <span style="font-weight: bold; font-size: larger;">Total pending cases:
                    {{ $totalCases }} cases.</span><br><br>
                You can reach out to the supervisor via email at <a href="#">{{ $body }}</a> for any
                further communication or inquiries.<br><br>
                We recommend discussing this matter with <i style="font-weight: bold">{{ $name }}</i> directly
                to
                understand the reasons behind
                their inactivity and find a suitable resolution.<br>Encouraging their participation and emphasizing the
                importance of their role will help maintain the integrity and effectiveness of the e-portfolio platform.
                <br><br>Thank you for your prompt action.
            </p>
        </div>
    </div>
</body>

</html>
