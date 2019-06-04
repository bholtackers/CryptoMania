<?php
include '../inc/Connection.php';

$case = $_POST['case'];
$errors = array();

switch ($case){
    case "addcoin":
        $ownerId = $_POST['ownerId'];
        $name = $_POST['name'];
        $date = $_POST['date'];
        $price = $_POST['price'];
        $amount = $_POST['amount'];
        $totalValue = $_POST['totalValue'];
        $query = "INSERT INTO cryptofolio (ownerId, name, price, amount, totalValue, bought_on) VALUES('$ownerId', '$name', '$price', '$amount', '$totalValue', '$date')";
        mysqli_query($conn, $query)
        echo 'Success';
        return;
    break;
}