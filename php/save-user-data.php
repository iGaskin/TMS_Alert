<?php

// check and sanitize form fields
// TODO i have selected pack and verse options intuatively reversed...
$verse_pack_id = isset($_POST['verse_options']) ? $_POST['verse_options'] : '';
$verse_pack_id = preg_replace("/[^A-Za-z0-9]/", "", $verse_pack_id);
$current_verse_id = isset($_POST['radio']) ? $_POST['radio'] : '';
$current_verse_id = preg_replace("/[^A-Za-z0-9]/", "", $current_verse_id);
$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : '';
$phone_number = preg_replace("/[^0-9]/", "", $phone_number);


$foo = file_get_contents("php://input");

var_dump(json_decode($foo, true));
var_dump(json_decode($_POST, true));
 //
  echo "verse option: " . $verse_pack_id ."\r\n";
  echo "selected pack: " . $current_verse_id . "\r\n";
  echo "phone number: " . $phone_number . "\r\n";

// $phone_number     = 4144039465;
// $verse_pack_id    = "A";
// $current_verse_id = "2";
$date_added       =  date('Y-m-d');
$version_id       = "ESV";

// database credentials
$db_host='localhost';
$db_name='tms_db';
$db_user='root';
$db_passwd='4ahsafsotgoG';


// connect to database

$mysqli = mysqli_connect($db_host, $db_user, $db_passwd);
/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->select_db($db_name) or die('Could not select database');

$values = sprintf("('%s','%s', '%s', '%s' , '%s')",$phone_number, $verse_pack_id, $current_verse_id, $date_added, $version_id);

$result = $mysqli->query((sprintf("insert into user_data (phone_number, verse_pack_id, current_verse_id, date_added, version_id) VALUES".$values)));

$mysqli->close();
?>
