const fs = require("fs");
const path = require("path");
let jwt = require('jsonwebtoken');
// 处理post请求依赖包
const bodyParser = require("body-parser")
module.exports = function (app) {
  let Shop = [];
  app.use(bodyParser.json());
  app.all('*', (req, res, next) => {
    res.header({
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    next()
  })
  const goodPath = path.resolve(__dirname + "/data");
  const filePath = path.resolve(__dirname + "/classifyJson/classify.json");
  //首页渲染
  app.get('/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0', (req, res) => {
    req.query.page = 1;
    if (req.query > 4) {
      res.json({
        code: 1000,
        msg: "没有更多数据了"
      })
    } else {
      let data = fs.readFileSync(goodPath + `/data${req.query.page}.json`, 'utf-8')
      res.end(data)
    }
  });
  const queryApi = require('./queryApi');
  //分类
  app.get('/classify/Item', (req, res) => {
    // console.log(req.query)
    queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data => {
      // console.log(data)
      res.end(data)
    })
  });
  //分类侧边栏
  app.get('/classify', (req, res) => {
    let data = fs.readFileSync(filePath, 'utf-8');
    res.end(data)
  });
  //购物车权限
  app.post('/api/shop', (req, res) => {
    jwt.verify(req.body.token, '1601E', (err, decode) => {
      if (err) {
        res.json({
          code: 0,
          msg: '登陆超时,请重新登陆'
        })
      } else {
        let cons = path.resolve('addshop');
        let txt = JSON.parse(fs.readFileSync(cons + '/addshop.json', 'utf-8'));
        console.log(decode.username)
        res.json({
          code: 1,
          msg: txt[decode.username]
        })
      }
    })
  })
  //购物车列表
  app.post('/api/shopcar', (req, res) => {
    jwt.verify(req.body.token, '1601E', (err, decode) => {
      if (err) {
        res.json({
          code: 0,
          msg: '登陆超时，请重新登陆'
        })
      } else {
        let cons = path.resolve('addshop');
        let txt = JSON.parse(fs.readFileSync(cons + '/addshop.json', 'utf-8'));
        if (txt[decode.username]) {
          let flag = false //判断商品是否已经存在;
          txt[decode.username].forEach((item, index) => {
            if (item.title === req.body.item.title) {
              item.count++;
              flag = true
            }
          })
          if (!flag) {
            let obj = {
              ...req.body.item,
              count: 1
            }
            txt[decode.username].push(obj)
          }
        } else {
         txt[decode.username] = [{
              ...req.body.item,
              count: 1
            }]
        }
        Shop = txt[decode.username]
        fs.writeFile(cons + '/addshop.json', JSON.stringify(txt), (err) => {
          if (err) {
            res.json({
              code: 0,
              msg: '写入失败'
            })
          } else {
            res.json({
              code: 1,
              msg: txt[decode.username]
            })
          }
        })
      }
    })
  })
  //购物车增减
  app.post('/api/shopcar/count', (req, res) => {
    console.log(req.body.count);
    jwt.verify(req.body.token, '1601E', (err, decode) => {
      if (err) {
        res.json({
          code: 0,
          msg: '登陆超时'
        })
      } else {
        let txt = JSON.parse(fs.readFileSync(path.resolve('addshop/addshop.json'), 'utf-8'))
        let list = txt[decode.username];
        //操作数据库
        list = list.map((item, index) => {
          if (item.title == req.body.item) {
            item.count = req.body.count
          }
          return item;
        });
        txt[decode.username] = list
        fs.writeFile(path.resolve('addshop/addshop.json'), JSON.stringify(txt), (err) => {
          if (err) {
            res.json({
              code: 0,
              msg: '写入失败'
            })
          } else {
            res.json({
              code: 1,
              msg: txt[decode.username]
            })
          }
        })
      }
    })
  });
  //注册接口
  app.post('/api/user/login', (req, res) => {
    // console.log(req.body);
    let userlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "user", "userlist.json"), "utf-8"));
    // console.log(userlist);
    if (userlist.some((item) => {
        return item.username === req.body.username;
      })) {
      res.json({
        code: 2,
        msg: "用户已存在,请直接登陆"
      })
      return;
    }
    userlist.push(req.body);
    fs.writeFile(path.resolve(__dirname, "user", "userlist.json"), JSON.stringify(userlist), function (err) {
      if (err) {
        res.json({
          msg: err,
          code: 0
        })
      } else {
        res.json({
          msg: 'success',
          code: 1
        })
      }
    })
  });
  //登陆接口
  app.post('/api/user/register', (req, res) => {
    let userlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "user", "userlist.json"), "utf-8"));
    if (userlist.some(item => {
        //  req.body.password===item.password
        return req.body.username === item.username
      })) {
      let token = jwt.sign(req.body, '1601E', {
        expiresIn: 60 * 60
      })
      res.json({
        code: 1,
        msh: "success",
        token
      })
    } else {
      res.json({
        code: 0,
        msg: '用户名或密码错误'
      })
    }
  });
  //初始化
  app.get('/shop', (req, res) => {
    res.json({
      data: Shop
    })
  })
}
