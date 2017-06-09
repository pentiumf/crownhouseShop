<?php

//$server = 'localhost';
//$username = 'root';
//$password = '';
//$dbname = 'crownhouse';
//
//$dbcon = new mysqli($server, $username, $password, $dbname);


	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
	$server = $url["host"];
	$username = $url["user"];
	$password = $url["pass"];
	$db = substr($url["path"], 1);

	$dbcon = new mysqli($server, $username, $password, $db);