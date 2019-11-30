// GET
// 参数 - URL上
// 返回 - String
// import Vue from 'vue'
// import axios from 'axios'
import $ from 'jquery'

function dataLinkPostJson(url, val) {
  return new Promise((resolve, reject) => {
    let httpUrl = localStorage.getItem('httpUrl')
    if (httpUrl) {
      httpUrl = `http://${httpUrl}`
    } else {
      httpUrl = 'http://192.168.4.1'
    }
    
    $.ajax({
      type: 'get',
      data: val,
      dataType: 'json',
      url: `${httpUrl}${url}`,
      async: true,
      success: function (data) {
        resolve(data)
      },
      error: function (res) {
        reject(res)
        console.log(url + '  ajax交互失败！')
      }
    })
  })
  
}


// // Vue.prototype.$http = axios
// function dataLinkGetJson (url, callback, err) {
//   axios({
//     method: 'get',
//     url: url,
//     headers: {
//       'Authorization': '23123123'
//     },
//     data: {}
//   }).then(function (res) {
//     callback(res)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }

// // POST
// // 参数 - URL上
// // 返回 - String
// function dataLinkPostJson (url, params, callback, err) {
//   axios({
//     method: 'post',
//     url: url,
//     headers: {
//       'Authorization': 'nsafnonfon'
//     },
//     data: params
//   }).then(function (res) {
//     callback(res)
//   }).catch(function (err) {
//     console.log(err)
//   })
// }
export {
  dataLinkPostJson
  // dataLinkGetJson
}
