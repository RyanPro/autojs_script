const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"牛牛头条",
    indexBtnText: "资讯",
    indexFlagText:"刷新",
});

templates.run({

    //初始化APP
    initApp:function(){
        var flag = commons.textBoundsClick("登录领取");
        if(!flag){
            return;
        }
        //微信登陆
        commons.idClick("id_activity_login_wx");
        sleep(5000);
        commons.textBoundsClick("确认登录");
        sleep(5000);
        back();
        sleep(2000);
        back();
    },

    //服务端记录
    record:function(){
        commons.idClick("id_layout_navigation_withdraw_layout");
        sleep(2000);
        var todayScore = 0;
        var totalScore = id("id_activity_withdraw_cash_coins_num").findOnce().text();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=牛牛头条&totalScore="+totalScore+"&todayScore="+todayScore);
        sleep(2000);
    },
    
    //提现
    exchange:function(){
        commons.idClick("id_layout_navigation_withdraw_layout");
        sleep(2000);
        commons.idClick("id_activity_withdraw_cash_btn");
        sleep(2000);
        back();
    },

    //签到
    signIn:function(){
        commons.textBoundsClick("每日金币");
        sleep(2000);
        click(1,1919);
    },

    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = className("android.support.v4.view.ViewPager")
            .className("android.support.v4.view.ViewPager")
            .className("android.support.v7.widget.RecyclerView")
            .className("RelativeLayout").findOnce();
        return newsItem;
    },

    //阅读页面是否应该返回
    isShouldBack:function(){
        return false;
    },
    
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
});
