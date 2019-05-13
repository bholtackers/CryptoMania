<?php

include '../inc/Connection.php';

$file = '../log.txt';
date_default_timezone_set('Europe/Amsterdam');

$errors = array();

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];

if (empty($username)) {
    array_push($errors, "Username is required");
}
if (empty($email)) {
    array_push($errors, "Email is required");
}
if (empty($password)) {
    array_push($errors, "Password is required");
}
if ($password != $confirmpassword) {
    array_push($errors, "The two passwords do not match");
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
    array_push($errors, "Email is not valid");
}

$user_check_query = "SELECT * FROM Users WHERE username='$username' OR email='$email' LIMIT 1";
$result = mysqli_query($conn, $user_check_query);
$user = mysqli_fetch_assoc($result);

if ($user) { // if user exists
    if ($user['username'] === $username) {
        array_push($errors, "Username already exists");
    }
    if ($user['email'] === $email) {
        array_push($errors, "email already exists");
    }
}

if (count($errors) == 0) {
    $password = password_hash($password, PASSWORD_DEFAULT);//encrypt the password before saving in the database

    $query = "INSERT INTO users (username, email, password) VALUES('$username', '$email', '$password')";
    mysqli_query($conn, $query);
    $date = date('d/m/Y h:i:s');
    $log = "[$date] - $username registered \n";
    file_put_contents($file, $log, FILE_APPEND | LOCK_EX);
    echo 'Success';
}
if (count($errors) > 0) {
    echo json_encode($errors);
}
