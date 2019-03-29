const commons = require('common.js');
const templates = require('template.js');

templates.init({
    appName:"刷宝",
    appType:"video",//应用类型

    indexBtnText: "首页",
    indexFlagText:"首页",
});

templates.run({
    //初始化APP
    initApp:function(){
        toastLog("开始初始化APP");
        commons.textBoundsClick("我");
        var flag = text("请输入手机号").findOnce();
        if(!flag){
            commons.textBoundsClick("首页");
            return;
        }

        //执行微信登陆
        sleep(2000);
        commons.idClick("login_weixin");
        sleep(10000);
        commons.textBoundsClick("确认登录");
        sleep(5000);
        back();
        
    },
    //服务端记录
    record:function(){
        // commons.textClick("我");
        // sleep(2000);
        // var todayScore = className("android.support.v7.widget.RecyclerView").className("LinearLayout").className("TextView").findOnce(5).text();
        // var totalScore = className("android.support.v7.widget.RecyclerView").className("LinearLayout").className("TextView").findOnce(7).text();
        // http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=趣头条&totalScore="+totalScore+"&todayScore="+todayScore);
    },
    //提现
    exchange:function(){
        //进入提现页面
        commons.textBoundsClick("我");
        sleep(2000);
        commons.textBoundsClick("我的钱包");
        sleep(2000);
        //点击兑换提现
        commons.textBoundsClick("立即提现");
        sleep(2000);
        commons.textBoundsClick("立即提现");
        sleep(5000);
        back();
        sleep(2000);
        back();
        sleep(2000);
        commons.textBoundsClick("首页");
    },

    //签到
    signIn:function(){
        //进入提现页面
        commons.textBoundsClick("任务");
        sleep(2000);
        back();
        sleep(2000);
        commons.textBoundsClick("立即签到");
        sleep(2000);
        commons.textBoundsClick("首页");
    }
});
