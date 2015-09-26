<?php

require __DIR__ . '/vendor/autoload.php';
include 'credentials.php';


function send_twilio($toNumber,$message){
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
?>
