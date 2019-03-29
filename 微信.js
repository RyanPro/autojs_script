const commons = require('common.js');

charge();
//微信转账提现
function charge(){
    //查看支付金额
    commons.launch("微信");
    sleep(10000);
    commons.textBoundsClick("我");
    sleep(5000);
    commons.textBoundsClick("支付");
    sleep(5000);
    var money=className("FrameLayout").className("ListView").className("LinearLayout").className("LinearLayout").className("TextView").findOnce(2).text();
    money = money.substring(1);
    if(money == "0.00"){
        back();
        sleep(1000);
        return;
    }
    back();
    sleep(1000);

    //进入群聊发红包
    commons.textBoundsClick("微信");
    sleep(2000);
    click(0,216,1080,432);//点击置顶群聊
    sleep(2000);

    //去掉文本框里面的内容
    className("EditText").findOnce(0).setText("");
    sleep(2000);

    //点击更多按按钮
    descContains("更多功能").findOnce(0).click();
    sleep(2000);

    //点击红包
    commons.textBoundsClick("红包");
    sleep(2000);

    //填写总金额
    className("EditText").findOnce(0).click();
    sleep(2000);
    className("EditText").findOnce(0).setText(money);
    sleep(2000);

    //填写红包数量
    className("EditText").findOnce(1).click();
    sleep(2000);
    className("EditText").findOnce(1).setText(1);
    sleep(2000);
    back();
    sleep(2000);

    //点击塞钱进红包
    commons.textClick("塞钱进红包");
    sleep(5000);

    //输入密码
    click(2,1205);
    sleep(1000);
    click(721,1205);
    sleep(1000);
    click(721,1560);
    sleep(1000);
    click(361,1381);
    sleep(1000);
    click(361,1202);
    sleep(1000);
    click(361,1202);
    sleep(6000);
    back();
}
