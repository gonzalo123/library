/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Column","./library","sap/ui/core/Element","sap/ui/model/type/Boolean","sap/ui/model/type/DateTime","sap/ui/model/type/Float","sap/ui/model/type/Integer","sap/ui/model/type/Time","./utils/TableUtils","sap/base/Log"],function(e,t,n,i,o,r,a,s,p,u){"use strict";const l=t.GroupEventType;function d(e){return p.isA(e,"sap.ui.table.AnalyticalTable")}const g=e.extend("sap.ui.table.AnalyticalColumn",{metadata:{library:"sap.ui.table",properties:{leadingProperty:{type:"string",group:"Misc",defaultValue:null},summed:{type:"boolean",group:"Misc",defaultValue:false},inResult:{type:"boolean",group:"Misc",defaultValue:false},showIfGrouped:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderFormatter:{type:"function",group:"Appearance",defaultValue:null},grouped:{type:"boolean",group:"Appearance",defaultValue:false}}}});g._DEFAULT_FILTERTYPES={Time:new s({UTC:true}),DateTime:new o({UTC:true}),Float:new r,Integer:new a,Boolean:new i};g.prototype._setGrouped=function(e){const t=this._getTable();const n=e?l.group:l.ungroup;this.setGrouped(e);t.fireGroup({column:this,groupedColumns:t._aGroupedColumns,type:n})};g.prototype._isAggregatableByMenu=function(){const e=this._getTable();const t=e.getBinding();const n=t&&t.getAnalyticalQueryResult();return e&&n&&n.findMeasureByPropertyName(this.getLeadingProperty())};g.prototype.setGrouped=function(e){const t=this.getParent();if(d(t)){if(e){t._addGroupedColumn(this.getId())}else{t._removeGroupedColumn(this.getId())}}const n=this.setProperty("grouped",e);this._updateColumns();return n};g.prototype.setSummed=function(e){const t=this.setProperty("summed",e,true);this._updateTableAnalyticalInfo();return t};g.prototype.setVisible=function(t){e.prototype.setVisible.call(this,t);this._updateColumns();return this};g.prototype.getLabel=function(){let e=this.getAggregation("label");try{if(!e){if(!this._oBindingLabel){const e=this.getParent();if(d(e)){const t=e.getBinding();if(t){this._oBindingLabel=p._getTableTemplateHelper().createLabel();this.addDependent(this._oBindingLabel);p.Binding.metadataLoaded(e).then(function(){this._oBindingLabel.setText(t.getPropertyLabel(this.getLeadingProperty()))}.bind(this))}}}e=this._oBindingLabel}}catch(e){u.warning(e)}return e};g.prototype.getFilterProperty=function(){let e=this.getProperty("filterProperty");if(!e){const t=this.getParent();if(d(t)){const n=t.getBinding();const i=this.getLeadingProperty();if(n&&n.getFilterablePropertyNames().indexOf(i)>-1){e=i}}}return e};g.prototype.getSortProperty=function(){let e=this.getProperty("sortProperty");if(!e){const t=this.getParent();if(d(t)){const n=t.getBinding();const i=this.getLeadingProperty();if(n&&n.getSortablePropertyNames().indexOf(i)>-1){e=i}}}return e};g.prototype.getFilterType=function(){let e=this.getProperty("filterType");if(!e){const t=this.getParent();if(d(t)){const n=t.getBinding();const i=this.getLeadingProperty();const o=n&&n.getProperty(i);if(o){switch(o.type){case"Edm.Time":e=g._DEFAULT_FILTERTYPES["Time"];break;case"Edm.DateTime":case"Edm.DateTimeOffset":e=g._DEFAULT_FILTERTYPES["DateTime"];break;case"Edm.Single":case"Edm.Double":case"Edm.Decimal":e=g._DEFAULT_FILTERTYPES["Float"];break;case"Edm.SByte":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":e=g._DEFAULT_FILTERTYPES["Integer"];break;case"Edm.Boolean":e=g._DEFAULT_FILTERTYPES["Boolean"];break}}}}return e};g.prototype._updateColumns=function(e,t){const n=this.getParent();if(d(n)){n._updateColumns(e,t)}};g.prototype._updateTableAnalyticalInfo=function(e){const t=this.getParent();if(t&&d(t)&&!t._bSuspendUpdateAnalyticalInfo){t.updateAnalyticalInfo(e)}};g.prototype._updateTableColumnDetails=function(){const e=this.getParent();if(e&&d(e)&&!e._bSuspendUpdateAnalyticalInfo){e._updateTableColumnDetails()}};g.prototype.shouldRender=function(){if(!this.getVisible()||!this.getTemplate()){return false}return(!this.getGrouped()||this._bLastGroupAndGrouped||this.getShowIfGrouped())&&(!this._bDependendGrouped||this._bLastGroupAndGrouped)};g.prototype._menuHasItems=function(){const t=function(){const e=this.getParent();const t=e.getBinding();const n=t&&t.getAnalyticalQueryResult();return e&&n&&n.findMeasureByPropertyName(this.getLeadingProperty())}.bind(this);return e.prototype._menuHasItems.apply(this)||t()};g.prototype.isFilterableByMenu=function(){const e=this.getFilterProperty();if(!e||!this.getShowFilterMenuEntry()){return false}const t=this.getParent();if(d(t)){const n=t.getBinding();if(n){if(n.getFilterablePropertyNames().indexOf(e)>-1&&n.getProperty(e)){return true}}}return false};g.prototype.isGroupableByMenu=function(){const e=this.getParent();if(d(e)){const t=e.getBinding();if(t){const e=t.getAnalyticalQueryResult();if(e&&e.findDimensionByPropertyName(this.getLeadingProperty())&&t.getSortablePropertyNames().indexOf(this.getLeadingProperty())>-1&&t.getFilterablePropertyNames().indexOf(this.getLeadingProperty())>-1){return true}}}return false};g.prototype._isGroupableByMenu=function(){return this.isGroupableByMenu()};g.prototype._setCellContentVisibilitySettings=function(){};g.prototype._applySorters=function(){this._updateTableAnalyticalInfo(true);e.prototype._applySorters.apply(this,arguments)};return g});
//# sourceMappingURL=AnalyticalColumn.js.map