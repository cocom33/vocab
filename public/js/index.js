function send() {
  var choice = document.getElementsByName("choice");
  var selectedGender = null;

  for (var i = 0; i < choice.length; i++) {
      if (choice[i].checked) {
          selectedGender = choice[i].value;
          break;
      }
  }
  
  if (!selectedGender) {
    var msg = 'You must select your class!';
    document.getElementById('msg').innerHTML = msg;
    return false;
  }
}

function reset_msg() {
    document.getElementById('msg').innerHTML = '';
}