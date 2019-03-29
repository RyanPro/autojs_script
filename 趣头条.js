const commons = require('common.js');
const templates = require('template.js');

templates.init({
    appName:"趣头条"
});

templates.run({
    //初始化APP
    initApp:function(){
        //关闭新人福利
        commons.textBoundsClick("先去逛逛");
        //进入我的
        commons.textBoundsClick("我的");
        //关闭广告
        closeMyAd();

        //是否有登陆标志
        var loginFlag = text("手机登陆").findOnce();
        if(!loginFlag){
            back();
            toast("初始化APP：无需登陆")
            return;
        }

        //执行微信登陆
        className("ImageView").findOnce(2).click();
        sleep(10000);
        commons.textBoundsClick("确认登录");
        sleep(2000);

        //获取手机号
        var projectId = 2674;
        var phone = commons.getPhone(projectId);
        //写入手机号码
        text("请输入11位手机号码").findOnce().setText(phone);

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
        className("EditText").findOnce(2).setText(code.substring(3,4));
        
    },
    //服务端记录
    record:function(){
        commons.textBoundsClick("我的");
        //关闭广告
        closeMyAd();
        sleep(2000);
        var todayScore = className("android.support.v7.widget.RecyclerView").className("LinearLayout").className("TextView").findOnce(5).text();
        var totalScore = className("android.support.v7.widget.RecyclerView").className("LinearLayout").className("TextView").findOnce(7).text();
        http.get("http://123.207.216.74:8080/app/record?deviceCode="+device.getAndroidId()+"&appName=趣头条&totalScore="+totalScore+"&todayScore="+todayScore);
    },
    //提现
    exchange:function(){
        //进入提现页面
        commons.textBoundsClick("我的");
        sleep(2000);
        //关闭广告
        closeMyAd();
        sleep(2000);
        //点击兑换提现
        commons.textBoundsClick("提现兑换");
        //关闭支付宝广告
        sleep(2000);
        click(492,1641,588,1737);
        commons.textBoundsClick("微信");
        //选择金额:5元
        textContains("5元").findOnce().click();
        sleep(2000);
        commons.textBoundsClick("立即提现");
        back();
    },

    //签到
    signIn:function(){
        commons.textBoundsClick("任务");
        sleep(2000);
        click(1,1919);
    },

    //找出新闻的条目
    findNewsItem:function(){
        return className("android.support.v4.view.ViewPager").className("LinearLayout").findOnce();
    },
    
    //阅读页面是否应该返回
    isShouldBack:function(){
        //图集直接返回
        var imgItem = className("android.support.v4.view.ViewPager").className("ImageView").findOnce();
        if(imgItem){
            return true;
        }
        return false;
    }
});

function closeMyAd(){
    commons.classNameClick(className("ImageView"));
    sleep(1000);
    if(text("个人资料").findOnce()){
        back();
    }
}
