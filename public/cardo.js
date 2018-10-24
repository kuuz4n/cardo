// IIFE - Immediately Invoked Function Expression
// Read More: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(function() {
  var pageTitle = document.getElementById('pageTitle');
  console.log(pageTitle);

  var clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', function(event) {
    var inputs = document.getElementsByClassName('form-control');
    for(var i = 0; i < inputs.length; ++i) {
      var item = inputs[i];
      item.value = '';
    }
  });

})(); //- end of IIFE