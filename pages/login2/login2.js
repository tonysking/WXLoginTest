// pages/login2/login2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backUserInfo: {}//后台得到的微信用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //登录
  doLogin: function (e) {
    var me = this;

    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    wx.login({
      success: function (res) {
        console.log("登录信息res:")
        console.log(res)
        //获取登录临时凭证
        var code = res.code;

        wx.showLoading({
          title: '请等待...',
        });

        wx.getUserInfo({
          
          success:function(ures) {
            console.log("用户信息ures:")
            console.log(ures)
            //调用后端获得微信的session_key,secret
            wx.request({
              url: "http://localhost:8080/applet/user/wxLogin2",
              method: "GET",
              data: { 
                encryptedData:ures.encryptedData, 
                iv:ures.iv, 
                code:code
                },
              header: {
                'content-type': 'application/json', // 默认值
                // 'headerOpenId': "ogZ4u1DH0sQZPtXjLqMpt6GxhL6A"
              },
              success: function (result) {
                console.log('后端返回result: ');
                console.log(result)
                wx.hideLoading();

                if(result.statusCode == 200) {
                  //登录成功
                  wx.showToast({
                    title: '登录成功',
                    icon:'success',
                    duration:2000
                  });

                  //将后台返回的数据赋值给backUserInfo
                  me.setData({
                    backUserInfo: result
                  })

                  //保存用户信息到本地缓存，可用作小程序端的拦截器
                  app.setGlobalUserInfo(result.data.extend.dec_userInfo);
                  app.setGlobalUserId(result.data.extend.userId);
                  // wx.redirectTo({
                  //   url: '../index/index',
                  // })
                  
                  wx.redirectTo({
                    url: '../mine/mine',
                  })
                } else if (result.statusCode == 500) {
                  //登录失败
                  wx.showToast({
                    title: '登录失败',
                    icon:'none',
                    duration:3000
                  })
                }
                
              }
            })
          }
        })
        
      }
    })
  }


})