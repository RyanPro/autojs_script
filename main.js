//代码仓库URL
var git_url = "";//TODO 换成可直接访问代码的地址
//服务端URL 
var server_url = "";//TODO 换成服务端的URL

/**
 * =========================
 * 脚本执行流程
 * =========================
 */
init();
//初始化
function init(){
    //执行策略
    while(true){
        //更新所有的脚本
        updateAllScript();

        //新闻类的列表
        var newsList = http.get(server_url+"app/listAppByType?type=news").body.string();
        newsList = JSON.parse(newsList);

        //视频类的列表
        var videoList = http.get(server_url+"app/listAppByType?type=video").body.string();
        videoList = JSON.parse(videoList);
        
        /**
         * 脚本执行策略
         * 1、0-7点：视频
         * 2、其他时间：新闻
         */
        var newsScriptStartHour = getConfig("newsScriptStartHour",7);//news脚本开始时间
        var normalRumTime = getConfig("normalRumTime",7);//脚本运行时间
        if(new Date().getHours() >= newsScriptStartHour){
            //执行新闻类的脚本
            for(var i = 0;i< newsList.length;i++){
                try {
                    var appName = newsList[i].appName;
                    //获取脚本配置
                    var appConfig = getAppConfig(appName);
                    
                    //根据配置执行
                    if(appConfig == null){
                        exec(appName, normalRumTime);
                    }else{
                        if(appConfig.pass == null || !appConfig.pass){
                            exec(appName, normalRumTime);
                        }
                    }
                } catch (error) {
                    toastLog(appName +" 执行出错，已自动跳过："+error);
                }
            }
        }else{
            sleep(1000*60*30);//睡眠半个小时
        }
    }
}

//执行脚本
function exec(scriptName,seconds){
    //自动获取脚本更新
    updateScript(scriptName);

    //开始执行
    var startDate = new Date();//开始时间
    var exectuion = engines.execScriptFile("/sdcard/脚本/"+scriptName+".js");

    //计时器，检测时间
    var isIExec = true;
    while(isIExec){
        //睡眠30s
        sleep(30*1000);

        //计时
        var runSeconds = ((new Date().getTime()) - startDate.getTime())/1000;
        toast(scriptName+"已执行"+runSeconds +"秒");
        if(runSeconds >  seconds){
            isIExec = false; 
        }

        //检测当前执行的任务是否已经完成,如果发现只有一个进程，则跳转到下一个
        if(engines.all().length < 2){
            return;
        }
    }
    //停止脚本
    stopCurrent(exectuion);
}

//停止当前脚本
function stopCurrent(exectuion){
    //停止执行，回到主页面
    toast("停止执行");
    exectuion.getEngine().forceStop();

    //释放内存
    sleep(2000);
    home();
    sleep(5000);
    recents();
    sleep(2000);
    id("clearAnimView").findOnce().click();
    sleep(2000);
    back();
}

/**
 * =========================
 * 脚本自动更新
 * =========================
 */

//获取主配置
function getConfig(key,defaultValue){
    try {
        return http.get(server_url+"config/getConfig?key="+key).body.string();
    } catch (error) {
        toastLog("获取主配置失败:",error);
        return defaultValue;
    }
}

//获取应用配置
function getAppConfig(appName){
    try {
        var deviceCode = device.getAndroidId();
        var str = http.get(server_url+"config/getAppConfig?deviceCode="+deviceCode+"&appName="+appName);
        return JSON.parse(str.body.string());
    } catch (error) {
        toastLog("获取app配置失败");
        return null;
    }
}

//更新所有的脚本
function updateAllScript(){
    toast("开始更新全部脚本");

    //所有的列表
    var allList = http.get(server_url+"app/listApp").body.string();
    allList = JSON.parse(allList);

    //全部更新
    for(var i = 0;i < allList.length;i++){
        updateScript(allList[i].appName);
    }
    toast("全部脚本已更新");
}

//更新脚本
function updateScript(scriptName){
    try {
        var path = "/sdcard/脚本/"+scriptName+".js";//文件路径
        var scriptContent = http.get(git_url+scriptName+".js").body.string();//远程获取文件内容
        files.write(path,scriptContent);
        return true;
    } catch (error) {
        toastLog(scriptName+" 更新失败！"+error)
    }
}

