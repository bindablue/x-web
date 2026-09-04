var meta = [];

var tasktype = [{ "k": 1, "v": "学习", "p": 0, "m": "study.png" },
{ "k": 2, "v": "运动", "p": 0, "m": "sport.png" },
{ "k": 3, "v": "娱乐", "p": 0, "m": "entertainment.png" },
{ "k": 4, "v": "工作", "p": 0, "m": "work.png" },
{ "k": 5, "v": "健康", "p": 0, "m": "sport.png" },
{ "k": 6, "v": "睡眠", "p": 0, "m": "study.png" },
{ "k": 7, "v": "其他", "p": 0, "m": "work.png" }
];
var frequency = [{ "k": "day", "v": "每天" }, { "k": "week", "v": "每周" }, { "k": "month", "v": "每月" }, { "k": "one", "v": "日期" }];
var goalSts = [{ "k": "C", "v": "准备中" }, { "k": "R", "v": "进行中" }, { "k": "O", "v": "完成" }, { "k": "A", "v": "归档" }, { "k": "D", "v": "删除" }];
var goalBreak = [{ "k": "0", "v": "不可分解" }, { "k": "1", "v": "可分解" }];
var goalSel = [{ "k": "1", "v": "包括子目标" }, { "k": "0", "v": "不包括子目标" }];
meta.push({ "id": "uname", "att": [{ "lbl": "用户名", "placeholer": "请输入用户名" }] });

var weekOptions = { "*": "全部", "0": "周日", "1": "周一", "2": "周二", "3": "周三", "4": "周四", "5": "周五", "6": "周六" };
var cycleUnitMap = {
    "DAY": "天",
    "WEEK": "周",
    "MONTH": "月",
    "YEAR": "年",
    "ONE": "指定日期"
};
var anniSample = {
    "markDate": "纪念日日期",
    "dateName": "纪念日名称",
    "lastYears": "两个纪念日时间差",
    "firstYears": "年龄",
    "days": "距今时间",
    "memo": "备注",
    "nextDays": "距离周年剩余日期"
}

var promptLines =
    ["请对以下内容进行总结：\n",
        "1. 统计任务数、事项数及相关时间数据，如有记录值也请按照统计方式进行分析\n",
        "2. 列出完成的核心事项；",
        "3. 汇总备注关键信息；",
        "4. 给出简短评价；"];

var lanMap = {
    "ALL": "全部",
    "MYTIME": "我的时间",
    "KEYWORD": "关键字",
    /**plan/add.html**/
    "DEL": "删除",
    "LOG": "打卡",
    "LOGGED": "已打卡",
    "NOLOG": "未打卡",
    "SAVE": "保存",
    "SAVETASK": "保存任务信息",
    "LOGLST": "打卡记录",
    "MINUTE": "分钟",
    "MIN": "分",
    "SEARCHED": "已查询",
    "RECORD": "记录",
    "CONFIRMDELETE": "是否确认删除?",
    "WEEK": ["日", "一", "二", "三", "四", "五", "六"],
    "LOGSUCC": "打卡成功。",
    /**index.html**/
    "TASKDIST": "任务分布",
    "TASKSTAT": "任务耗时统计",
    "TOTALSPEND": "总耗(时)",
    "AVGSPEND": "平均(时)",
    "DAYS": "天",
    "GOALOV": "目标总览",
    "ONGOING": "正在进行",
    "ONCOMING": "即将开始",
    "COMPLETE": "已经完成",
    "EVERYYEAR": "年",
    "TIMEDIST": "时间分配",
    /**goal/add.html**/
    "REFRESH": "刷新",
    /**goal/index**/
    "NEWGOAL": "新建目标",/**保持长度一致**/
    "NEWTASK": "新建任务",/**保持长度一致**/
    "RECGOAL": "无源目标",
    "GETGOAL": "接收目标",
    "MYGOAL": "我的目标",
    "MYTASK": "我的任务",
    "TIMEIDX": "时间指数",
    /***recv.html**/
    "ISUCCESS": "导入成功",
    "REIMPORT": "重新导入",
    "IMPORT": "导入",
    "HELLO": "你好",
    "NOLOGINTIP": "<br/>\n你尚未登录，<br/>\n,可告知发送者你的临时用户名。您的临时用户名为【",
    "RECEIVING": "接收中...",
    /**goal.mine**/
    "SEND": "发送",
    /**social.energy**/
    "IENERGY": "能力发展指数",
    "IETIP": "来自您的每一次用心打卡",
    "TASKLINE": "任务时间曲线",
    "TASKLINEDES": "",
    "TODAYTASK": "今日任务",
    "LOGTODAY": "每日打卡",
    "MOREFUNC": "更多功能",
    "MORETPL": "更多模板",
    "ONLINEVER": "在线版入口",
    "MODULE": "功能",
    "CUSTOMMODULE": "定制功能",
    "STRENGTH": "增强",
    "UPGRADE": "升级",
    "DOWNTIPS": "下载后重启应用生效",
    "LOGINTIPS": "登录查看更多功能",
    "VIEW": "查看",
    "INSTALLABLE": "可安装",
    "UPGRADABLE": "可升级",
    "INSTALLED": "已安装",
    "DOWNLOAD": "下载",
    "TIPSTITLE": "提示",
    "CONFIRM": "确认",
    "PURCHASE": "购买",
    "ONEWEEK": "周",
    "BIWEEK": "两周",
    "MONTH": "月",
    "TASKTPL": "任务模板",
    "TPLTIPS": "您可以基于模板快捷创建任务",
    "DETAIL": "详情",
    "USE": "使用",
    "ANNIVERSARY": "纪念日",
    "ANNI_NAME": "纪念日名称",
    "ANNI_DAY": "纪念日日期",
    "MEMO": "备注",
    "ANNIHEAD": "人生重要时刻 <small>关键进展 · 回顾征程</small>",
    "CREATE": "新增",
    "DAYAGO": "天前",
    "DAYAFTER": "天后",
    "TODAY": "今天",
    "YEARMOMENT": "周年纪念日",
    "TODAYIS": "🎖🎖🎖今天是",
    "TIMETIPS": "🎖距离<i class='text-danger'>#anniYear#周年</i>纪念日还有<i class='text-success'>#nextDays#</i>天",
    "UNITYEAR": "年",
    "UNITMONTH": "月",
    "UNITDAY": "日",
    "TASK": "任务",
    "DATERANGE": "日期范围",
    "PROMPT": "自定义指令",
    "APIKEYTIPS": "无apikey：跳转官网，粘贴到输入框。未自动粘贴则手动。",
    "AITIPS": "点击【AI总结】即同意数据上传至DeepSeek。",
    "AISUM": "AI总结",
    "EXPORTDATA": "导出记录",
    "SUMMARYCONTENT": "总结内容",
    "NORECORDTIPS":"无记录，无法分析结果。",
    "FIRSTTASK":"创建我的第一条任务<br/>【每天按时休息】",
    "EVEREST":"晚休",
    "NEWTASK":"添加任务",
    "CANCEL":"取消",
    "AFTERTASK":"💐 恭喜 添加成功，是否前往记录时间？",
    "SELFSETTING":"自定义设置"


};
