<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "mosesmefray@gmail.com";
    $subject = "New Appointment Request";

    $message = "New appointment request:\n\n";
    foreach($_POST as $key => $value) {
        $message .= ucfirst($key) . ": " . $value . "\n";
    }

    $headers = "From: m.g.taigas@gmail.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Appointment request sent successfully.";
    } else {
        echo "Failed to send appointment request.";
    }
}
?>