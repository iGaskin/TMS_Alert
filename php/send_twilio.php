<?php

require __DIR__ . '/vendor/autoload.php';

 
// set your AccountSid and AuthToken from www.twilio.com/user/account
$AccountSid = "ACf2a5284d488ca22763bbdc1a55061237";
$AuthToken = "85da0d17d689638f09f4b5e325720165";
 
$client = new Services_Twilio($AccountSid, $AuthToken);
 
$message = $client->account->messages->create(array(
    "From" => "414-369-6836",
    "To" => "414-403-9465",
    "Body" => "Test message!",
));
 
// Display a confirmation message on the screen
echo "Sent message {$message->sid}";
