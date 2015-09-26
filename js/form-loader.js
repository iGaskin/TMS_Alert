/*
This function servers to populate the dropdown
of TMS packs to select from
*/

(function() {

      var verse_select = document.getElementById('verse_options');

      for (var variable in verse_info_json) {
            var opt = document.createElement('option'); // create new option element
            // create text node to add to option element (opt)
            opt.appendChild( document.createTextNode(variable + " - " + verse_info_json[variable]));
            opt.value = variable.split("-")[0]; // set value property of opt
            verse_select.appendChild(opt); // add opt to end of select box (sel)
      }
})();


$(document).ready(function () {
    toggleFields(); //call this first so we start out with the correct visibility depending on the selected form values
    //this will call our toggleFields function every time the selection value of our underAge field changes
    $("#verse_options").change(function () {
        toggleFields();
    });

    $('form').submit(function () {
            $.ajax({
                url: "php/save-user-data.php",
                method: "POST",
                data:{
                    verse_options: $('#verse_options').val(),
                    radio: function(){
                        var radio_buttons = $('[name="radio"]');
                        for (var i = 0; i<radio_buttons.length; i ++){
                          if (radio_buttons[i].checked){
                              console.log(radio_buttons[i].value);
                              return radio_buttons[i].value;
                            }
                        }
                    },
                    phone_number: $('#phone_number').val()
                  },
                datatype: "json",
                success: function (status) {
                    if (status.success === false) {
                        //alert a failure message
                        var fail = document.createElement("div");
                        var fail_strong = document.createElement("strong");
                        fail.setAttribute("class","alert alert-danger");
                        fail_strong.innerHTML = "Failed to add to database";
                        fail.appendChild(fail_strong);
                        document.getElementById('form-horizontal').appendChild(fail);
                    } else {
                        //alert a success message
                        var div = document.createElement("div");
                        var strong = document.createElement("strong");
                        div.setAttribute("class","alert alert-success");
                        strong.innerHTML = "Successfully added to database";
                        div.appendChild(strong);
                        document.getElementById('form-horizontal').appendChild(div);

                    }
                }
            });
            return false;
        });

});

/*
This function serves to populate radio buttons
of verses to select which correspond to the
currently selected pack.
*/

function createRadio(verse_key){
  var value_counter = 1;
  var selected_pack = document.getElementById('selected_pack');
  var div = document.createElement("div");
  div.setAttribute("type","col-md-4 radio");
  // clear the radio buttons
  while (selected_pack.firstChild) {
    selected_pack.removeChild(selected_pack.firstChild);
}
  for (var i = 0; i < verse_referance_json[verse_key].length; i++){

  // var htmlRadio = '<div class=\"radio\"> \
  //          <input type=\"radio\" value=\"'+value_counter+'\" checked=\"checked\"> \
  //          '+verse_referance.join(' - ')+' \
  //    	</div>';
          //console.log(verse_referance_json[verse_key][i]);
           var text = verse_referance_json[verse_key][i].join(' - ');
           var verse_div = document.createElement("div");
           var label = document.createElement("label");
           var element = document.createElement("input");
           //Assign different attributes to the element.
           verse_div.setAttribute("type", "radio");
           element.setAttribute("type", "radio");
           element.setAttribute("name", "radio");
           element.setAttribute("id", "radio");
           element.setAttribute("value", value_counter);

           label.appendChild(element);
           label.innerHTML += text;

           var foo = document.getElementById("fooBar");

           //Append the element in page (in span).
           verse_div.appendChild(label);
           div.appendChild(verse_div);
           value_counter++;

          //console.log(text + label + value_counter) ;
  }

           selected_pack.appendChild(div);
  return 1;
}
/*
A function that servers to handel which radio buttons
are displayed.
*/
function toggleFields() {
    if ($("#verse_options").val() == 'A'){
        createRadio('A');
        $("#selected_pack").show();
      }

    else if ($("#verse_options").val() == 'B'){
        createRadio('B');
        $("#selected_pack").show();
      }
    else if ($("#verse_options").val() == 'C'){
        createRadio('C');
        $("#selected_pack").show();
      }
    else if ($("#verse_options").val() == 'D'){
        createRadio('D');
        $("#selected_pack").show();

      }
    else if ($("#verse_options").val() == 'E'){
        createRadio('E');
        $("#selected_pack").show();
      }
    else
        $("#selected_pack").hide();
}
