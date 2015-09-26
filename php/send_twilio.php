<?php

require __DIR__ . '/vendor/autoload.php';
include 'credentials.php';


function send_twilio($toNumber){
  // connect to db and update current verse id
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
  $result = $mysqli->query("select * from user_data where phone_number = ".$toNumber);

  /* fetch object array */
 $obj = $result->fetch_object();
 $current_verse_id = $obj->current_verse_id;
  if ($current_verse_id > 12){
    exit();
  }
  else{
    // Grab the bible verse
    $verse_pack_id = $obj->verse_pack_id;
    $version_id = $obj->version_id;
    // echo $verse_pack_id;
    // echo $version_id;
    $filename = "../" . $verse_pack_id . "-Pack/" . $verse_pack_id . "-" . $current_verse_id . ".json";
    // $file = fopen( $filename, "r" );
    //
    //          if( $file == false )
    //          {
    //             echo ( "Error in opening file" );
    //             exit();
    //          }
           $string = file_get_contents($filename);
          //  if (!$string == false)
          //  {
          //       echo ( "Error in opening file" );
          //       exit();
          //  }
           $json_a = json_decode($string, true);
           $verse =  $json_a[$version_id]["verse"];
           $reference = $json_a[$version_id]["reference"];

            //  $filesize = filesize( $filename );
            //  $filetext = fread( $file, $filesize );
    // fclose( $file );
    // Send text
    $message = join("\n",array($verse,$reference));
    echo $message;


    //MySqli Update Query
    $results = $mysqli->query("UPDATE user_data SET current_verse_id = current_verse_id + 1 WHERE phone_number=".$toNumber);
    if($results){
        print 'Success! record updated';
    }
    else{
        print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
    }
  }

  $mysqli->close();

  // Twilio API send SMS
  global $AccountSid, $AuthToken, $fromNumber;
  $client = new Services_Twilio($AccountSid, $AuthToken);

  $message = $client->account->messages->create(array(
      "From" => $fromNumber,
      "To" => $toNumber,
      "Body" => $message,
  ));

  // Display a confirmation message on the screen

  echo "Sent message {$message->sid}";



}
send_twilio(4144039465);
?>
