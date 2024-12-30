/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Lib","sap/ui/thirdparty/jquery","sap/ui/Device","sap/ui/core/Element","./InputBase","./DateTimeField","./Button","./ResponsivePopover","sap/ui/core/date/UniversalDate","./library","sap/ui/core/Control","sap/ui/core/library","./DatePickerRenderer","sap/base/util/deepEqual","sap/base/assert","sap/base/Log","sap/ui/core/IconPool","./InstanceManager","sap/ui/unified/Calendar","sap/ui/unified/DateRange","sap/ui/unified/DateTypeRange","sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/core/LabelEnablement","sap/ui/unified/library","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UI5Date","sap/ui/core/date/CalendarWeekNumbering","sap/ui/core/InvisibleText","sap/ui/dom/jquery/cursorPos"],function(e,t,jQuery,a,i,s,n,o,r,p,l,u,h,d,g,c,f,_,y,D,m,C,v,T,P,b,V,S,I,M){"use strict";var E=h.CalendarType;var R=t.getResourceBundleFor("sap.m");var w=n.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showFooter:{type:"boolean",group:"Misc",defaultValue:false},showCurrentDateButton:{type:"boolean",group:"Behavior",defaultValue:false},hideInput:{type:"boolean",group:"Misc",defaultValue:false},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"},afterPopupOpened:{type:"boolean"}}},afterValueHelpOpen:{},afterValueHelpClose:{}},designtime:"sap/m/designtime/DatePicker.designtime",dnd:{draggable:false,droppable:true}},renderer:d});w.prototype.init=function(){n.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=S.getInstance(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=S.getInstance(9999,11,31,23,59,59,999);var e=this.addEndIcon({id:this.getId()+"-icon",src:this.getIconSrc(),noTabStop:true,decorative:!a.support.touch||a.system.desktop?true:false,useIconTooltip:false,alt:R.getText("OPEN_PICKER_TEXT")});this._bShouldClosePicker=false;e.addEventDelegate({onmousedown:function(e){this._bShouldClosePicker=!!this.isOpen()}},this);e.attachPress(function(){this.toggleOpen(this._bShouldClosePicker)},this)};w.prototype.isValidValue=function(){return this._bValid};w.prototype.isOpen=function(){return this._oPopup&&this._oPopup.isOpen()};w.prototype.toggleOpen=function(e){if(this.getEditable()&&this.getEnabled()){if(e){x.call(this)}else{F.call(this)}}};w.prototype.getIconSrc=function(){return _.getIconURI("appointment-2")};w.prototype.exit=function(){s.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close()}delete this._oPopup}if(this._getCalendar()){if(this._oCalendarAfterRenderDelegate){this._getCalendar().removeDelegate(this._oCalendarAfterRenderDelegate)}this._getCalendar().destroy();delete this._getCalendar()}if(this._iInvalidateCalendar){clearTimeout(this._iInvalidateCalendar)}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined};w.prototype.invalidate=function(e){if(!e||e!=this._getCalendar()){u.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=setTimeout(L.bind(this),0)}};w.prototype.onBeforeRendering=function(){n.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate();var e=this._getValueHelpIcon();if(e){e.setProperty("visible",this.getEditable())}};w.prototype.setDisplayFormat=function(e){this.setProperty("displayFormat",e);if(this._oCalendar){this._oCalendar.removeDelegate(this._oCalendarAfterRenderDelegate);this._oCalendar.destroy();this._oCalendar=null;this._createPopupContent()}return this};w.prototype.setWidth=function(e){return s.prototype.setWidth.call(this,e||"100%")};w.prototype.getWidth=function(e){return this.getProperty("width")||"100%"};w.prototype.applyFocusInfo=function(e){this._bFocusNoPopup=true;if(!a.support.touch||a.system.desktop){s.prototype.applyFocusInfo.apply(this,arguments)}};w.prototype.onfocusin=function(e){if(!jQuery(e.target).hasClass("sapUiIcon")){n.prototype.onfocusin.apply(this,arguments)}this._bFocusNoPopup=undefined};w.prototype.onsapshow=function(e){this.toggleOpen(this.isOpen());e.preventDefault()};w.prototype.onsaphide=w.prototype.onsapshow;w.prototype.onsapescape=function(e){var t=this.getLastValue(),a=this._parseValue(this._getInputValue(),true),i=this._formatValue(a,true);if(i!==t){e.setMarked();e.preventDefault();this.updateDomValue(t);this.onValueRevertedByEscape(t,i)}};w.prototype.onsappageup=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(t!="sap.ui.unified.Calendar"){return}this._increaseDate(1,"day")};w.prototype.onsappageupmodifiers=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(!e.ctrlKey&&e.shiftKey){if(t=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(1,"month")}else{this._increaseDate(1,"year")}};w.prototype.onsappagedown=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(t!="sap.ui.unified.Calendar"){return}this._increaseDate(-1,"day")};w.prototype.onsappagedownmodifiers=function(e){var t=this._getCalendarConstructor().getMetadata().getName();e.preventDefault();if(!e.ctrlKey&&e.shiftKey){if(t=="sap.ui.unified.internal.CustomYearPicker"){return}this._increaseDate(-1,"month")}else{this._increaseDate(-1,"year")}};w.prototype.onkeypress=function(e){if(!e.charCode||e.metaKey||e.ctrlKey){return}var t=this._getFormatter(true);var a=String.fromCharCode(e.charCode);if(a&&t.sAllowedCharacters&&t.sAllowedCharacters.indexOf(a)<0){e.preventDefault()}};w.prototype._getValueHelpIcon=function(){var e=this.getAggregation("_endIcon");return e&&e[0]};w.prototype._dateValidation=function(e){this._bValid=true;if(e&&(e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime())){this._bValid=false;c(this._bValid,"Date must be in valid range")}this.setProperty("dateValue",e);return e};w.prototype.setMinDate=function(e){if(!this._isValidDate(e)){throw new Error("Date must be a JavaScript or UI5Date date object; "+this)}if(g(this.getMinDate(),e)){return this}if(e){var t=e.getFullYear();if(t<1||t>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMinDate=S.getInstance(e.getTime());var a=this.getDateValue();if(a&&a.getTime()<e.getTime()){this._bValid=false;this._bOutOfAllowedRange=true;f.warning("DateValue not in valid date range",this)}}else{this._oMinDate=S.getInstance(1,0,1);this._oMinDate.setFullYear(1)}this.setProperty("minDate",e);if(this._getCalendar()){this._getCalendar().setMinDate(e)}this._oMinDate.setHours(0,0,0,0);return this};w.prototype.setMaxDate=function(e){if(!this._isValidDate(e)){throw new Error("Date must be a JavaScript or UI5Date date object; "+this)}if(g(this.getMaxDate(),e)){return this}if(e){var t=e.getFullYear();if(t<1||t>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this)}this._oMaxDate=S.getInstance(e.getTime());var a=this.getDateValue();if(a&&a.getTime()>e.getTime()){this._bValid=false;this._bOutOfAllowedRange=true;f.warning("DateValue not in valid date",this)}}else{this._oMaxDate=S.getInstance(9999,11,31,23,59,59,999)}this.setProperty("maxDate",e);if(this._getCalendar()){this._getCalendar().setMaxDate(e)}this._oMaxDate.setHours(23,59,59,999);return this};w.prototype.setCurrentDateButton=function(e){var t=this._getCalendar();t&&t.setCurrentDateButton(e);return this.setProperty("showCurrentDateButton",e)};w.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){f.warning("minDate > MaxDate -> dates switched",this);var e=S.getInstance(this._oMinDate.getTime());var t=S.getInstance(this._oMaxDate.getTime());e.setHours(23,59,59,999);t.setHours(0,0,0,0);this._oMinDate=S.getInstance(t.getTime());this._oMaxDate=S.getInstance(e.getTime());this.setProperty("minDate",t,true);this.setProperty("maxDate",e,true);if(this._getCalendar()){this._getCalendar().setMinDate(t);this._getCalendar().setMaxDate(e)}}var a=this.getDateValue();if(a&&(a.getTime()<this._oMinDate.getTime()||a.getTime()>this._oMaxDate.getTime())){this._bValid=false;f.error("dateValue "+a.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this)}};w.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType")};w.prototype._handleDateValidation=function(e){this._bValid=true;if(!e||e.getTime()<this._oMinDate.getTime()||e.getTime()>this._oMaxDate.getTime()){this._bValid=false;f.warning("Value can not be converted to a valid date",this)}var t=this._formatValue(e,true);if(t!==this.getValue()){this.setLastValue(t)}this.setProperty("value",t);this.setProperty("dateValue",e)};w.prototype.setDisplayFormatType=function(e){if(e){var t=false;for(var a in E){if(a==e){t=true;break}}if(!t){throw new Error(e+" is not a valid calendar type"+this)}}this.setProperty("displayFormatType",e,true);this.setDisplayFormat(this.getDisplayFormat());return this};w.prototype.setSecondaryCalendarType=function(e){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",e,true);if(this._getCalendar()){this._getCalendar().setSecondaryCalendarType(e)}return this};w.prototype.setShowFooter=function(e){var t=this._oPopup,a=this._getCalendar();this.setProperty("showFooter",e);if(!t||!a){return this}t._getButtonFooter().setVisible(e);return this};w.prototype.addSpecialDate=function(e){k.call(this,e);this.addAggregation("specialDates",e,true);L.call(this);return this};w.prototype.insertSpecialDate=function(e,t){k.call(this,e);this.insertAggregation("specialDates",e,t,true);L.call(this);return this};w.prototype.removeSpecialDate=function(e){var t=this.removeAggregation("specialDates",e,true);L.call(this);return t};w.prototype.removeAllSpecialDates=function(){var e=this.removeAllAggregation("specialDates",true);L.call(this);return e};w.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);L.call(this);return this};w.prototype.setLegend=function(e){this.setAssociation("legend",e,true);var t=this.getLegend();if(t){var a=sap.ui.require("sap/ui/unified/CalendarLegend");e=i.getElementById(t);if(e&&!(typeof a=="function"&&e instanceof a)){throw new Error(e+" is not an sap.ui.unified.CalendarLegend. "+this)}}if(this._getCalendar()){this._getCalendar().setLegend(t)}return this};w.prototype.onChange=function(e){if(!this.getEditable()||!this.getEnabled()){return}var t=this._$input.val(),a=this._formatValue(this.getDateValue()),i;if(t==a&&this._bValid){return}if(this.getShowFooter()&&this._oPopup&&!t){this._oPopup.getBeginButton().setEnabled(false)}this._bValid=true;if(t!=""){i=this._parseValue(t,true);if(!i||i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime()){this._bValid=false;i=undefined}else{t=this._formatValue(i)}}if(this.getDomRef()&&this._$input.val()!==t){this._$input.val(t);this._curpos=this._$input.cursorPos()}if(i){t=this._formatValue(i,true)}if(this.getLastValue()!==t||i&&this.getDateValue()&&i.getFullYear()!==this.getDateValue().getFullYear()){this.setLastValue(t);this.setProperty("value",t,true);var s=this.getValue();if(this._bValid&&t==s){this.setProperty("dateValue",i,true)}t=s;if(this.isOpen()){if(this._bValid){i=this.getDateValue()}this._getCalendar().focusDate(i);var n=this._oDateRange.getStartDate();if(!n&&i||n&&i&&n.getTime()!=i.getTime()){this._oDateRange.setStartDate(S.getInstance(i.getTime()))}else if(n&&!i){this._oDateRange.setStartDate(undefined)}}this.fireChangeEvent(t,{valid:this._bValid})}};w.prototype.updateDomValue=function(e){if(this.isActive()&&this._$input.val()!==e){this._bCheckDomValue=true;e=typeof e=="undefined"?this._$input.val():e.toString();this._curpos=this._$input.cursorPos();var t=this._parseValue(e,true);e=this._formatValue(t);if(this._bPreferUserInteraction){this.handleInputValueConcurrency(e)}else{this._$input.val(e);if(document.activeElement===this._$input[0]){this._$input.cursorPos(this._curpos)}}}return this};function F(e){this._createPopup();this._createPopupContent();var t;var a=this.getBinding("value");if(a&&a.oType&&a.oType.oOutputFormat){t=a.oType.oOutputFormat.oFormatOptions.calendarType}else if(a&&a.oType&&a.oType.oFormat){t=a.oType.oFormat.oFormatOptions.calendarType}if(!t){t=this.getDisplayFormatType()}if(t){this._getCalendar().setPrimaryCalendarType(t)}var i=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(i!=this._$input.val()){this.onChange()}this._fillDateRange();this._openPopup(e);this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar()),afterPopupOpened:true})}w.prototype._createPopup=function(){var e="";if(!this._oPopup){this._oPopup=new r(this.getId()+"-RP",{showCloseButton:false,showArrow:false,showHeader:false,placement:l.PlacementType.VerticalPreferredBottom,beginButton:new o({type:l.ButtonType.Emphasized,text:R.getText("DATEPICKER_SELECTION_CONFIRM"),press:this._handleOKButton.bind(this)}),afterOpen:A.bind(this),afterClose:B.bind(this),ariaLabelledBy:M.getStaticId("sap.m",this._getAccessibleNameLabel())}).addStyleClass("sapMRPCalendar");if(this.getShowFooter()){this._oPopup.addStyleClass("sapMLandscapePadding")}this._oPopup._getPopup().setAutoClose(true);if(a.system.phone){e=P.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(e,t){var a=i.getElementById(t);return e+" "+(a.getText?a.getText():"")},"").trim();this._oPopup.setTitle(e);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new o({text:R.getText("DATEPICKER_SELECTION_CANCEL"),press:this._handleCancelButton.bind(this)}))}this.setAggregation("_popup",this._oPopup,true)}};w.prototype._getAccessibleNameLabel=function(){return"DATEPICKER_POPOVER_ACCESSIBLE_NAME"};w.prototype._openPopup=function(e){if(!this._oPopup){return}if(!e){e=this.getDomRef()}this._oPopup._getPopup().setExtraContent([e]);this._oPopup.openBy(e||this)};w.prototype.openBy=function(e){F.call(this,e)};w.prototype._getVisibleDatesRange=function(e){var t=e._getVisibleDays();return new m({startDate:t[0].toLocalJSDate(),endDate:t[t.length-1].toLocalJSDate()})};w.prototype._createPopupContent=function(){var e=this._getCalendarConstructor();if(!this._getCalendar()){this._oCalendar=new e(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),calendarWeekNumbering:this.getCalendarWeekNumbering(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar())})}.bind(this)});this._oCalendar.setShowCurrentDateButton(this.getShowCurrentDateButton());this._oDateRange=new m;this._getCalendar().addSelectedDate(this._oDateRange);this._getCalendar()._setSpecialDatesControlOrigin(this);this._getCalendar().attachCancel(x,this);if(this.getDomRef()?.closest(".sapUiSizeCompact")){this._getCalendar().addStyleClass("sapUiSizeCompact")}if(this._bSecondaryCalendarTypeSet){this._getCalendar().setSecondaryCalendarType(this.getSecondaryCalendarType())}if(this._bOnlyCalendar){this._getCalendar().attachSelect(this._handleCalendarSelect,this);this._getCalendar().attachEvent("_renderMonth",O,this);this._oPopup._getButtonFooter().setVisible(this.getShowFooter());this._getCalendar()._bSkipCancelButtonRendering=true;if(!this._oPopup.getContent().length){var t=this._getValueStateHeader();this._oPopup.addContent(this._getValueStateHeader());t.setPopup(this._oPopup._oControl)}this._oPopup.addContent(this._getCalendar());if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}}this._attachAfterRenderingDelegate()}};w.prototype._attachAfterRenderingDelegate=function(){this._oCalendarAfterRenderDelegate={onAfterRendering:function(){var e=this._oPopup&&this._oPopup._getPopup();e&&e._oLastPosition&&e._applyPosition(e._oLastPosition);if(this._oPopup.isOpen()){this._oCalendar.focus()}}.bind(this)};this._oCalendar.addDelegate(this._oCalendarAfterRenderDelegate)};w.prototype._getCalendarConstructor=function(){var e=this._getFormatter(true).aFormatArray.map(function(e){return e.type.toLowerCase()}),t=e.indexOf("day")>=0,a=e.indexOf("month")>=0||e.indexOf("monthstandalone")>=0,i=e.indexOf("year")>=0;if(t&&a&&i){return D}else if(a&&i){return v}else if(i){return T}else{f.warning("Not valid date pattern! Default Calendar constructor function is returned",this);return D}};w.prototype._fillDateRange=function(){var e=this.getDateValue();if(e&&e.getTime()>=this._oMinDate.getTime()&&e.getTime()<=this._oMaxDate.getTime()){this._getCalendar().focusDate(S.getInstance(e.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=e.getTime()){this._oDateRange.setStartDate(S.getInstance(e.getTime()))}}else{var t=this.getInitialFocusedDateValue();var a=t?t:S.getInstance();if(a.getTime()<this._oMinDate.getTime()){a=this._oMinDate}else if(a.getTime()>this._oMaxDate.getTime()){a=this._oMaxDate}this._getCalendar().focusDate(a);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined)}}};w.prototype.getAccessibilityInfo=function(){var e=this.getRenderer();var a=s.prototype.getAccessibilityInfo.apply(this,arguments);var i=this.getValue()||"";var n=this.getRequired()?t.getResourceBundleFor("sap.m").getText("ELEMENT_REQUIRED"):"";if(this._bValid){var o=this.getDateValue();if(o){i=this._formatValue(o)}}a.type=R.getText("ACC_CTR_TYPE_DATEINPUT");a.description=[i||this._getPlaceholder(),e.getLabelledByAnnouncement(this),e.getDescribedByAnnouncement(this),n].join(" ").trim();return a};w.prototype._selectDate=function(){var e=this.getDateValue(),t=this._getSelectedDate(),i="";if(!g(t,e)){this.setDateValue(S.getInstance(t.getTime()));i=this.getValue();this.fireChangeEvent(i,{valid:true});this._focusInput()}else if(!this._bValid){i=this._formatValue(t);if(i!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(i);this.setLastValue(i)}i=this._formatValue(t,true);this.setProperty("value",i,true);this.fireChangeEvent(i,{valid:true});this._focusInput()}}else if(a.system.desktop||!a.support.touch){this.focus()}this._oPopup.close()};w.prototype._handleCalendarSelect=function(){if(this.getShowFooter()){this._oPopup.getBeginButton().setEnabled(true);return}this._selectDate()};w.prototype._getTimezone=function(t){return e.getTimezone()};w.prototype._focusInput=function(){if(this.getDomRef()&&(a.system.desktop||!a.support.touch)){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos)}return this};w.prototype._getCalendar=function(){return this._oCalendar};w.prototype._getSelectedDate=function(){var e=this._getCalendar().getSelectedDates(),t;if(e.length>0){t=e[0].getStartDate()}return t};w.prototype._handleOKButton=function(){this._selectDate()};w.prototype._handleCancelButton=function(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this._oPopup.close()};function x(e){if(this.isOpen()){this._oPopup.close();if(a.system.desktop||!a.support.touch){this.focus()}}}w.prototype._increaseDate=function(e,t){var a=this.getDateValue();var i=this._$input.cursorPos();if(a&&this.getEditable()&&this.getEnabled()){var s;var n=this.getBinding("value");if(n&&n.oType&&n.oType.oOutputFormat){s=n.oType.oOutputFormat.oFormatOptions.calendarType}else if(n&&n.oType&&n.oType.oFormat){s=n.oType.oFormat.oFormatOptions.calendarType}if(!s){s=this.getDisplayFormatType()}var o=p.getInstance(S.getInstance(a.getTime()),s);a=p.getInstance(S.getInstance(a.getTime()),s);switch(t){case"day":o.setDate(o.getDate()+e);break;case"month":o.setMonth(o.getMonth()+e);var r=(a.getMonth()+e)%12;if(r<0){r=12+r}while(o.getMonth()!=r){o.setDate(o.getDate()-1)}break;case"year":o.setFullYear(o.getFullYear()+e);while(o.getMonth()!=a.getMonth()){o.setDate(o.getDate()-1)}break;default:break}if(o.getTime()<this._oMinDate.getTime()){o=new p(this._oMinDate.getTime())}else if(o.getTime()>this._oMaxDate.getTime()){o=new p(this._oMaxDate.getTime())}if(!g(this.getDateValue(),o.getJSDate())){this.setDateValue(S.getInstance(o.getTime()));this._curpos=i;this._$input.cursorPos(this._curpos);var l=this.getValue();this.fireChangeEvent(l,{valid:true})}}};w.prototype._getSpecialDates=function(){var e=this.getSpecialDates();for(var t=0;t<e.length;t++){var a=e[t].getSecondaryType()===b.CalendarDayType.NonWorking&&e[t].getType()!==b.CalendarDayType.NonWorking;if(a){var i=new C;i.setType(e[t].getSecondaryType());i.setStartDate(e[t].getStartDate());if(e[t].getEndDate()){i.setEndDate(e[t].getEndDate())}e.push(i)}}return e};function A(){this.addStyleClass(s.ICON_PRESSED_CSS_CLASS);this._renderedDays=this._getCalendar().$("-Month0-days").find(".sapUiCalItem").length;y.addPopoverInstance(this._oPopup);this._oCalendar.focus();this.fireAfterValueHelpOpen()}function B(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false)}this.removeStyleClass(s.ICON_PRESSED_CSS_CLASS);this._getCalendar()._closePickers();y.removePopoverInstance(this._oPopup);this.fireAfterValueHelpClose()}function O(e){var t=e.getParameter("days"),a=this._oPopup._getPopup();if(t>this._renderedDays){this._renderedDays=t;a._applyPosition(a._oLastPosition)}}function k(e){var t=sap.ui.require("sap/ui/unified/DateTypeRange");if(e&&!(t&&e instanceof t)){throw new Error(e+'is not valid for aggregation "specialDates" of '+this)}}function L(){if(this.isOpen()){this._getCalendar()._bDateRangeChanged=false;this._getCalendar().invalidate()}}return w});
//# sourceMappingURL=DatePicker.js.map