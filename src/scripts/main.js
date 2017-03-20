var CryptoJS = require("crypto-js");
var fld_user = document.getElementById('fld_user');
var fld_mail = document.getElementById('fld_mail');
var btn_submit = document.getElementById('btn_create');
var btn_verify = document.getElementById('btn_verify');
btn_verify.style.display = "none";
var message_box = document.getElementById('message');
var SECRET = "EtCngPx6";

btn_submit.onclick = function(){
  var user_name = fld_user.value;
  var user_mail = fld_mail.value;
  var token = createToken(user_name, user_mail);
  btn_verify.style.display = "block";
  btn_verify.onclick = function(){
    verifyToken(token);
  }
};

function createToken(name, mail, isadmin=true){
  var user = {
    name: name,
    mail: mail,
    admin: isadmin
  };
  var hash_payload = window.btoa(JSON.stringify(user));
  var hash_signature = CryptoJS.HmacSHA256(hash_payload, SECRET).toString();
  var web_token = hash_payload +"."+ hash_signature;
  message_box.innerHTML = web_token;
  return web_token;
}

function verifyToken(token) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("RESPONSE: "+this.responseText);
        }
    };
    xhttp.open("POST", "./auth/verifyuser.php", true);
    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
}
