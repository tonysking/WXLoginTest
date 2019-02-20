// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //登录
  doLogin:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    wx.login({
      success: function(res){
        console.log(res)
        //获取登录临时凭证
        var code = res.code;

        wx.showLoading({
          title: '请等待...',
        });
        //调用后端获得微信的session_key,secret
        wx.request({
          url: "http://192.168.186.1:8080/wxLogin?code=" + code,
          method:"POST",
          success:function(result){
             console.log(result); 
             wx.hideLoading();
             //保存用户信息到本地缓存，可用作小程序端的拦截器
             app.setGlobalUserInfo(e.detail.userInfo);        
             wx.redirectTo({
               url: '../index/index',
             })
          }
        })
      }
    })
  }

  
})