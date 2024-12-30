/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/core/library","sap/ui/core/Item","./DynamicDateOption","./Label","./RadioButton","./Select","./VBox","sap/ui/core/date/UniversalDateUtils","sap/ui/core/date/UniversalDate","sap/ui/core/date/UI5Date","sap/m/DynamicDateValueHelpUIType","./library"],function(e,t,a,s,r,n,T,E,D,A,S,c,i){"use strict";var R=t.VerticalAlign;var o=s.extend("sap.m.StandardDynamicDateOption",{metadata:{library:"sap.m",properties:{calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null}}}});var l=1;var N=6e3;var g={DATE:"DATE",DATETIME:"DATETIME",DATERANGE:"DATERANGE",DATETIMERANGE:"DATETIMERANGE",TODAY:"TODAY",YESTERDAY:"YESTERDAY",TOMORROW:"TOMORROW",SPECIFICMONTH:"SPECIFICMONTH",SPECIFICMONTHINYEAR:"SPECIFICMONTHINYEAR",FIRSTDAYWEEK:"FIRSTDAYWEEK",LASTDAYWEEK:"LASTDAYWEEK",FIRSTDAYMONTH:"FIRSTDAYMONTH",LASTDAYMONTH:"LASTDAYMONTH",FIRSTDAYQUARTER:"FIRSTDAYQUARTER",LASTDAYQUARTER:"LASTDAYQUARTER",FIRSTDAYYEAR:"FIRSTDAYYEAR",LASTDAYYEAR:"LASTDAYYEAR",THISWEEK:"THISWEEK",THISMONTH:"THISMONTH",THISQUARTER:"THISQUARTER",THISYEAR:"THISYEAR",LASTWEEK:"LASTWEEK",LASTMONTH:"LASTMONTH",LASTQUARTER:"LASTQUARTER",LASTYEAR:"LASTYEAR",NEXTWEEK:"NEXTWEEK",NEXTMONTH:"NEXTMONTH",NEXTQUARTER:"NEXTQUARTER",NEXTYEAR:"NEXTYEAR",LASTMINUTES:"LASTMINUTES",LASTHOURS:"LASTHOURS",LASTDAYS:"LASTDAYS",LASTWEEKS:"LASTWEEKS",LASTMONTHS:"LASTMONTHS",LASTQUARTERS:"LASTQUARTERS",LASTYEARS:"LASTYEARS",NEXTMINUTES:"NEXTMINUTES",NEXTHOURS:"NEXTHOURS",NEXTDAYS:"NEXTDAYS",NEXTWEEKS:"NEXTWEEKS",NEXTMONTHS:"NEXTMONTHS",NEXTQUARTERS:"NEXTQUARTERS",NEXTYEARS:"NEXTYEARS",LASTMINUTESINCLUDED:"LASTMINUTESINCLUDED",LASTHOURSINCLUDED:"LASTHOURSINCLUDED",LASTDAYSINCLUDED:"LASTDAYSINCLUDED",LASTWEEKSINCLUDED:"LASTWEEKSINCLUDED",LASTMONTHSINCLUDED:"LASTMONTHSINCLUDED",LASTQUARTERSINCLUDED:"LASTQUARTERSINCLUDED",LASTYEARSINCLUDED:"LASTYEARSINCLUDED",NEXTMINUTESINCLUDED:"NEXTMINUTESINCLUDED",NEXTHOURSINCLUDED:"NEXTHOURSINCLUDED",NEXTDAYSINCLUDED:"NEXTDAYSINCLUDED",NEXTWEEKSINCLUDED:"NEXTWEEKSINCLUDED",NEXTMONTHSINCLUDED:"NEXTMONTHSINCLUDED",NEXTQUARTERSINCLUDED:"NEXTQUARTERSINCLUDED",NEXTYEARSINCLUDED:"NEXTYEARSINCLUDED",FROM:"FROM",TO:"TO",FROMDATETIME:"FROMDATETIME",TODATETIME:"TODATETIME",YEARTODATE:"YEARTODATE",DATETOYEAR:"DATETOYEAR",TODAYFROMTO:"TODAYFROMTO",QUARTER1:"QUARTER1",QUARTER2:"QUARTER2",QUARTER3:"QUARTER3",QUARTER4:"QUARTER4"};var u={SingleDates:1,DateRanges:2,Weeks:3,Months:4,Quarters:5,Years:6};var I={DATE:u.SingleDates,DATETIME:u.SingleDates,DATERANGE:u.DateRanges,DATETIMERANGE:u.DateRanges,TODAY:u.SingleDates,YESTERDAY:u.SingleDates,TOMORROW:u.SingleDates,SPECIFICMONTH:u.Months,SPECIFICMONTHINYEAR:u.Months,FIRSTDAYWEEK:u.SingleDates,LASTDAYWEEK:u.SingleDates,FIRSTDAYMONTH:u.SingleDates,LASTDAYMONTH:u.SingleDates,FIRSTDAYQUARTER:u.SingleDates,LASTDAYQUARTER:u.SingleDates,FIRSTDAYYEAR:u.SingleDates,LASTDAYYEAR:u.SingleDates,THISWEEK:u.Weeks,THISMONTH:u.Months,THISQUARTER:u.Quarters,THISYEAR:u.Years,LASTWEEK:u.Weeks,LASTMONTH:u.Months,LASTQUARTER:u.Quarters,LASTYEAR:u.Years,NEXTWEEK:u.Weeks,NEXTMONTH:u.Months,NEXTQUARTER:u.Quarters,NEXTYEAR:u.Years,LASTMINUTES:u.DateRanges,LASTHOURS:u.DateRanges,LASTDAYS:u.DateRanges,LASTWEEKS:u.DateRanges,LASTMONTHS:u.DateRanges,LASTQUARTERS:u.DateRanges,LASTYEARS:u.DateRanges,NEXTMINUTES:u.DateRanges,NEXTHOURS:u.DateRanges,NEXTDAYS:u.DateRanges,NEXTWEEKS:u.DateRanges,NEXTMONTHS:u.DateRanges,NEXTQUARTERS:u.DateRanges,NEXTYEARS:u.DateRanges,LASTMINUTESINCLUDED:u.DateRanges,LASTHOURSINCLUDED:u.DateRanges,LASTDAYSINCLUDED:u.DateRanges,LASTWEEKSINCLUDED:u.DateRanges,LASTMONTHSINCLUDED:u.DateRanges,LASTQUARTERSINCLUDED:u.DateRanges,LASTYEARSINCLUDED:u.DateRanges,NEXTMINUTESINCLUDED:u.DateRanges,NEXTHOURSINCLUDED:u.DateRanges,NEXTDAYSINCLUDED:u.DateRanges,NEXTWEEKSINCLUDED:u.DateRanges,NEXTMONTHSINCLUDED:u.DateRanges,NEXTQUARTERSINCLUDED:u.DateRanges,NEXTYEARSINCLUDED:u.DateRanges,FROM:u.DateRanges,TO:u.DateRanges,FROMDATETIME:u.DateRanges,TODATETIME:u.DateRanges,YEARTODATE:u.DateRanges,DATETOYEAR:u.DateRanges,TODAYFROMTO:u.DateRanges,QUARTER1:u.Quarters,QUARTER2:u.Quarters,QUARTER3:u.Quarters,QUARTER4:u.Quarters};var L=["LASTMINUTES","LASTHOURS","LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS"];var U=["NEXTMINUTES","NEXTHOURS","NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS"];var O=["LASTMINUTESINCLUDED","LASTHOURSINCLUDED","LASTDAYSINCLUDED","LASTWEEKSINCLUDED","LASTMONTHSINCLUDED","LASTQUARTERSINCLUDED","LASTYEARSINCLUDED"];var p=["NEXTMINUTESINCLUDED","NEXTHOURSINCLUDED","NEXTDAYSINCLUDED","NEXTWEEKSINCLUDED","NEXTMONTHSINCLUDED","NEXTQUARTERSINCLUDED","NEXTYEARSINCLUDED"];o.LastXKeys=L.concat(O);o.NextXKeys=U.concat(p);var M=e.getResourceBundleFor("sap.m");o.Keys=g;o.prototype.exit=function(){if(this.aValueHelpUITypes){while(this.aValueHelpUITypes.length){this.aValueHelpUITypes.pop().destroy()}delete this.aValueHelpUITypes}};o.prototype.getText=function(e){var t=this.getKey();var a=e._getOptions();var s=this.getValueHelpUITypes(e);var r=this._getOptionParams(L,a);var n=this._getOptionIncludedParams(O,a);var T=this._getOptionParams(U,a);var E=this._getOptionIncludedParams(p,a);if(r){s.push(r)}if(n){s.push(n)}if(T){s.push(T)}if(E){s.push(E)}switch(t){case g.LASTMINUTES:case g.LASTHOURS:case g.LASTDAYS:case g.LASTWEEKS:case g.LASTMONTHS:case g.LASTQUARTERS:case g.LASTYEARS:case g.NEXTMINUTES:case g.NEXTHOURS:case g.NEXTDAYS:case g.NEXTWEEKS:case g.NEXTMONTHS:case g.NEXTQUARTERS:case g.NEXTYEARS:case g.LASTMINUTESINCLUDED:case g.LASTHOURSINCLUDED:case g.LASTDAYSINCLUDED:case g.LASTWEEKSINCLUDED:case g.LASTMONTHSINCLUDED:case g.LASTQUARTERSINCLUDED:case g.LASTYEARSINCLUDED:case g.NEXTMINUTESINCLUDED:case g.NEXTHOURSINCLUDED:case g.NEXTDAYSINCLUDED:case g.NEXTWEEKSINCLUDED:case g.NEXTMONTHSINCLUDED:case g.NEXTQUARTERSINCLUDED:case g.NEXTYEARSINCLUDED:return this._getXPeriodTitle(s[1].getOptions());case g.FROMDATETIME:case g.TODATETIME:case g.DATETIMERANGE:return e._findOption(t)._bAdditionalTimeText?M.getText("DYNAMIC_DATE_"+t+"_TITLE")+" ("+M.getText("DYNAMIC_DATE_DATETIME_TITLE")+")":M.getText("DYNAMIC_DATE_"+t+"_TITLE");default:return M.getText("DYNAMIC_DATE_"+t+"_TITLE")}};o.prototype.getValueHelpUITypes=function(e){var t=this.getKey();if(!this.aValueHelpUITypes){switch(t){case g.TODAY:case g.YESTERDAY:case g.TOMORROW:case g.FIRSTDAYWEEK:case g.LASTDAYWEEK:case g.FIRSTDAYMONTH:case g.LASTDAYMONTH:case g.FIRSTDAYQUARTER:case g.LASTDAYQUARTER:case g.FIRSTDAYYEAR:case g.LASTDAYYEAR:case g.THISWEEK:case g.THISMONTH:case g.THISQUARTER:case g.THISYEAR:case g.LASTWEEK:case g.LASTMONTH:case g.LASTQUARTER:case g.LASTYEAR:case g.NEXTWEEK:case g.NEXTMONTH:case g.NEXTQUARTER:case g.NEXTYEAR:case g.YEARTODATE:case g.DATETOYEAR:case g.QUARTER1:case g.QUARTER2:case g.QUARTER3:case g.QUARTER4:this.aValueHelpUITypes=[];break;case g.DATETIME:case g.FROMDATETIME:case g.TODATETIME:this.aValueHelpUITypes=[new c({type:"datetime"})];break;case g.DATE:case g.FROM:case g.TO:this.aValueHelpUITypes=[new c({type:"date"})];break;case g.DATERANGE:this.aValueHelpUITypes=[new c({type:"daterange"})];break;case g.SPECIFICMONTH:this.aValueHelpUITypes=[new c({type:"month"})];break;case g.SPECIFICMONTHINYEAR:this.aValueHelpUITypes=[new c({type:"custommonth"})];break;case g.LASTMINUTES:case g.LASTHOURS:case g.LASTDAYS:case g.LASTWEEKS:case g.LASTMONTHS:case g.LASTQUARTERS:case g.LASTYEARS:case g.NEXTMINUTES:case g.NEXTHOURS:case g.NEXTDAYS:case g.NEXTWEEKS:case g.NEXTMONTHS:case g.NEXTQUARTERS:case g.NEXTYEARS:case g.LASTMINUTESINCLUDED:case g.LASTHOURSINCLUDED:case g.LASTDAYSINCLUDED:case g.LASTWEEKSINCLUDED:case g.LASTMONTHSINCLUDED:case g.LASTQUARTERSINCLUDED:case g.LASTYEARSINCLUDED:case g.NEXTMINUTESINCLUDED:case g.NEXTHOURSINCLUDED:case g.NEXTDAYSINCLUDED:case g.NEXTWEEKSINCLUDED:case g.NEXTMONTHSINCLUDED:case g.NEXTQUARTERSINCLUDED:case g.NEXTYEARSINCLUDED:this.aValueHelpUITypes=[new c({text:M.getText("DDR_LASTNEXTX_LABEL"),type:"int"})];break;case g.TODAYFROMTO:this.aValueHelpUITypes=[new c({text:M.getText("DDR_TODAYFROMTO_FROM_LABEL"),type:"int",additionalText:M.getText("DDR_TODAYFROMTO_TO_ADDITIONAL_LABEL")}),new c({text:M.getText("DDR_TODAYFROMTO_TO_LABEL"),type:"int",additionalText:M.getText("DDR_TODAYFROMTO_TO_ADDITIONAL_LABEL")})];break;case g.DATETIMERANGE:this.aValueHelpUITypes=[new c({text:M.getText("DDR_DATETIMERANGE_FROM_LABEL"),type:"datetime"}),new c({text:M.getText("DDR_DATETIMERANGE_TO_LABEL"),type:"datetime"})];break}}return this.aValueHelpUITypes.slice(0)};o.prototype.createValueHelpUI=function(e,t){var a=e._getOptions(),s=e.getValue()&&Object.assign({},e.getValue()),n=this.getValueHelpUITypes(e),T=[],E,D=e.getCalendarWeekNumbering();if(!e.aControlsByParameters){e.aControlsByParameters={}}e.aControlsByParameters[this.getKey()]=[];var A=this._getOptionParams(L,a);var S=this._getOptionIncludedParams(O,a);var c=this._getOptionParams(U,a);var i=this._getOptionIncludedParams(p,a);if(A){n.push(A)}if(S){n.push(S)}if(c){n.push(c)}if(i){n.push(i)}if(s&&s.values){s.values=s.values.map(function(e){return e})}for(var o=0;o<n.length;o++){E=null;if(n[o].getOptions()&&n[o].getOptions().length<=1&&n[o].getOptions().indexOf("included")!==-1){break}else if(n[o].getText()){E=new r({text:n[o].getText(),width:"100%"});T.push(E)}var l;switch(n[o].getType()){case"int":l=this._createIntegerControl(s,o,t);var N=s&&n[1]&&n[1].getOptions()&&(n[1].getOptions().indexOf(s.operator.slice(4).toLowerCase())!==-1||n[1].getOptions().indexOf(s.operator.slice(4).toLowerCase().replace("included",""))!==-1);if(N){l.setValue(s.values[o])}break;case"date":l=this._createDateControl(s,o,t,D);break;case"datetime":if(n.length===1){l=this._createDateTimeInnerControl(s,o,t,D)}else if(n.length===2){l=this._createDateTimeControl(s,o,t,D)}break;case"daterange":l=this._createDateRangeControl(s,o,t,D);break;case"month":l=this._createMonthControl(s,o,t);break;case"custommonth":l=this._createCustomMonthControl(s,o,t);break;case"options":l=this._createOptionsControl(s,o,t,n);break;case"included":l=this._createIncludedControl(s,t);break;default:break}T.push(l);E&&E.setLabelFor(l);if(n[o].getAdditionalText()){T.push(new r({vAlign:R.Bottom,text:n[o].getAdditionalText()}).addStyleClass("sapMDDRAdditionalLabel"))}e.aControlsByParameters[this.getKey()].push(l)}return T};o.prototype._createIntegerControl=function(e,t,a){var r=s.prototype._createIntegerControl.call(this,e,t,a);var n=this.getKey()==="TODAYFROMTO"?-N:l;var T=!e||this.getKey()!==e.operator;if(T){r.setValue(1)}r.setMin(n);r.setMax(N);return r};o.prototype._createOptionsControl=function(e,t,a,s){const r=s[t].getOptions();const n=r.map(function(e){let t=e;if(t.indexOf("included")!==-1){t=t.replace("included","")}if(r.indexOf(e)!==-1&&r.indexOf(t)!==-1&&t!==e){return""}return t.toUpperCase()});const E=n.filter(function(e){return e!==""});var D=new T({items:[E.map(Y)]});D.setSelectedKey(D.getAggregation("items")[0].getKey());if(e){const a=s[t].getOptions();for(let e=0;e<a.length;e++){if(a[e].indexOf("included")!==-1){a[e]=a[e].replace("included","")}const t=a.lastIndexOf(a[e]);if(e!==t){a.splice(t,1)}}var A=e.operator.slice(4).replace("INCLUDED",""),S=a.indexOf(A?.toLowerCase());if(S!==-1){D.setSelectedKey(A)}}if(a instanceof Function){D.attachChange(function(){a(this)},this)}return D};o.prototype._createIncludedControl=function(e,t){const a=new n({text:M.getText("DDR_LASTNEXTX_INCLUDE_LABEL"),groupName:`includedSelection-${this.getKey()}`});const s=new n({text:M.getText("DDR_LASTNEXTX_EXCLUDE_LABEL"),selected:true,groupName:`includedSelection-${this.getKey()}`});const T=new E({items:[s,new r({text:"",wrapping:true}),a,new r({text:"",wrapping:true})]});if(e&&e.operator.indexOf("INCLUDED")>-1){a.setSelected(true)}else{s.setSelected(true)}this._oInternalIncludedControl=T;if(t instanceof Function){a.attachSelect(function(){t(this)},this);s.attachSelect(function(){t(this)},this)}return T};o.prototype._getOptionParams=function(e,t){if(e.indexOf(this.getKey())!==-1){return new c({text:M.getText("DDR_LASTNEXTX_TIME_UNIT_LABEL"),type:"options",options:t?t.filter(function(t){return e.indexOf(t.getKey())!==-1||e.indexOf(t.getKey().replace("INCLUDED",""))!==-1}).map(function(e){return e.getKey().slice(4).toLowerCase()}):[]})}return undefined};o.prototype._getOptionIncludedParams=function(e,t){if(e.indexOf(this.getKey()+"INCLUDED")!==-1){return new c({text:M.getText("DDR_LASTNEXTX_TIME_PERIODS_LABEL"),type:"included",options:t?t.filter(function(t){return e.indexOf(t.getKey())!==-1}).map(function(e){return e.getKey().slice(4).toLowerCase()}):[]})}if(e.indexOf(this.getKey())!==-1){return new c({text:M.getText("DDR_LASTNEXTX_TIME_UNIT_LABEL"),type:"options",options:t?t.filter(function(t){return e.indexOf(t.getKey())!==-1}).map(function(e){return e.getKey().replace("INCLUDED","").slice(4).toLowerCase()}):[]})}return undefined};o.prototype.validateValueHelpUI=function(e){var t=this.getValueHelpUITypes();for(var a=0;a<t.length;a++){var s=e.aControlsByParameters[this.getKey()][a];switch(t[a].getType()){case"int":if(s._isLessThanMin(s.getValue())||s._isMoreThanMax(s.getValue())){return false}break;case"month":case"custommonth":case"date":case"daterange":if(!s.getSelectedDates()||s.getSelectedDates().length==0){return false}break;case"datetime":if(t.length===1){if(!s.getCalendar().getSelectedDates()||s.getCalendar().getSelectedDates().length==0){return false}}else if(!s.getDateValue()&&t.length===2){return false}break;case"options":if(s.getSelectedIndex()<0){return false}break;default:break}}return true};o.prototype.getValueHelpOutput=function(e){var t=e._getOptions();var a=this.getValueHelpUITypes(e),s=e.aControlsByParameters&&e.aControlsByParameters[this.getKey()]&&e.aControlsByParameters[this.getKey()].length>1,r=L.indexOf(this.getKey())!==-1||O.indexOf(this.getKey())!==-1,n=U.indexOf(this.getKey())!==-1||p.indexOf(this.getKey())!==-1,T={},E;if(r&&s){T.operator=t.filter(function(e){return this._shouldAddLastOrNextOption(t,e,L)}.bind(this))[e.aControlsByParameters[this.getKey()][1].getSelectedIndex()].getKey()}else if(n&&s){T.operator=t.filter(function(e){return this._shouldAddLastOrNextOption(t,e,U)}.bind(this))[e.aControlsByParameters[this.getKey()][1].getSelectedIndex()].getKey()}else{T.operator=this.getKey()}if(L.indexOf(this.getKey())!==-1||U.indexOf(this.getKey())!==-1){const t=e.getStandardOptions().indexOf(T.operator+"INCLUDED")>-1;const a=e.aControlsByParameters&&e.aControlsByParameters[this.getKey()]&&e.aControlsByParameters[this.getKey()][2]?.getItems()[2].getSelected();if(a&&t){T.operator=T.operator+"INCLUDED"}}T.values=[];if(!e.aControlsByParameters||!e.aControlsByParameters[this.getKey()]){return T}for(var D=0;D<a.length;D++){var A=e.aControlsByParameters[this.getKey()][D];switch(a[D].getType()){case"int":E=A.getValue();break;case"month":if(!A.getSelectedDates()||!A.getSelectedDates().length){return null}E=A.getSelectedDates()[0].getStartDate().getMonth();break;case"custommonth":if(!A.getSelectedDates()||!A.getSelectedDates().length){return null}E=[A.getSelectedDates()[0].getStartDate().getMonth(),A.getSelectedDates()[0].getStartDate().getFullYear()];break;case"date":if(!A.getSelectedDates().length){return null}E=A.getSelectedDates()[0].getStartDate();break;case"datetime":if(a.length===1){var S,c,i,R;i=A.getCalendar();R=A.getClocks();if(!i.getSelectedDates().length){return null}S=i.getSelectedDates()[0].getStartDate();c=R.getTimeValues();S.setHours(c.getHours(),c.getMinutes(),c.getSeconds());E=S}else if(a.length===2){if(!A.getDateValue()){return null}E=A.getDateValue()}break;case"daterange":if(!A.getSelectedDates().length){return null}var o=A.getSelectedDates()[0].getEndDate()||A.getSelectedDates()[0].getStartDate();E=[A.getSelectedDates()[0].getStartDate(),o];break;default:break}if(Array.isArray(E)){T.values=Array.prototype.concat.apply(T.values,E)}else{E!==null&&E!==undefined&&T.values.push(E)}}return T};o.prototype._shouldAddLastOrNextOption=function(e,t,a){let s=t.getKey();let r=0;if(s.indexOf("INCLUDED")!==-1){r++;s=s.replace("INCLUDED","")}for(let t=0;t<e.length;t++){if(e[t].getKey()===s){r++}}return a.indexOf(s)!==-1&&r===1};o.prototype.alignValueHelpUI=function(e){const t=L.indexOf(this.getKey())!==-1&&e.aControlsByParameters[Object.keys(e.aControlsByParameters)[0]].length>1;const a=U.indexOf(this.getKey())!==-1&&e.aControlsByParameters[Object.keys(e.aControlsByParameters)[0]].length>1;const s=t||a;if(!s){return}const r=e.aControlsByParameters[this.getKey()][1].getSelectedKey();const n=this.getKey().slice(0,4)+r.toUpperCase();const T=e.aControlsByParameters[this.getKey()][2];const E=e.aInputControls[4];const D=e.aControlsByParameters[this.getKey()][0];const A=this.toDates({operator:n+"INCLUDED",values:[D.getValue()]});const S=this.toDates({operator:n,values:[D.getValue()]});const c=e._getDatesLabelFormatter().format(A);const i=e._getDatesLabelFormatter().format(S);T?.getItems()[1].setText(i);T?.getItems()[3].setText(c);if(e.getStandardOptions().indexOf(n+"INCLUDED")!==-1&&e.getStandardOptions().indexOf(n)!==-1){T?.setVisible(true);E?.setVisible(true)}else{T?.setVisible(false);E?.setVisible(false)}};o.prototype.getGroup=function(){return I[this.getKey()]};o.prototype.getGroupHeader=function(){return M.getText("DDR_OPTIONS_GROUP_"+I[this.getKey()])};o.prototype.format=function(e,t){return t.format(e,true)};o.prototype.parse=function(e,t){return t.parse(e,this.getKey())};o.prototype.toDates=function(e,t){if(!e){return null}var a=e.operator;var s=e.values[0]||0;switch(a){case"SPECIFICMONTH":var r=new A;r.setMonth(e.values[0]);r=D.getMonthStartDate(r);return D.getRange(0,"MONTH",r);case"SPECIFICMONTHINYEAR":var r=new A;r.setMonth(e.values[0]);r.setFullYear(e.values[1]);r=D.getMonthStartDate(r);return D.getRange(0,"MONTH",r);case"DATE":return D.getRange(0,"DAY",A.getInstance(e.values[0]));case"DATETIME":var n=new A.getInstance(e.values[0]);return[n,n];case"DATERANGE":var T=A.getInstance(e.values[0]);var E=A.getInstance(e.values[1]);return[D.resetStartTime(T),D.resetEndTime(E)];case"DATETIMERANGE":var T=A.getInstance(e.values[0]);var E=A.getInstance(e.values[1]);T.setMilliseconds(0);E.setMilliseconds(999);return[T,E];case"TODAY":return D.ranges.today();case"YESTERDAY":return D.ranges.yesterday();case"TOMORROW":return D.ranges.tomorrow();case"FIRSTDAYWEEK":return D.ranges.firstDayOfWeek(t);case"LASTDAYWEEK":return D.ranges.lastDayOfWeek(t);case"FIRSTDAYMONTH":return D.ranges.firstDayOfMonth();case"LASTDAYMONTH":return D.ranges.lastDayOfMonth();case"FIRSTDAYQUARTER":return D.ranges.firstDayOfQuarter();case"LASTDAYQUARTER":return D.ranges.lastDayOfQuarter();case"FIRSTDAYYEAR":return D.ranges.firstDayOfYear();case"LASTDAYYEAR":return D.ranges.lastDayOfYear();case"THISWEEK":return D.ranges.currentWeek(t);case"THISMONTH":return D.ranges.currentMonth();case"THISQUARTER":return D.ranges.currentQuarter();case"THISYEAR":return D.ranges.currentYear();case"LASTWEEK":return D.ranges.lastWeek(t);case"LASTMONTH":return D.ranges.lastMonth();case"LASTQUARTER":return D.ranges.lastQuarter();case"LASTYEAR":return D.ranges.lastYear();case"NEXTWEEK":return D.ranges.nextWeek(t);case"NEXTMONTH":return D.ranges.nextMonth();case"NEXTQUARTER":return D.ranges.nextQuarter();case"NEXTYEAR":return D.ranges.nextYear();case"LASTMINUTES":return D.ranges.lastMinutes(s);case"LASTHOURS":return D.ranges.lastHours(s);case"LASTDAYS":return D.ranges.lastDays(s);case"LASTWEEKS":return D.ranges.lastWeeks(s,t);case"LASTMONTHS":return D.ranges.lastMonths(s);case"LASTQUARTERS":return D.ranges.lastQuarters(s);case"LASTYEARS":return D.ranges.lastYears(s);case"LASTMINUTESINCLUDED":var c=D.ranges.lastMinutes(s-1);c[0].setSeconds(0);return c;case"LASTHOURSINCLUDED":var c=D.ranges.lastHours(s-1);c[0].setMinutes(0,0);return c;case"LASTDAYSINCLUDED":var c=D.ranges.lastDays(s-1);c[1]=A.getInstance(S.getInstance());return c;case"LASTWEEKSINCLUDED":var c=D.ranges.lastWeeks(s-1,t);c[1]=A.getInstance(S.getInstance());return c;case"LASTMONTHSINCLUDED":var c=D.ranges.lastMonths(s-1);c[1]=A.getInstance(S.getInstance());return c;case"LASTQUARTERSINCLUDED":var c=D.ranges.lastQuarters(s-1);c[1]=A.getInstance(S.getInstance());return c;case"LASTYEARSINCLUDED":var c=D.ranges.lastYears(s-1);c[1]=A.getInstance(S.getInstance());return c;case"NEXTMINUTES":return D.ranges.nextMinutes(s);case"NEXTHOURS":return D.ranges.nextHours(s);case"NEXTDAYS":return D.ranges.nextDays(s);case"NEXTWEEKS":return D.ranges.nextWeeks(s,t);case"NEXTMONTHS":return D.ranges.nextMonths(s);case"NEXTQUARTERS":return D.ranges.nextQuarters(s);case"NEXTYEARS":return D.ranges.nextYears(s);case"NEXTMINUTESINCLUDED":var c=D.ranges.nextMinutes(s-1);c[1].setSeconds(59);return c;case"NEXTHOURSINCLUDED":var c=D.ranges.nextHours(s-1);c[1].setMinutes(59,59);return c;case"NEXTDAYSINCLUDED":var c=D.ranges.nextDays(s-1);c[0]=A.getInstance(S.getInstance());return c;case"NEXTWEEKSINCLUDED":var c=D.ranges.nextWeeks(s-1,t);c[0]=A.getInstance(S.getInstance());return c;case"NEXTMONTHSINCLUDED":var c=D.ranges.nextMonths(s-1);c[0]=A.getInstance(S.getInstance());return c;case"NEXTQUARTERSINCLUDED":var c=D.ranges.nextQuarters(s-1);c[0]=A.getInstance(S.getInstance());return c;case"NEXTYEARSINCLUDED":var c=D.ranges.nextYears(s-1);c[0]=A.getInstance(S.getInstance());return c;case"FROM":return[A.getInstance(e.values[0])];case"TO":return[A.getInstance(e.values[0])];case"FROMDATETIME":var r=A.getInstance(e.values[0]);r.setMilliseconds(0);return[r];case"TODATETIME":var r=A.getInstance(e.values[0]);r.setMilliseconds(999);return[r];case"YEARTODATE":return D.ranges.yearToDate();case"DATETOYEAR":return D.ranges.dateToYear();case"TODAYFROMTO":if(e.values.length!==2){return[]}var i=e.values[0];var R=e.values[1];var T=i>=0?D.ranges.lastDays(i)[0]:D.ranges.nextDays(-i)[1];var E=R>=0?D.ranges.nextDays(R)[1]:D.ranges.lastDays(-R)[0];if(T.oDate.getTime()>E.oDate.getTime()){E=[T,T=E][0]}return[D.resetStartTime(T),D.resetEndTime(E)];case"QUARTER1":return D.ranges.quarter(1);case"QUARTER2":return D.ranges.quarter(2);case"QUARTER3":return D.ranges.quarter(3);case"QUARTER4":return D.ranges.quarter(4);default:return[]}};o.prototype.enhanceFormattedValue=function(){switch(this.getKey()){case"TODAY":case"YESTERDAY":case"TOMORROW":case"FIRSTDAYWEEK":case"LASTDAYWEEK":case"FIRSTDAYMONTH":case"LASTDAYMONTH":case"FIRSTDAYQUARTER":case"LASTDAYQUARTER":case"FIRSTDAYYEAR":case"LASTDAYYEAR":case"THISWEEK":case"THISMONTH":case"THISQUARTER":case"THISYEAR":case"LASTWEEK":case"LASTMONTH":case"LASTQUARTER":case"LASTYEAR":case"NEXTWEEK":case"NEXTMONTH":case"NEXTQUARTER":case"NEXTYEAR":case"YEARTODATE":case"DATETOYEAR":case"QUARTER1":case"QUARTER2":case"QUARTER3":case"QUARTER4":return true;default:return false}};o.prototype._getXPeriodTitle=function(e){var t,a=this.getKey();if(e.length===1){return M.getText("DYNAMIC_DATE_"+a+"_TITLE")}const s=e.map(function(t){let a=t;if(a.indexOf("included")!==-1){a=a.replace("included","")}if(e.indexOf(t)!==-1&&e.indexOf(a)!==-1&&a!==t){return""}return M.getText("DYNAMIC_DATE_"+a.toUpperCase())});const r=s.filter(function(e){return e!==""});t=r.join(" / ");if(a.indexOf("LAST")===0){return M.getText("DYNAMIC_DATE_LASTX_TITLE",[t])}if(a.indexOf("NEXT")===0){return M.getText("DYNAMIC_DATE_NEXTX_TITLE",[t])}};function Y(e){return new a({key:e.toUpperCase(),text:M.getText("DYNAMIC_DATE_"+e.toUpperCase())})}return o});
//# sourceMappingURL=StandardDynamicDateOption.js.map