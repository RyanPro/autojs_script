var util = {};

//服务端url
util.server_url = "";//TODO 换成服务端的URL

/**
 * =========================
 * 服务端操作
 * =========================
 */
//初始化设备
util.initDevice = function(){
    http.get(util.server_url+"device/sync?deviceCode="+device.getAndroidId());
}

/**
 * =========================
 * app操作
 * =========================
 */
//唤醒主屏幕
util.wakeUp = function(){
    if(!device.isScreenOn()){
        device.wakeUpIfNeeded();
    }
}

//打开APP
util.launch = function(appName) {
    //初始化device
    util.initDevice();

    //唤醒屏幕
    util.wakeUp();

    //打开应用
    var flag = app.launchApp(appName);

    //安装应用
    if(!flag){
        var url = http.get(util.server_url+"app/getUrl?appName="+appName).body.string();
        util.install(url);
    }

    //授权
    sleep(5000);

    util.textClick("去授权");

    var loop = 0;
    while(loop < 5){
        loop++;
        util.textClick("允许");
    }

    

    sleep(10000);
};

//安装APP
util.install = function(url){
    //安装
    app.openUrl(url);
    sleep(4000);
    //选择默认浏览器
    var flag = textContains("推荐").findOnce();
    if(flag){
        flag.parent().click();
    }
    //安装
    sleep(4000);
    click(600,1800);
    //打开
    sleep(20000);
    click(600,1800);
}

/**
 * =========================
 * 点击事件
 * =========================
 */
//通过id点击
util.idClick = function(eleId) {
    var uiele = id(eleId).findOnce();
    var flag = false;
    if(uiele){
        uiele.click();
        flag = true;
    }
    sleep(1000);
    return flag;
}

//通过bounds点击
util.boundsClick = function(item) {
    var bounds = item.bounds();
    click(bounds.centerX(),bounds.centerY());
    sleep(1000);
}

//通过text点击
util.textClick = function(textContent) {
    var uiele = text(textContent).findOnce();
    var flag = false;
    if(uiele){
        uiele.click();
        flag = true;
    }
    sleep(1000);
    return flag;
}

//通过text的bounds的坐标点击
util.textBoundsClick = function(textContent) {
    var thisEle = text(textContent).findOnce();
    var flag = false;
    if (thisEle) {
        util.boundsClick(thisEle);
        flag = true;
    }
    sleep(1000);
    return flag;
}

//通过className的点击
util.classNameClick = function(classNameItem) {
    var thisEle = classNameItem.findOnce();
    var flag = false;
    if (thisEle) {
        thisEle.click();
        flag = true;
    }
    sleep(1000);
    return flag;
}

/**
 * =========================
 * 通用操作
 * =========================
 */
//返回主页
util.backToIndex = function(indexFlagText) {
    //主页的标志文字有没有出现
    var indexBtn = text(indexFlagText).findOnce();
    if(indexBtn){
        return;
    }

    //循环返回
    var loop = 0;
    while(!indexBtn){
        //返回
        sleep(1000);
        back();
        
        //超出退出时长的，做一些特殊处理
        if(loop > 5){
            //点击关闭
            var isSucc = util.textBoundsClick("关闭");

            //进入到APP安装页面，点击取消
            if(!isSucc){
                isSucc = util.textClick("取消");
            }

            //点击左上角
            click(0,72,156,210);

            //成功关闭
            indexBtn = isSucc;
        }
        loop++;

        //寻找首页标志文字
        indexBtn = text(indexFlagText).findOnce();
        sleep(1000);
    }
}

//滑动阅读新闻
util.swapeToRead = function() {
    //滑动阅读新闻
    swipe(device.width / 2, device.height * 0.8 ,
        device.width / 2, device.height * 0.5, 5000);

    swipe(device.width / 2, device.height * 0.8 ,
        device.width / 2, device.height * 0.5, 5000);
}

/**
 * =========================
 * 易码
 * =========================
 */

//获取token
util.getToken = function() {
    //获取token
    var ym_api = "http://api.fxhyd.cn/UserInterface.aspx?action=";
    var r = http.get(ym_api + "login&username=xxxx&password=xxxx");
    var token = r.body.string();
    if (token.indexOf("success") == -1) {
        toastLog("易码账号登陆失败！");
        return 0;
    }
    token = token.split("|");
    //保存token
    var storage = storages.create("yima");
    storage.put("token",token[1]);
    return token[1];
}

//获取手机号函数
util.getPhone = function(projectId) {
    var ym_api = "http://api.fxhyd.cn/UserInterface.aspx?action=";
    var excludeno = "170.171.180";

    //获取token
    util.getToken();
    var storage = storages.create("yima");
    token = storage.get("token");

    //获取手机号
    var r = http.get(ym_api + "getmobile&token=" + token + "&itemid=" + projectId + "&excludeno=" + excludeno);
    phone = r.body.string();
    if (phone.indexOf("success") == -1) {
        toastLog("获取号码失败，请检查账户信息及项目ID！");
        return 0;
    }
    phone = phone.split("|");
    return phone[1];
}

//获取验证码函数
util.getCode = function(phone, projectId, setOverTime) {
    var ym_api = "http://api.fxhyd.cn/UserInterface.aspx?action=";

    //获取token
    var storage = storages.create("yima");
    token = storage.get("token");

    //获取验证码
    var tag = 0;
    var i = 0;
    var verifyCode = "";
    while (tag != "success" && i < Math.ceil(setOverTime / 5)) {     
        var r = http.get(ym_api + "getsms&token=" + token + "&itemid=" + projectId + "&mobile=" + phone);
        var content = r.body.string()
        toastLog("验证码接口返回："+content);

        if(content == "3001"){
            toastLog("尚未获取到短信");
            sleep(5000);
        }else if(content.indexOf("success") != -1){
            var code = content.split("|");
            tag = code[0];
            verifyCode = code[1];
        }else{
            toastLog(content);
        }
        i++;
    }
    if (tag != "success") {
        toastLog("获取验证码超时或失败！");
        return 0;
    }
    verifyCode = verifyCode.match(/\d+/g);

    //释放手机号码
    util.rec(phone, projectId);

    return verifyCode[0];
}

//释放手机号
util.rec = function(phone,projectId) {
    var ym_api = "http://api.fxhyd.cn/UserInterface.aspx?action=";

    //获取token
    var storage = storages.create("yima");
    token = storage.get("token");

    //释放手机号码
    var r = http.get(ym_api + "release&token=" + token + "&itemid=" + projectId + "&mobile=" + phone);
    var sfphone = r.body.string();
    if (sfphone == "success") {
        return 1;
    } else {
        return 0;
    }
}

module.exports = util;