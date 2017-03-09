var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var fld_user = document.getElementById('fld_user');
var fld_mail = document.getElementById('fld_mail');
var submit_btn = document.getElementById('btn_create');
var message_box = document.getElementById('message');
var SECRET = "123456";

submit_btn.onclick = function(){
  var user_name = fld_user.value;
  var user_mail = fld_mail.value;
  createToken(user_name, user_mail);
};

function createToken(name, mail, isadmin=true){
  var user = {
    name: name,
    mail: mail,
    admin: isadmin
  };
  var hash_payload = window.btoa(JSON.stringify(user));
  var hash_signature = SHA256(hash_payload, SECRET);
  var web_token = hash_payload +"."+ hash_signature;
  console.log("web_token: "+web_token);
}
