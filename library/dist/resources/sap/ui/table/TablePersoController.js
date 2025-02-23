/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectMetadata","sap/ui/core/Element","sap/ui/core/syncStyleClass","sap/base/Log","sap/ui/thirdparty/jquery","./utils/TableUtils"],function(e,t,o,s,i,r,jQuery,a){"use strict";const n=e.ResetAllMode;const l=t.extend("sap.ui.table.TablePersoController",{constructor:function(e,o){t.apply(this,arguments)},metadata:{deprecated:true,properties:{autoSave:{type:"boolean",defaultValue:true},persoService:{type:"any"},customDataKey:{type:"string",defaultValue:"persoKey"},showResetAll:{type:"boolean",defaultValue:true,since:"1.88"},resetAllMode:{type:"sap.ui.table.ResetAllMode",defaultValue:n.Default,since:"1.88"}},associations:{table:{type:"sap.ui.table.Table",multiple:false}},library:"sap.ui.table"}});l.prototype.init=function(){this._schemaProperty="_persoSchemaVersion";this._schemaVersion="1.0";this._oInitialPersoData=null;this._aTableEvents=["columnResize","columnMove","columnVisibility","sort","filter","group"];this._aColumnProperties=["visible","width","sorted","sortOrder","grouped","summed"];this._bSaveFilters=false;if(this._bSaveFilters){this._aTableEvents.push("filter");this._aColumnProperties.push("filtered");this._aColumnProperties.push("filterValue")}};l.prototype.setResetAllMode=function(e){if(!this._resetAllModeSet){this.setProperty("resetAllMode",e);this._resetAllModeSet=true}else{r.warning("resetAllMode of the TablePersoController can only be set once.")}};l.prototype.exit=function(){const e=this._getTable();if(e){this._manageTableEventHandlers(e,false)}delete this._schemaProperty;delete this._schemaVersion;delete this._oInitialPersoData;if(this._oDialog){this._oDialog.destroy();delete this._oDialog}};l.prototype.setPersoService=function(e){e=this.validateProperty("persoService",e);if(e&&(typeof e.getPersData!=="function"||typeof e.setPersData!=="function"||typeof e.delPersData!=="function")){throw new Error('Value of property "persoService" needs to be null/undefined or an object that has the methods '+'"getPersData", "setPersData" and "delPersData".')}const t=this.getPersoService();this.setProperty("persoService",e,true);const o=this.getPersoService();if(o&&o!==t&&this._getTable()&&(this.getAutoSave()||!t)){this.refresh()}return this};l.prototype.setAutoSave=function(e){const t=this.getAutoSave();this.setProperty("autoSave",e,true);const o=this.getAutoSave();if(o&&!t){this.savePersonalizations()}return this};l.prototype.setTable=function(e){const t=this._getTable();if(t){t._oPersoController=undefined}this.setAssociation("table",e,true);const o=this._getTable();if(o){o._oPersoController=this}if(t){this._manageTableEventHandlers(t,false)}if(o&&o!==t){if(this.getResetAllMode()===n.Default){this._oInitialPersoData=this._getCurrentTablePersoData(true)}this._manageTableEventHandlers(o,true);if(this.getPersoService()&&(this.getAutoSave()||!t)){this.refresh()}}else if(!o){this._oInitialPersoData=null}return this};l.prototype.setCustomDataKey=function(e){const t=this.getCustomDataKey();this.setProperty("customDataKey",e,true);const o=this.getCustomDataKey();if(this.getResetAllMode()===n.Default&&this._getTable()){this._oInitialPersoData=this._getCurrentTablePersoData(true)}if(t!==o&&this.getAutoSave()){this.savePersonalizations()}return this};l.prototype._manageTableEventHandlers=function(e,t){for(let o=0,s=this._aTableEvents.length;o<s;o++){const s=e[t?"attachEvent":"detachEvent"];s.apply(e,[this._aTableEvents[o],this._tableEventHandler,this])}};l.prototype.refresh=function(){const e=this;const t=this.getPersoService();if(t){return t.getPersData().done(function(t){const o=t&&Array.isArray(t.aColumns)?t:e._oInitialPersoData;e._adjustTable(o);if(e.getResetAllMode()===n.ServiceDefault){e._oInitialPersoData=e._getCurrentTablePersoData(true)}}).fail(function(){r.error("Problem reading persisted personalization data.")})}else{r.error("The Personalization Service is not available!");const e=jQuery.Deferred();e.reject();return e.promise()}};l.prototype.savePersonalizations=function(){const e=this.getPersoService();if(e){const t=this._getCurrentTablePersoData();t[this._schemaProperty]=this._schemaVersion;return e.setPersData(t).fail(function(){r.error("Problem persisting personalization data.")})}else{r.error("The Personalization Service is not available!");const e=jQuery.Deferred();e.reject();return e.promise()}};l.prototype._adjustTable=function(e){const t=this._getTable();if(!t||!e||!Array.isArray(e.aColumns)){return}const o={};const s=t.getColumns();for(let e=0,t=s.length;e<t;e++){o[this._getColumnPersoKey(s[e])]=s[e]}const i=e.aColumns;for(let e=0,s=i.length;e<s;e++){const s=i[e];const a=o[s.id];if(a){if(t.indexOfColumn(a)!==s.order){t.removeColumn(a);t.insertColumn(a,s.order)}const e=a.getMetadata();for(let t=0,o=this._aColumnProperties.length;t<o;t++){const o=this._aColumnProperties[t];if(s[o]!==undefined){try{if(e.hasProperty(o)&&a.getProperty(o)!==s[o]){a.setProperty(o,s[o])}}catch(e){r.error('sap.ui.table.TablePersoController: failed to apply the value "'+a[o]+'" for the property + "'+o+'".')}}}}}if(typeof t._onPersoApplied==="function"){t._onPersoApplied()}};l.prototype._tableEventHandler=function(e){if(this.getAutoSave()&&!this._iTriggerSaveTimeout){const e=this;this._iTriggerSaveTimeout=setTimeout(function(){e.savePersonalizations();e._iTriggerSaveTimeout=null},0)}};l.prototype._getCurrentTablePersoData=function(e){const t=this._getTable();const o=t.getColumns();const s={aColumns:[]};for(let t=0,i=o.length;t<i;t++){const i=o[t];const r=this._getColumnPersoKey(i);const n={id:r,order:t};const l=i.getMetadata();for(let e=0,t=this._aColumnProperties.length;e<t;e++){const t=this._aColumnProperties[e];if(l.hasProperty(t)){n[t]=i.getProperty(t)}}if(e){n.text=a.Column.getHeaderText(i)||r}s.aColumns.push(n)}return s};l.prototype._getTable=function(){return s.getElementById(this.getTable())};l.prototype._getColumnPersoKey=function(e){return this._getPersoKey(this._getTable())+"-"+this._getPersoKey(e)};l.prototype._getPersoKey=function(e){let t=e.data(this.getCustomDataKey());if(!t){t=e.getId();if(t.indexOf(o.getUIDPrefix())===0){r.warning('Generated IDs should not be used as personalization keys! The stability cannot be ensured! (Control: "'+e.getId()+'")')}}return t};l.prototype.openDialog=function(e){const t=this;function o(){if(t._oDialog){i("sapUiSizeCompact",t._getTable(),t._oDialog._oDialog);t._oDialog.open()}}if(!this._oDialog){sap.ui.getCore().loadLibrary("sap.m",{async:true}).then(function(){sap.ui.require(["sap/m/TablePersoDialog"],function(s){t._oDialog=new s(t._getTable().getId()+"-PersoDialog",{persoService:t.getPersoService(),showSelectAll:true,showResetAll:e&&e.showResetAll||t.getShowResetAll(),hasGrouping:false,contentWidth:e&&e.contentWidth,contentHeight:e&&e.contentHeight||"20rem",initialColumnState:t._oInitialPersoData.aColumns,columnInfoCallback:function(e,o,s){return t._getCurrentTablePersoData(true).aColumns},confirm:function(){t._adjustTable(this.retrievePersonalizations());if(t.getAutoSave()){t.savePersonalizations()}}});t._oDialog._oDialog.addStyleClass("sapUiNoContentPadding");if(t.getResetAllMode()===n.ServiceReset&&t.getPersoService().getResetPersData){t._oDialog.setShowResetAll(false);t.getPersoService().getResetPersData().done(function(e){if(this._bIsBeingDestroyed){return}if(e){t._oDialog.setInitialColumnState(e.aColumns);t._oDialog.setShowResetAll(t.getShowResetAll())}})}o()})})}else{o()}};return l});
//# sourceMappingURL=TablePersoController.js.map