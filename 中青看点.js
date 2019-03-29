const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"中青看点",
    indexFlagText:"美文",
});

templates.run({
    //初始化APP
    initApp:function(){
        click(1079,1919);
        sleep(1000);
        var flag = commons.textBoundsClick("立即领取");
        if(!flag){
            return;
        }
        //微信登陆
        commons.textBoundsClick("微信一键登录");
        sleep(5000);
        commons.textBoundsClick("确认登录");
        sleep(5000);
        back();

        //绑定手机
        commons.idClick("iv_user_cover");
        commons.textBoundsClick("手机号");
        //获取手机号
        var projectId = 19972;
        var phone = commons.getPhone(projectId);
        //写入手机号码
        id("et_login_phone").findOnce().setText(phone);

        //下一步
        sleep(1000);
        commons.textBoundsClick("获取短信验证码");
        sleep(1000);

        //获取验证码
        var code = commons.getCode(phone,projectId,60);
        toast(code);

        //写入验证码
        className("EditText").findOnce(0).setText(code.substring(0,1));
        className("EditText").findOnce(1).setText(code.substring(1,2));
        className("EditText").findOnce(2).setText(code.substring(2,3));
        className("EditText").findOnce(3).setText(code.substring(3,4));
    },

    //获取首页按钮
    getIndexBtnItem:function(){
        return id("tv_home_tab").findOnce();
    },

    //服务端记录
    record:function(){
        click(1079,1919);
        sleep(2000);
        var todayScore = id("tv_today_douzi").findOnce().text();
        var totalScore = id("tv_douzi").findOnce().desc();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=中青看点&totalScore="+totalScore+"&todayScore="+todayScore);
        sleep(2000);
    },
    //提现
    exchange:function(){
        click(1079,1919);
        sleep(2000);
        commons.textBoundsClick("提现兑换");
        sleep(2000);
        commons.textBoundsClick("微信");
        commons.textBoundsClick("10元");
        commons.textBoundsClick("立即提现");
        sleep(2000);
        back();
        sleep(2000);
        back();
        sleep(2000);
    },

    //签到
    signIn:function(){
        //进入我的
        click(1079,1919);
        sleep(2000);
        //进入任务中心
        commons.textBoundsClick("任务中心");
        sleep(2000);
        //点击签到领红包
        var flag = commons.textBoundsClick("签到领红包");
        sleep(2000);
        //返回主页面
        back();
        sleep(1000);
        back();
        toast("返回主页")
        sleep(2000);
        commons.idClick("tv_home_tab");
    },
    
    //找出新闻的条目
    findNewsItem:function(){
        commons.textBoundsClick("忽略");
        var newsItem = id("tv_read_count").findOnce(1);
        //判断是否是广告
        if(newsItem){
            newsItem = newsItem.parent();
            var adFlag = newsItem.child(1);
            if(adFlag && adFlag.text() == "广告"){
                newsItem = null;
            }
        }
        return newsItem;
    },
    //阅读页面是否应该返回
    isShouldBack:function(){
        commons.textBoundsClick("忽略");
        //不存在奖励，直接退出
        if(!id("news_income_container").findOnce()){
            return true;
        }

        //存在下载安装
        if(id("button2").findOnce()){
            id("button2").findOnce().click();
            return true;
        }

        return false;
    }
});
