# MCBBS自动签到  
## 简介  
这是一个MCBBS自动签到的防断签脚本  
使用Nodejs编写  
作者：Anschluss_zeit  
## 使用
下载源文件压缩包后解压，进入文件夹执行：  
```sh
npm install
```
等待执行完成后，登录MCBBS，F12查找如下两项Cookie（不懂可百度）  
- ZxYQ_8cea_auth  
- ZxYQ_8cea_saltkey  
打开`config.js`，按照注释填写Cookie  
填写完成后运行：  
```sh
npm start
```
根据错误信息进行更正后，输出`初始化结束`即代表脚本成功运行