(function() {

  verse_info_json = {
                    "A-Pack": "Live the New Life",
                    "B-Pack": "Proclaim Christ",
                    "C-Pack": "Rely on God's Resources",
                    "D-Pack": "Be Christ's Disciple",
                    "E-Pack": "Grow in Christlikeness"
                  };
      // get reference to select element
      var verse_select = document.getElementById('verse-options');

      for (var variable in verse_info_json) {
            var opt = document.createElement('option'); // create new option element
            // create text node to add to option element (opt)
            opt.appendChild( document.createTextNode(variable + " - " + verse_info_json[variable]));
            opt.value = variable; // set value property of opt
            verse_select.appendChild(opt); // add opt to end of select box (sel)
      }
})();
