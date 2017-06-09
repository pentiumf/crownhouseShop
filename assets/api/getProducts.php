<?php 
	require 'connect.php';

    if (isset($_GET["proCatId"])) {
        $proCatId = (int)$_GET["proCatId"];
    }


    $sql = "SELECT * FROM products LEFT JOIN shopCategoryDivision ON products.shopSubId = shopCategoryDivision.sub_id WHERE products.shopSubId = '$proCatId'";

    $result = $dbcon->query($sql);

    $data = array();

    while($row = $result->fetch_assoc()){
         $data[] = $row;
    }

    echo json_encode($data);

    mysqli_close($dbcon);
    
    exit;
 ?>