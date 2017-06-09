<?php 
	require 'connect.php';

    if (isset($_GET["productId"])) {
        $productId = (int)$_GET["productId"];
    }

    $sql = "SELECT * FROM product_images LEFT JOIN products ON product_images.product_id = products.id WHERE product_images.product_id = '$productId'";

    $result = $dbcon->query($sql);

    $data = array();

    while($row = $result->fetch_assoc()){
         $data[] = $row;
    }

    echo json_encode($data);

    mysqli_close($dbcon);
    
    exit;
