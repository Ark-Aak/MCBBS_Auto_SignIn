const authKey = "d464AyXF5B4lrwA7Lkw89%2FzMryhf7k08CaQY05G7mHVgYj1OxgCPfc%2Fo3fHIzKFgtkWHx7YPtfNsrVB1sXPJze7zz6k1"
//填写ZxYQ_8cea_auth
const saltKey = "D6YJFYz9"
//填写ZxYQ_8cea_saltkey
const timeout = 1 * 3600
//每次请求的间隔时间，单位秒
const retry = 5
//出错时重试次数
module.exports = {authKey, saltKey, timeout, retry}