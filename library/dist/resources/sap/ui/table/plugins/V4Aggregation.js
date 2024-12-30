/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","../utils/TableUtils"],function(t,e){"use strict";const o=t.extend("sap.ui.table.plugins.V4Aggregation",{metadata:{library:"sap.ui.table",properties:{groupHeaderFormatter:{type:"function"}}}});o.findOn=t.findOn;o.prototype.isApplicable=function(e){return t.prototype.isApplicable.apply(this,arguments)&&e.getMetadata().getName()==="sap.ui.table.Table"};o.prototype.activate=function(){const e=this.getTableBinding();if(e&&!e.isA("sap.ui.model.odata.v4.ODataListBinding")){return}t.prototype.activate.apply(this,arguments)};o.prototype.onActivate=function(t){e.Grouping.setToDefaultGroupMode(t);e.Hook.register(t,e.Hook.Keys.Row.UpdateState,i,this);e.Hook.register(t,e.Hook.Keys.Row.Expand,n,this);e.Hook.register(t,e.Hook.Keys.Row.Collapse,s,this)};o.prototype.onDeactivate=function(t){for(const e of t.getColumns()){e._setCellContentVisibilitySettings()}e.Grouping.setToDefaultFlatMode(t);e.Hook.deregister(t,e.Hook.Keys.Row.UpdateState,this.updateRowState,this);e.Hook.deregister(this,e.Hook.Keys.Row.Expand,n,this);e.Hook.deregister(this,e.Hook.Keys.Row.Collapse,s,this)};o.prototype.onTableRowsBound=function(t){if(!t.getModel().isA("sap.ui.model.odata.v4.ODataModel")){this.deactivate()}};o.prototype.declareColumnsHavingTotals=function(t){const e=this.getTable()?.getColumns()??[];for(const o of e){const e=t.includes(o);o._setCellContentVisibilitySettings({groupHeader:e,summary:e})}};function i(t){const e=t.context.getProperty("@$ui5.node.level");const o=t.context.getProperty("@$ui5.node.isTotal");const i=t.context.getProperty("@$ui5.node.isExpanded")===undefined;const n=e===0&&o;const s=e>0&&!i;const a=!s&&o;t.level=e;t.expandable=s;t.expanded=t.context.getProperty("@$ui5.node.isExpanded")===true;if(n||a){t.type=t.Type.Summary;t.level=e+1}else if(s){t.type=t.Type.GroupHeader}if(s){const o=this.getTableBinding().getAggregation().groupLevels[e-1];const i=this.getGroupHeaderFormatter();if(i){const e=i(t.context,o);if(typeof e!=="string"){throw new Error("The group header title must be a string")}t.title=e}else{t.title=t.context.getProperty(o,true)}}}function n(t){const e=t.getRowBindingContext();if(e){e.expand()}}function s(t){const e=t.getRowBindingContext();if(e){e.collapse()}}return o});
//# sourceMappingURL=V4Aggregation.js.map