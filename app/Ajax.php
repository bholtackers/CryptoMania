<?php
include '../inc/Connection.php';

$case = $_POST['case'];
switch ($case){
    case "addcoin":
        $ownerId = $_POST['ownerId'];
        $name = $_POST['name'];
        $date = $_POST['date'];
        $price = $_POST['price'];
        $amount = $_POST['amount'];
        $totalValue = $_POST['totalValue'];
        $query = "INSERT INTO cryptofolio (ownerId, name, price, amount, totalValue, bought_on) VALUES('$ownerId', '$name', '$price', '$amount', '$totalValue', '$date')";
        mysqli_query($conn, $query);
        echo 'Success';
        return;
    break;
    case "getcoins":
        $ownerId = $_POST['ownerId'];
        $query = "SELECT * FROM cryptofolio WHERE ownerId='$ownerId'";
        $result = $conn->query($query);
        $res = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($res, $row);
            }
        }
        echo json_encode($res);
        return;
    break;
    case "updateCoin":
        $coinId = $_POST['coinId'];
        $totalValue = $_POST['totalValue'];
        $totalAmount = $_POST['totalAmount'];
        $query = "UPDATE cryptofolio SET amount = '$totalAmount', totalValue = '$totalValue' WHERE id='$coinId'";
        mysqli_query($conn, $query);
        echo 'Success';
        return;
    break;
    case "sellCoin":
        $coinId = $_POST['coinId'];
        $totalValue = $_POST['totalValue'];
        $totalAmount = $_POST['totalAmount'];
        if  ($totalAmount == 0){
            $query = "DELETE FROM cryptofolio WHERE id='$coinId'";
            mysqli_query($conn, $query);
            echo 'SuccessAll';
            return;

        } else {
            $query = "UPDATE cryptofolio SET amount = '$totalAmount', totalValue = '$totalValue' WHERE id='$coinId'";
            mysqli_query($conn, $query);
            echo 'Success';
            return;
        }
    break;
}