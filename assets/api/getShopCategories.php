<?php 
	require 'connect.php';

    if (isset($_GET["catId"])) {
        $catId = (int)$_GET["catId"];
    }

    $sql = "SELECT * FROM shopCategoryDivision LEFT JOIN shopCategory ON shopCategoryDivision.shopCategory = shopCategory.id WHERE shopCategoryDivision.shopCategory = '$catId'";

    $result = $dbcon->query($sql);

    $data = array();

    while($row = $result->fetch_assoc()){
         $data[] = $row;
    }

    echo json_encode($data);

    mysqli_close($dbcon);
    
    exit;
