<?php

include '../inc/Connection.php';

$file = '../log.txt';
date_default_timezone_set('Europe/Amsterdam');
$errors = array();

$email = $_POST['email'];
$password = $_POST['password'];

if (empty($email)) {
    array_push($errors, "Email is required");
}
if (empty($password)) {
    array_push($errors, "Password is required");
}

if (count($errors) === 0) {
    $queryPass = "SELECT password FROM users WHERE email='$email'";
    $resultsPass = mysqli_query($conn, $queryPass);
    $row = mysqli_fetch_assoc($resultsPass);
    $hash = $row['password'];
    if (password_verify($password, $hash)) {
        $queryUser = "SELECT email, admin, username, id FROM users WHERE email='$email'";
        $resultsUser = mysqli_query($conn, $queryUser);
        $row = mysqli_fetch_assoc($resultsUser);
        $res = [];
        array_push($res, $row);
        array_push($res, 'Success');
        $date = date('d/m/Y h:i:s');
        $log = "[$date] - $row[username] logged in \n";
        file_put_contents($file, $log, FILE_APPEND | LOCK_EX);
        echo json_encode($res);
    }else {
        array_push($errors, "Wrong email/password combination");
        echo json_encode($errors);
    }
} else{
    echo json_encode($errors);
}