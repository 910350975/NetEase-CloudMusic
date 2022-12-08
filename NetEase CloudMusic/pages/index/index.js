// 引入封装请求函数
import request from '../../utils/request'
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    let bannerListData = await request('/banner',{type:2});
    this.setData({
      bannerList:bannerListData.banners
    })
    // 获取推荐歌单数据
    let recommendListData = await request('/personalized',{limit:10})
    this.setData({
      recommendList:recommendListData.result
    })
    // 获取排行榜数据
   let index = 0;
   let topList = await request('/toplist')
   let resultArr =[]
   for(let i=0;i<5;i++){
   let topListId = topList.list[i].id
   let topListItem = await request('/playlist/detail',{id:topListId})
   let weneed ={name:topListItem.playlist.name,tracks:topListItem.playlist.tracks.slice(0,3)}
   resultArr.push(weneed)
   this.setData({
   topList:resultArr
   })
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  // 跳转至recommendSong页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})