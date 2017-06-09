<?php
require 'connect.php';

$sql = "SELECT * FROM shopCategory";
$result = mysqli_query($dbcon, $sql);

$shopCategory = array();

 while($row =mysqli_fetch_assoc($result))
{
    $shopCategory[] = $row;
}

echo json_encode($shopCategory);

mysqli_close($dbcon);

exit;