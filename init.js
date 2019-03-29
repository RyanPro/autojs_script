const commons = require('common.js');

//趣头条
installApp("http://app.mi.com/details?id=com.jifen.qukan&ref=search");
//中青看点
installApp("http://app.mi.com/details?id=cn.youth.news&ref=search");
//红包头条
installApp("http://app.mi.com/details?id=com.martian.hbnews&ref=search");
//牛牛头条
installApp("http://app.mi.com/details?id=com.huolea.bull&ref=search");
//惠头条
installApp("http://app.mi.com/details?id=com.cashtoutiao&ref=search");

//兔子IP
installApp("http://www.abc2.com.cn/android/tuziip.apk");
//微鲤看看
installApp("http://app.mi.com/details?id=cn.weli.story&ref=search");

//安装APP
function installApp(url){
    app.openUrl(url);
    sleep(4000);
    commons.textBoundsClick("安装");
    sleep(10000);
}