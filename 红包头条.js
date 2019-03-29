const commons = require('common.js');
const templates = require('template.js');

templates.init({
    appName:"红包头条",
    indexBtnText: "头条",
    indexFlagText:"社会",
});

templates.run({
    //初始化APP
    initApp:function(){
        //进入我的
        commons.textBoundsClick("我的");
        commons.idClick("rd_close");
        var flag = commons.textBoundsClick("点击登录");
        if(!flag){
            return;
        }

        //微信登陆
        commons.idClick("account_login_wx");
        sleep(5000);
        commons.textBoundsClick("确认登录");
        sleep(5000);
        back();
    },

    //服务端记录
    record:function(){
        commons.textBoundsClick("我的");
        sleep(2000);
        back();
        var todayScore = id("martian_account_coins").findOnce().text();
        var totalScore = id("martian_account_money").findOnce().text();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=红包头条&totalScore="+totalScore+"&todayScore="+todayScore);
        toast("服务端记录结束");
        sleep(2000);
    },

    //提现
    exchange:function(){
        //进入我的
        commons.textBoundsClick("我的");
        back();

        //获取金额，小于0.3不用提现
        var totalScore = id("martian_account_money").findOnce().text();
        if(totalScore < 0.3){
            return;
        }

        //进入提现界面
        commons.idClick("martian_money_view");
        commons.textBoundsClick("零钱提现");

        //获取真实姓名
        var name = http.get("http://123.207.216.74:8080/app/getName?deviceCode="+device.getAndroidId()).body.string();
        id("alipay_name").findOnce().setText(name);
        sleep(2000);
        //获取提现金额
        id("martian_withdraw_money").findOnce().setText(totalScore);
        //点击提现
        commons.textBoundsClick("确认提现");
        sleep(2000);
        back();
        sleep(2000);
        back();
        sleep(2000);
    },

    //签到
    signIn:function(){
        commons.textBoundsClick("任务");
        commons.idClick("fr_close");
        sleep(2000);
        commons.textBoundsClick("签到");
        commons.textBoundsClick("分红");
        sleep(2000);
        back();
        sleep(2000);
        click(16,1910);
    },
    
    //找出新闻的条目
    findNewsItem:function(){
        return id("ll_root").findOnce();
    },

    //阅读页面是否应该返回
    isShouldBack:function(){
        //不存在奖励，直接退出
        if(!id("circularProgressBar").findOnce()){
            return true;
        }
        return false;
    }
});
