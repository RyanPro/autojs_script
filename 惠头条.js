const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"惠头条",
    indexBtnText: "头条",
    indexFlagText:"刷新",
    timeAwardText : "点击领取",//时段奖励关键字
});

templates.run({
    //初始化APP
    initApp:function(){

    },

    //服务端记录
    record:function(){
        commons.textBoundsClick("我的");
        sleep(2000);
        var todayScore = id("setting_today_gold").findOnce().text();
        var totalScore = id("setting_surplus_gold").findOnce().text();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=惠头条&totalScore="+totalScore+"&todayScore="+todayScore);
        toast("服务端记录结束");
        sleep(2000);
    },

    //提现
    exchange:function(){
        toast("提现开始");
        commons.textBoundsClick("我的");
        commons.textBoundsClick("兑换提现");
        commons.textBoundsClick("微信");
        commons.textBoundsClick("5.00元");
        commons.textBoundsClick("立即兑换");
        commons.textBoundsClick("立即兑换");
        sleep(2000);
        back();
        sleep(2000);
        back();
        sleep(2000);
    },

    //签到
    signIn:function(){
        commons.textBoundsClick("任务中心");
        sleep(1000);
        commons.idClick("sign_btn_container");
        sleep(1000);
        click(20,1917);
        sleep(1000);
        click(20,1917);
    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("tv_title").findOnce(1);
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
        commons.textBoundsClick("取消");
        commons.textBoundsClick("我知道了");
        return false;
    },
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
});