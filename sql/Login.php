<?php

include '../inc/Connection.php';

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
        echo json_encode($res);
    }else {
        array_push($errors, "Wrong email/password combination");
        echo json_encode($errors);
    }
} else{
    echo json_encode($errors);
}