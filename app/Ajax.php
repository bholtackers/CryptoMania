<?php
include '../inc/Connection.html';

$case = $_POST['case'];
echo $case;

switch ($case){
    case "test":
        echo "test";
        return;
    break;
}