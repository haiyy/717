const express = require('express');
// const ejs = require("ejs");
const path = require("path");
const apilist=require("./apilist");
const queryApi=require("./queryApi")

let app = express();
//挂在静态资源
//app.use(express.static(path.join(__diranme,"static")));
//设置搜索引擎
// app.set("view engine","ejs");
//设置目录
// app.set("views","./server");

    app.all("*",function(req,res,next){
        res.header({ 
        "Access-Control-Allow-Origin" : "*",
        'Accept-Content':"application/json"
    });
    next();
})

apilist(app)
queryApi(app)

//配置服务端口
app.listen('3000',function(req){
    console.log('3000')
})