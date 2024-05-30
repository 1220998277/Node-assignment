var express = require('express');
var router = express.Router();
var UserAccounts = require('../models/User-Accounts')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // const row = await UserAccounts.create({username:'张三',password:'6546554'})
  // User.create({ name:'张三',password:'123456',email:'123456@qq.com'})
  // const rows = await User.findAll()
  // res.json(rows)
  // res.json(row)
});
router.post('/', async function(req, res){
  const {username ,password } = req.body
  const row = await UserAccounts.create({ username,password })
  res.json(row)
})
router.put('/', async function(req, res){
  const {username ,password } = req.body
  const row = await UserAccounts.update({ username,password },{
    where:{
      id:1
    }
  })
  res.json(row)
})

module.exports = router;
