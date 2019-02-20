// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: {},
    nickname: {},
    avatarUrl:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;

    var user = app.getGlobalUserInfo();
    var userId = app.getGlobalUserId();

    me.setData({
      userId: userId,
      nickname: user.nickName,
      avatarUrl: user.avatarUrl
    })

    //调用后端查看用户参与的活动
    wx.request({
      url: 'http://localhost:8080/applet/user/lookOverUserCreation/'+userId,
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'headerOpenId': user.openId //相关查询请求头中必须有OpenId
      },
      success: function (result) {
        console.log('后端返回参与活动: ');
        console.log(result)
      },
    })

  },

  
})