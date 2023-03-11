const config = require("./config");
const request = require("request");
const chalk = require("chalk");
const md5 = require("blueimp-md5");
let formHash = "###";
let url = "###";
let itvId = 0;
let lstMsg = "###"
let lstFormhash = "###"

function getAlarms(val,later,before){
    var alarm=val;
    var index=alarm.indexOf(later);
    alarm=alarm.substring(index+later.length,alarm.length);
    index=alarm.indexOf(before);
    alarm=alarm.substring(0,index);
    return alarm;
}
function getFormHash(){
    const headers = {
        "cookie": `ZxYQ_8cea_auth=${config.authKey}; ZxYQ_8cea_saltkey=${config.saltKey}`
    };
    request({
        url: "https://www.mcbbs.net/portal.php",
        method: "GET",
        headers: headers
    },function(error,response,body){
        if(!error&&response.statusCode===200){
            formHash = getAlarms(body,"setcookie(\"last_message_key\",md5(a+\"fc","\"))");
            console.log(chalk.green("获取FormHash成功：" + formHash));
            console.log(chalk.cyanBright("开始初始化 Step2..."));
            checkCookies();
        }
        else{
            console.log(chalk.red("出现错误 " + response.statusCode));
        }
    });
}
function genNewKey(){
    let vid = Math.round(2147483647*Math.random());
    return md5(String(vid));
}
function checkCookies(){
    const headers = {
        "cookie": `ZxYQ_8cea_auth=${config.authKey}; ZxYQ_8cea_saltkey=${config.saltKey}`
    };
    request({
        url: "https://www.mcbbs.net/portal.php",
        method: "GET",
        headers: headers
    },function(error,response,body){
        if (!error && response.statusCode === 200 && body.indexOf("距离下一级还需要") !== -1) {
            console.log(chalk.green("Cookie有效性确认成功"));
            console.log(chalk.cyanBright("拼合URL..."));
            let key = genNewKey();
            console.log(chalk.green("key=" + key));
            lstMsg = md5(key+"fc"+formHash);
            lstFormhash = md5("fc"+formHash);
            url = "https://www.mcbbs.net/plugin.php?id=dc_signin:check&formhash=" + formHash + "&key=" + key + "&inajax=1&ajaxtarget=undefined";
            console.log(chalk.green("初始化结束"));
            requestSignIn();
            itvId = setInterval(requestSignIn, 20000);
        } else {
            if (!error && response.statusCode === 200) {
                console.log(chalk.red("Cookie无效"));
            } else {
                console.log(chalk.red("出现错误 " + response.statusCode));
            }
        }
    });
}
function requestSignIn(){
    const headers = {
        "cookie": `ZxYQ_8cea_auth=${config.authKey}; ZxYQ_8cea_saltkey=${config.saltKey}; ZxYQ_8cea_last_message_key=${lstMsg}; ZxYQ_8cea_formhash=${lstFormhash}`
    };
    request({
        url: url,
        method: "GET",
        headers: headers
    },function(error,response,body){
        if(!error&&response.statusCode===200){
            console.log(body);
        }
        else{
            console.log(chalk.red("出现错误 " + response.statusCode));
            clearInterval(itvId);
        }
    });
}
function init(){
    console.log(chalk.green("======================="));
    console.log(chalk.green("|  MCBBS Auto SignIn  |"));
    console.log(chalk.green("|  By: Anschluss_zeit |"));
    console.log(chalk.green("|  GPLv3.0-or-later   |"));
    console.log(chalk.green("======================="));
    console.log(chalk.yellow("项目开源地址(GPLv3.0)："));
    console.log(chalk.yellow("https://github.com/Anschluss-zeit/MCBBS_Auto_SignIn"));
    console.log(chalk.cyanBright("开始初始化 Step1..."));
    getFormHash();
}
init();