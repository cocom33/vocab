function send() {
  var genders = document.getElementsByName("choice");
  var selectedGender = null;

  for (var i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
          selectedGender = genders[i].value;
          break;
      }
  }
  
  if (!selectedGender) {
    var msg = 'You must select your gender!';
    document.getElementById('msg').innerHTML = msg;
    return false;
  }
}

function reset_msg() {
    document.getElementById('msg').innerHTML = '';
}