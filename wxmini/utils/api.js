// 本机开发时使用
// var rootUrl = 'http://localhost:9088/minihunlian/';
// 真机调试使用
// var rootUrl = 'http://192.168.1.100:9088/minihunlian/';
// 正式使用
var rootUrl = 'https://m.xifuvip.com/minihunlian/';
module.exports = {
  file: rootUrl + "common/file?path=",
  upload: rootUrl + "common/file/upload",
  saveRealName: rootUrl + "minisrv/blinduser/saveRealName",
  getRealName: rootUrl + "minisrv/blinduser/getRealName", 
  sendRegVerifyCode: rootUrl + "minisrv/auth/sendRegVerifyCode",
  regist: rootUrl + "minisrv/auth/regist",
  login: rootUrl + "minisrv/auth/login",
  wechatLogin: rootUrl + "minisrv/auth/wechatLogin",
  checkToken: rootUrl + "minisrv/auth/checkToken",
  saveBaseInfo: rootUrl + "minisrv/blinduser/saveBaseInfo",
  getBaseInfo: rootUrl + "minisrv/blinduser/getBaseInfo",
  saveUserPhotoAlbumsPath: rootUrl + "minisrv/blinduser/saveUserPhotoAlbumsPath",
  getUserPhotoAlbumsPath: rootUrl + "minisrv/blinduser/getUserPhotoAlbumsPath",
  deleteUserPhotoAlbums: rootUrl + "minisrv/blinduser/deleteUserPhotoAlbums",
  indexPageData: rootUrl + "minisrv/blinduser/indexPageData",

  findBlindUserById: rootUrl + 'minisrv/blinduser/findBlindUserById',
  updateBasicdata: rootUrl +'minisrv/blinduser/update',
  findActivityList: rootUrl +'minisrv/activity/findActivityList',
  findActivityById: rootUrl +'minisrv/activity/findActivityById',
  findIsEntryByactIdUserId: rootUrl +'minisrv/activity/findIsEntryByactIdUserId',
  activityEntrySave: rootUrl +'minisrv/activity/activityEntrySave',
  findUserInfoById: rootUrl +'minisrv/luck/findUserInfoById',
  attention: rootUrl + 'minisrv/luck/attentionById',
  isAttention: rootUrl + 'minisrv/luck/findIsAttentionUserId',
  findmycenterById: rootUrl + 'minisrv/blinduser/findmycenterById',

  saveCharacterHobby: rootUrl + 'minisrv/characterHobby/save',
  getSelectCharacterHobbyList: rootUrl + 'minisrv/characterHobby/getSelectList',
  saveMaleSelect: rootUrl + 'minisrv/maleselect/saveMaleSelect',
  getMaleSelect: rootUrl + 'minisrv/maleselect/getMaleSelect',
  saveFamilyState: rootUrl + 'minisrv/familyState/saveFamilyState',
  getFamilyStateByUserId: rootUrl + 'minisrv/familyState/getFamilyStateByUserId'
}