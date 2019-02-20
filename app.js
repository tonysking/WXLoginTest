//app.js
App({

  serverUrl: "http://192.168.186.1:8080",
  userInfo: null,
  userId: null,

  setGlobalUserId: function (userId){
    wx.setStorageSync("userId", userId);
  },
  getGlobalUserId: function (userId) {
    return wx.getStorageSync("userId");
  },

  setGlobalUserInfo:function (user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },

  
  globalData: {
    userInfo: null
  }
})