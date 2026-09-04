var meta = [];

var tasktype = [{ "k": 1, "v": "Study", "p": 0, "m": "study.png" },
{ "k": 2, "v": "Sport", "p": 0, "m": "sport.png" },
{ "k": 3, "v": "Entertain", "p": 0, "m": "entertainment.png" },
{ "k": 4, "v": "Work", "p": 0, "m": "work.png" },
{ "k": 5, "v": "Health", "p": 0, "m": "sport.png" },
{ "k": 6, "v": "Sleep", "p": 0, "m": "study.png" },
{ "k": 7, "v": "Other", "p": 0, "m": "work.png" }
];

var frequency = [{ "k": "day", "v": "Daily" }, { "k": "week", "v": "Weekly" }, { "k": "month", "v": "Monthly" }, { "k": "one", "v": "Date" }];

var goalSts = [{ "k": "C", "v": "Ready" }, { "k": "R", "v": "Running" }, { "k": "O", "v": "Completed" }, { "k": "A", "v": "Archive" }];

var goalBreak = [{ "k": "0", "v": "Unbreakable" }, { "k": "1", "v": "Breakable" }];

var goalSel = [{ "k": "1", "v": "All Sub Goals" }, { "k": "0", "v": "Only This" }];
meta.push({ "id": "uname", "att": [{ "lbl": "user name", "placeholer": "please input user name." }] });

var weekOptions = { "*": "All", "0": "Sun", "1": "Mon", "2": "Tues", "3": "Wed", "4": "Thurs", "5": "Fri", "6": "Sat" };
var cycleUnitMap = {
  "DAY": "Daily",
  "WEEK": "Weekly",
  "MONTH": "Monthly",
  "YEAR": "Annually",
  "ONE": "Date"
};

var anniSample = {
  "markDate": "Date",
  "dateName": "Name",
  "lastYears": "Time gap between two anniversaries",
  "firstYears": "Age",
  "days": "Time since the anniversary to present",
  "memo": "Memo",
  "nextDays": "Days left until the anniversary"
}

var promptLines =
 [
    "Please summarize the following content:\n",
    "1. Count the number of tasks, number of action items, and related time data. If any recorded values exist, also analyze them according to the statistical method.",
    "2. List the core tasks completed.",
    "3. Summarize key information from notes.",
    "4. Provide a brief evaluation."
];


var lanMap = {
  "KEYWORD": "Keyword",
  "ALL": "All",
  /**plan/add.html**/
  "MYTIME": "MyTime",
  "DEL": "Delete",
  "LOG": "Log",
  "LOGGED": "Has Checkin",
  "NOLOG": "No Checkin",
  "CONFIRMLOG": "Log",
  "MEMO": "Memo",
  "WARNING": "Warning",
  "LOGTIPS": "You can only log a task for each day,if log more,the last will be taken.",
  "SAVE": "Save",
  "SAVETASK": "Save Task",
  "LOGLST": "Logged",
  "CLOSE": "Close",
  "EVERYYEAR": "Annual",
  "EVERYDAY": "Daily",
  "EVERYWEEK": "Week",
  "EVERYMONTH": "Month",
  "QUARTER": "Quarter",
  "YEAR": "Year",
  "ONGOING": "Running",
  "ONCOMING": "Coming",
  "COMPLETE": "Over",
  "HOUR": "Hr.",
  "TOTALLY": "",
  "EQUALS": "Equals",
  "TTLOG": "Total Checkin ",
  "SPEND": "Spend",
  "DAYS": "Days",
  "MINUTE": "Min.",
  "SECOND": "sec.",
  "TODAYLEFT": "Today Left",
  "MIN": "Min.",
  "TITLE": "title",
  "URL": "url",
  "TIPS": "tips",
  "NOLOGTIP": "NoCheckin",
  "LASTDAY": "Yest.",
  "TODAY": "Tod.",
  "RECORD": "Records",
  "SEARCHED": "Searched",
  "CONFIRMDELETE": "Confirm Delete?",
  "WEEK": ["Sun.", "Mon.", "Tues", "Wed.", "Thur.", "Fri.", "Sat."],
  "LOGSUCC": "logged success.",
  /**index.html**/
  "AD": "welcome to dadadida.cn,exchange ideas of time management.",
  "TASKDIST": "Task Distribution",
  "TASKSTAT": "Task Spend Statistics",
  "TOTALSPEND": "Spend(Hours)",
  "AVGSPEND": "Avg(Hours)",
  "DAYS": "Days",
  "GOALOV": "Goal Overview",
  "TIMEDIST": "Time Distribution",
  "SLOGAN1": "Selfdiscipline is the road to Freedom.",
  "SLOGAN2": "Teamwork makes road easier to go.",
  "SLOGAN3": "Ad.",
  "MOREIDX": "More",
  "HELP": "Help",
  "ALL": "All",
  "LIVEON": "You have lived on earth for",
  "LEFT": "Left",
  "PRELIFE": "Live To",
  "BIRTH": "Birth",
  /**goal/import**/
  "IMPORTGOAL": "Import Goal",
  "IMPORT": "Import",
  /**goal/index**/
  "NEWGOAL": "NewGoal",/**保持长度一致**/
  "NEWTASK": "NewTask",/**保持长度一致**/
  "RECGOAL": "HisGoal",
  "GETGOAL": "GetGoal",
  "MYGOAL": "MyGoal",
  "MYTASK": "MyTask",
  "ENERGY": "EnergyIdx",
  "FINANCE": "Finance",
  "MONEYIDX": "AssetStat",
  "TIMEIDX": "TimeStat",
  /**goal/add**/
  "QR": "QRCode",
  "WXSHR": "WXShare",
  "MNAME": "Who in Charge",
  "PTARGET": "Parent Target",
  "ADDSUB": "Add Sub Target",
  "TARGET": "Target",
  "PLAN": "Plan",
  "ACTUAL": "Actual",
  "STARGET": "Sub",
  "TASKREL": "TaskRel.",
  "RELTASK": "RelateTask",
  "PSD": "Plan Start Date (yyyyMMdd)",
  "ASD": "Actual Start Date (yyyyMMdd)",
  "PFD": "Plan Finished Date(yyyyMMdd)",
  "AFD": "Actual Finished Date(yyyyMMdd)",
  "REFRESH": "Refresh",
  "PE": "Plan Efforts(Hours)",
  "AE": "Actual Efforts(Hours)",
  /**goal.overview**/
  "LSTSHOW": "Show in List",
  "TREESHOW": "Show in Tree",
  /**goal.recv.**/
  "IMPORTALL": "All Import",
  "ISUCCESS": "Import Success",
  "REIMPORT": "Re-import",
  "HELLO": "Hello",
  "NOLOGINTIP": "<br/>\nYou haven't logined yet,<br/>\nYou can tell your sender your temp user name,it's 【",
  "WAITING": "waiting to connected to server.",
  "RECEIVING": "Receiving...",
  /***goal.send**/
  "ONLINEREC": "enter receiver's name,make sure his online.",
  /**goal.mine**/
  "SEND": "Send",
  /**social.energy**/
  "IENERGY": "ENERGY INDEX",
  "IETIP": "From your checkin",
  "TASKLINE": "Spent time on task daily",
  "TASKDES": "Spent time on task daily",
  "TODAYTASK": "TodayTask",
  "LOGTODAY": "TodayCheckin",
  "MOREFUNC": "more functions",
  "MORETPL": "more templates",
  "ONLINEVER": "Online ver.",
  "MODULE": "Module",
  "CUSTOMMODULE": "Custom module",
  "STRENGTH": "Enhanced",
  "UPGRADE": "Upgrade",
  "DOWNTIPS": "Restart the app after downloading for the changes to take  effect.",
  "LOGINTIPS": "Log in to view more features.",
  "GOUPDATE": "Update",
  "VIEW": "View",
  "INSTALLABLE": "Installable",
  "UPGRADABLE": "Upgradable",
  "INSTALLED": "Installed",
  "DOWNLOAD": "Download",
  "TIPSTITLE": "Tips",
  "CONFIRM": "Confirm",
  "PURCHASE": "Purchase",
  "ONEWEEK": "Week",
  "BIWEEK": "Biweek",
  "MONTH": "Month",
  "TASKTPL": "Task Template",
  "TPLTIPS": "You can quickly create tasks based on templates.",
  "DETAIL": "Detail",
  "USE": "Use",
  "ANNIVERSARY": "Anniversary",
  "ANNI_NAME": "Name",
  "ANNI_DAY": "Date",
  "MEMO": "Memo",
  "ANNIHEAD": "Milestone in Life <small>Key Progress · Review the Journey</small>",
  "CREATE": "New",
  "DAYAGO": " days ago",
  "DAYAFTER": " days after",
  "TODAY": "Tod.",
  "YEARMOMENT": " anniversary",
  "TODAYIS": "🎖🎖🎖Today is ",
  "TIMETIPS": "🎖<i class='text-success'>#nextDays#</i> days left until the <i class='text-danger'>#anniYear#(th)</i>  anniversary",
  "UNITYEAR": "y.",
  "UNITMONTH": "m.",
  "UNITDAY": "d",
  "TASK": "Task",
  "DATERANGE": "Date Range",
  "PROMPT": "Prompt",
  "APIKEYTIPS": "No API key → visit site & paste. Manual if not auto.",
  "AITIPS": "Click [AI Summary] to agree to upload data to DeepSeek.",
  "AISUM": "AI Summary",
  "EXPORTDATA": "Export Data",
  "SUMMARYCONTENT": "Summary Content",
  "NORECORDTIPS":"No Record",
  "FIRSTTASK":"My First Task<br/>Rest on time every day.",
  "EVEREST":"Evening rest",
  "NEWTASK":"CreateTask",
 "CANCEL":"Cancel",
 "AFTERTASK":"💐 Successfully added. Go to record time?",
 "SELFSETTING":"Setting"

};
