
const triggers = document.getElementsByClassName('gred');
const triggerArray = Array.from(triggers).entries();
const modals = document.getElementsByClassName('modal');
const closeButtons = document.getElementsByClassName('close');
console.log(triggerArray)
for (let [index, trigger] of triggerArray) {
  const toggleModal = () => {
    modals[index].classList.toggle('show-modal');
  }
  trigger.addEventListener("click", toggleModal);
  closeButtons[index].addEventListener("click", toggleModal);
}

// //submit form
// form.onsubmit = function () {
//   //get email
// var email = document.getElementById("email").value;
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//   "credentialName": "idms_uat",
//   "email": email
// });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("http://172.18.211.201:5000/api/ask-credential", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
//   return false;
// };



// // //submit form
//  formAuth.onsubmit = function () {
// //   //get email
// var username = document.getElementById("username").value;
// var password = document.getElementById("password").value;

//   var raw = JSON.stringify({
//   "credentialName": "idms_cms_uat",
//     "username": username,
//   "password":password
// });

// console.log(raw)
//   return false;
// };
