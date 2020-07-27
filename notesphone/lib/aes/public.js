var CryptoJS = require('./crypto-js.min.js'); //引用AES源码js

 //十六位十六进制数作为秘钥六位十六进制数作为密钥
var iv = CryptoJS.enc.Utf8.parse('82C3E3D24886E99D');  //十六位十六进制数作为密钥偏移量
//解密方法
function Decrypt(content, password) {
  var key = CryptoJS.enc.Utf8.parse(password);
  var encryptedHexStr = CryptoJS.enc.Hex.parse(content);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function Encrypt(content, password) {
  var key = CryptoJS.enc.Utf8.parse(password);
  var srcs = CryptoJS.enc.Utf8.parse(content);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;