const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"微鲤看看",
    indexFlagText:"热点",
    timeAwardText:"领红包",
});

templates.run({

    //初始化APP
    initApp:function(){
        //到我的
        back();
        sleep(1000);
        commons.idClick("rl_bottom_4");

        //判断是否登陆
        var flag = text("立即赚钱").findOnce();
        if(!flag){
            return;
        }

        //执行微信登陆
        commons.textBoundsClick("立即赚钱");
        commons.idClick("login_0");
        commons.textBoundsClick("确认登录");
        sleep(5000);
        back();

        //绑定手机号
        swipe(device.width / 2, device.height * 0.8 ,device.width / 2, device.height * 0.5, 5000);
        commons.textBoundsClick("绑定手机号");
        commons.textBoundsClick("立即绑定");

        //获取手机号
        var projectId = 11081;
        var phone = commons.getPhone(projectId);
        //输入手机号码
        id("et_phone").findOnce().setText(phone);
        sleep(1000);
        //点击获取验证码
        commons.textBoundsClick("获取验证码");
        sleep(1000);
        //获取验证码
        var code = commons.getCode(phone,projectId,60);
        code = code.substring(0,4);
        toast(code);
        //输入验证码
        id("et_identify_code").findOnce().setText(code);
        sleep(1000);
        //下一步
        commons.textBoundsClick("下一步");

        //设置密码
        id("et_pws").findOnce().setText("12345678aaa");
        commons.textBoundsClick("设置密码");
    },

    //服务端记录
    record:function(){
        commons.idClick("rl_bottom_4");
        sleep(2000);
        var todayScore = id("text_today_coin").findOnce().text();
        var totalScore = id("text_residue_change").findOnce().text();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=微鲤看看&totalScore="+totalScore+"&todayScore="+todayScore);
    },
    //提现（红包形式，不好弄）
    exchange:function(){
        // commons.idClick("rl_bottom_4");
        // commons.textBoundsClick("提现兑换");
        // commons.textBoundsClick("立即提现");
        // sleep(2000);
        // back();
        // sleep(2000);
        // back();
        // sleep(2000);
    },

    //获取首页按钮
    getIndexBtnItem:function(){
        return id("rl_bottom_1").findOnce();
    },

    //签到
    signIn:function(){
        var succ = commons.textBoundsClick("签到");
        if(succ){
            sleep(1000);
            commons.textBoundsClick("立即签到");
            back();
        }
    },
    //找出新闻的条目
    findNewsItem:function(){

        //领取宝藏
        commons.idClick("text_ok");
        commons.idClick("bt_ok");

        var newsItem = id("tv_title").findOnce(1);
        if(newsItem){
            return newsItem.parent();
        }
    },
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
    //阅读页面是否应该返回
    isShouldBack:function(){

        //领取宝藏
        commons.idClick("text_ok");
        commons.idClick("bt_ok");

        return false;
    }
});