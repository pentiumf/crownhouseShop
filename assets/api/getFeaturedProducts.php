<?php
require 'connect.php';

$sql = "SELECT * FROM products ORDER BY id DESC LIMIT 20";
$result = mysqli_query($dbcon, $sql);

$products = array();

 while($row =mysqli_fetch_assoc($result))
{
    $products[] = $row;
}

echo json_encode($products);

mysqli_close($dbcon);

exit;