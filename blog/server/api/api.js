// eslint-disable-next-line no-unused-vars
var models = require('../db')
var express = require('express')
// eslint-disable-next-line no-unused-vars
var mysql = require('mysql')
var router = express.Router()
var $sql = require('../sqlMap')

var pool = models.pool

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 增加用户
router.use('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body // 获得「请求主体」/ Cookies
  console.log(req)
  console.log('params')
  console.log(params)
  if (params.user_name == '' || params.user_pwd == '' || params.user_name == undefined) {
    return
  }
  pool.query(sql, [params.user_name, params.user_pwd], (error, results, fields) => {
    if (error) throw error
    if (results) {
      console.log('params***')
      console.log(results)
      jsonWrite(res, results)
      console.log(jsonWrite(res, results))
    }
  })
})

// 查库操作(检测用户信息)
router.use('/searchUser', (req, res) => {
  var sql = $sql.user.check
  var params = req.body
  console.log(req)
  pool.query(sql, [params.user_name, params.user_pwd], function (error, results, fields) {
    if (error) throw error
    if (results) {
      console.log(results)
      jsonWrite(res, results)
    }
  })
})
// 留言
router.use('/leaveMessage', (req, res) => {
  var sql = $sql.message.written
  console.log(req)
  var params = req.body
  console.log(params)
  pool.query(sql, [params.message_list, params.date, params.author], function (error, results, fields) {
    if (error) throw error
    if (results) {
      console.log(results)
    }
  })
})

// 获取留言留言列表
router.use('/leaveMessage', (req, res) => {
  var sql = $sql.message.search
  console.log(req)
  var params = req.body
  console.log(params)
  pool.query(sql, [params.massage_list], function (error, results, fields) {
    if (error) throw error
    if (results) {
      console.log(results)
    }
  })
})

module.exports = router
