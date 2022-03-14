// Get the modal
var modal = document.getElementById("authModal");

// Get the button that opens the modal
var btn = document.getElementById("authBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//Get form
var form = document.getElementById("formAuth");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//submit form
form.onsubmit = function () {
  //get email
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "credentialName": "idms_cms_uat",
    "username": username,
  "password":password
});

console.log(raw)
  return false;
};
