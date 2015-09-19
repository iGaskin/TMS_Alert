(function() {
      // Populate dropdown for Pack selector
      var verse_select = document.getElementById('verse-options');

      for (var variable in verse_info_json) {
            var opt = document.createElement('option'); // create new option element
            // create text node to add to option element (opt)
            opt.appendChild( document.createTextNode(variable + " - " + verse_info_json[variable]));
            opt.value = variable.split("-")[0]; // set value property of opt
            verse_select.appendChild(opt); // add opt to end of select box (sel)
      }
})();

// Populate radio buttons for start verse
$(document).ready(function () {
    toggleFields(); //call this first so we start out with the correct visibility depending on the selected form values
    //this will call our toggleFields function every time the selection value of our underAge field changes
    $("#verse-options").change(function () {
        toggleFields();
    });

});

function createRadio(verse_key){
  var value_counter = 0;
  var selected_pack = document.getElementById('selected-pack');
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
          console.log(verse_referance_json[verse_key][i]);
           var text = verse_referance_json[verse_key][i].join(' - ');
           var verse_div = document.createElement("div");
           var label = document.createElement("label");
           var element = document.createElement("input");
           //Assign different attributes to the element.
           verse_div.setAttribute("type", "radio");
           element.setAttribute("type", "radio");
           element.setAttribute("value", value_counter);
           element.setAttribute("name", "radio");

           label.appendChild(element);
           label.innerHTML += text;

           var foo = document.getElementById("fooBar");

           //Append the element in page (in span).
           verse_div.appendChild(label);
           div.appendChild(verse_div);
           value_counter++;

          console.log(text + label + value_counter) ;
  }

           selected_pack.appendChild(div);
  return 1;
}

function toggleFields() {
    if ($("#verse-options").val() == 'A'){
        createRadio('A');
        $("#selected-pack").show();
      }

    else if ($("#verse-options").val() == 'B'){
        createRadio('B');
        $("#selected-pack").show();
      }
    else if ($("#verse-options").val() == 'C'){
        createRadio('C');
        $("#selected-pack").show();
      }
    else if ($("#verse-options").val() == 'D'){
        createRadio('D');
        $("#selected-pack").show();

      }
    else if ($("#verse-options").val() == 'E'){
        createRadio('E');
        $("#selected-pack").show();
      }
    else
        $("#selected-pack").hide();
}

// TODO make hidden fields visible when select a verse pack
// <div class="form-group">
//   <label class="col-md-4 control-label" for="radios">Multiple Radios</label>
//   <div class="col-md-4">
//   <div class="radio">
//     <label for="radios-0">
//       <input type="radio" name="radios" id="radios-0" value="1" checked="checked">
//       Option one
//     </label>
// 	</div>
//   <div class="radio">
//     <label for="radios-1">
//       <input type="radio" name="radios" id="radios-1" value="2">
//       Option two
//     </label>
// 	</div>
//   </div>
// </div>
// TODO set innerHTML of id selected-pack  or just hardcode...
