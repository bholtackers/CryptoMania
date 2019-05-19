<?php
require '../inc/Connection.html'

$email = $_POST['email'];
echo $email;
$case = $_POST['case'];
echo $case;

switch ($case){
    case "login":
        echo "i is login";
    break;
}