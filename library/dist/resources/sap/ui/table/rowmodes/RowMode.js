/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../utils/TableUtils","sap/ui/core/Element","sap/ui/core/RenderManager","sap/ui/thirdparty/jquery","sap/ui/Device"],function(e,t,o,jQuery,n){"use strict";const s=e.createWeakMapFacade();const i=t.extend("sap.ui.table.rowmodes.RowMode",{metadata:{library:"sap.ui.table",abstract:true}});const r={};i.prototype.init=function(){this._bFiredRowsUpdatedAfterRendering=false;s(this).bListeningForFirstRowsUpdatedAfterRendering=false;s(this).bNoDataDisabled=false;s(this).updateTableAsync=e.throttle(this.updateTable.bind(this),50,{asyncLeading:true})};i.prototype.exit=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks()};i.prototype.setParent=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks();t.prototype.setParent.apply(this,arguments);this.attachEvents();this.registerHooks()};i.prototype.attachEvents=function(){e.addDelegate(this.getTable(),r,this)};i.prototype.detachEvents=function(){e.removeDelegate(this.getTable(),r)};i.prototype.cancelAsyncOperations=function(){const e=this.getTable();if(e){clearTimeout(e._mTimeouts.refreshRowsCreateRows)}s(this).updateTableAsync.cancel()};i.prototype.registerHooks=function(){const t=this.getTable();const o=e.Hook.Keys;e.Hook.register(t,o.Table.RowsUnbound,this._onTableRowsUnbound,this);e.Hook.register(t,o.Table.UpdateRows,this._onTableUpdateRows,this);e.Hook.register(t,o.TableRenderer.RenderTableStyles,this.applyTableStyles,this);e.Hook.register(t,o.TableRenderer.RenderInTableBottomArea,this.renderInTableBottomArea,this);e.Hook.register(t,o.TableRenderer.RenderRowContainerStyles,this.applyRowContainerStyles,this);e.Hook.register(t,o.TableRenderer.RenderRowStyles,this.renderRowStyles,this);e.Hook.register(t,o.TableRenderer.RenderCellContentStyles,this.renderCellContentStyles,this)};i.prototype.deregisterHooks=function(){const t=this.getTable();const o=e.Hook.Keys;e.Hook.deregister(t,o.Table.RowsUnbound,this._onTableRowsUnbound,this);e.Hook.deregister(t,o.Table.UpdateRows,this._onTableUpdateRows,this);e.Hook.deregister(t,o.TableRenderer.RenderTableStyles,this.applyTableStyles,this);e.Hook.deregister(t,o.TableRenderer.RenderInTableBottomArea,this.renderInTableBottomArea,this);e.Hook.deregister(t,o.TableRenderer.RenderRowContainerStyles,this.applyRowContainerStyles,this);e.Hook.deregister(t,o.TableRenderer.RenderRowStyles,this.renderRowStyles,this);e.Hook.deregister(t,o.TableRenderer.RenderCellContentStyles,this.renderCellContentStyles,this)};i.prototype.getMinRequestLength=function(){d(this,"getMinRequestLength")};i.prototype.getComputedRowCounts=function(){d(this,"getComputedRowCounts")};i.prototype.getTableStyles=function(){d(this,"getTableStyles")};i.prototype.getTableBottomPlaceholderStyles=function(){return undefined};i.prototype.getRowContainerStyles=function(){d(this,"getRowContainerStyles")};i.prototype.getTable=function(){const t=this.getParent();return e.isA(t,"sap.ui.table.Table")?t:null};i.prototype.updateTable=function(e){const t=this.getTable();if(!t){return}s(this).updateTableAsync.cancel();t._adjustFirstVisibleRowToTotalRowCount();const o=this.updateTableRows();if(t._bInvalid){return}this.applyTableStyles();this.applyRowContainerStyles();this.applyTableBottomPlaceholderStyles();if(o||t.getRows().some(function(e){return e.getDomRef()==null})){this.renderTableRows()}if(o||t.getRows().length>0){this.fireRowsUpdated(e)}};i.prototype.getBaseRowContentHeight=function(){return 0};i.prototype.getBaseRowHeightOfTable=function(){const e=this.getTable();return e?e._getBaseRowHeight():0};i.prototype.getDefaultRowContentHeightOfTable=function(){const e=this.getTable();return e?e._getDefaultRowContentHeight():0};i.prototype.getTotalRowCountOfTable=function(){const e=this.getTable();return e?e._getTotalRowCount():0};i.prototype._onTableRowsUnbound=function(){clearTimeout(this.getTable()._mTimeouts.refreshRowsCreateRows);this.updateTable(e.RowsUpdateReason.Unbind)};i.prototype._onTableUpdateRows=function(e){const t=this.getTable();clearTimeout(t._mTimeouts.refreshRowsCreateRows);s(this).updateTableAsync(e)};i.prototype.applyTableStyles=function(e){const t=this.getTableStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}const o=this.getTable();const n=o?o.getDomRef():null;if(n){n.style.height=t.height;n.style.minHeight=t.minHeight;n.style.maxHeight=t.maxHeight}};i.prototype.applyTableBottomPlaceholderStyles=function(e){const t=this.getTableBottomPlaceholderStyles();if(e){e.style("height",t.height);return}const o=this.getTable();const n=o?o.getDomRef("placeholder-bottom"):null;if(n){n.style.height=t.height}};i.prototype.applyRowContainerStyles=function(e){const t=this.getRowContainerStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}const o=this.getTable();const n=o?o.getDomRef("tableCCnt"):null;if(n){n.style.height=t.height;n.style.minHeight=t.minHeight;n.style.maxHeight=t.maxHeight}};i.prototype.computeStandardizedRowCounts=function(e,t,o){const n=this.getRowCountConstraints();if(n.fixedTop===true){t=1}else if(n.fixedTop===false){t=0}if(n.fixedBottom===true){o=1}else if(n.fixedBottom===false){o=0}e=Math.max(0,e);t=Math.max(0,t);o=Math.max(0,o);if(t+o>=e){o=Math.max(o>0?1:0,o-Math.max(0,t+o-(e-1)));t=Math.max(t>0?1:0,t-Math.max(0,t+o-(e-1)))}if(t+o>=e){o=0}if(t+o>=e){t=0}return{count:e,scrollable:e-t-o,fixedTop:t,fixedBottom:o}};i.prototype.getRowCountConstraints=function(){const e=this.getTable();return e?e.getProperty("rowCountConstraints")||{}:{}};i.prototype.renderRowStyles=function(e){};i.prototype.renderCellContentStyles=function(e){};i.prototype.renderInTableBottomArea=function(e){const t=this.getTableBottomPlaceholderStyles();if(t===undefined){return}e.openStart("div",this.getTable().getId()+"-placeholder-bottom");e.class("sapUiTablePlaceholder");this.applyTableBottomPlaceholderStyles(e);e.openEnd();e.close("div")};i.prototype.initTableRowsAfterDataRequested=function(e){const t=this.getTable();const o=t.getBinding();clearTimeout(t._mTimeouts.refreshRowsCreateRows);if(!o||e<=0||t.getRows().length>0){return}o.attachEventOnce("dataRequested",function(){clearTimeout(t._mTimeouts.refreshRowsCreateRows);t._mTimeouts.refreshRowsCreateRows=setTimeout(function(){if(t.getRows().length>0){return}const o=l(t,e);let n;for(let e=0;e<o.length;e++){n=o[e];n.setRowBindingContext(null,t);t.addAggregation("rows",n,true)}t._bRowAggregationInvalid=false},0)})};i.prototype.updateTableRows=function(){const t=this.getTable();let o=t.getRows();let n=this.getComputedRowCounts().count;let s=false;if(e.isNoDataVisible(t)&&!t.getBinding()){n=0}else if(e.isVariableRowHeightEnabled(t)&&n>0){n++}const i=t.getDomRef("tableCCnt");const r=window.getSelection();if(i&&r.containsNode(i,true)){r.empty()}if(t._bRowAggregationInvalid){s=o.length>0;t.destroyAggregation("rows",t._bInvalid?"KeepDom":true);o=[]}if(n===o.length){h(this,o);return s}e.dynamicCall(t._getSyncExtension,function(e){e.syncRowCount(n)});a(this,n);s=true;t._bRowAggregationInvalid=false;return s};i.prototype.renderTableRows=function(){const e=this.getTable();const t=e?e.getDomRef("tableCCnt"):null;if(!t){return}const s=jQuery.Event("BeforeRendering");s.setMarked("renderRows");s.srcControl=e;e._handleEvent(s);const i=(new o).getInterface();const r=e.getRenderer();r.renderTableCCnt(i,e);i.flush(t,false,false);i.destroy();const a=jQuery.Event("AfterRendering");a.setMarked("renderRows");a.srcControl=e;e._handleEvent(a);const l=e.getRows().length>0;const h=e.getDomRef();h.querySelector(".sapUiTableCtrlBefore").setAttribute("tabindex",l?"0":"-1");h.querySelector(".sapUiTableCtrlAfter").setAttribute("tabindex",l?"0":"-1");if(n.browser.safari){const t=document.getElementById(e.getId()+"-header");const o=document.getElementById(e.getId()+"-table");o.style.width=t.style.width}};i.prototype.getRowContexts=function(e){const t=this.getTable();return t?t._getRowContexts(e):[]};i.prototype.fireRowsUpdated=function(t){const o=this.getTable();if(!o||!o._bContextsAvailable){return}if(!this._bFiredRowsUpdatedAfterRendering){t=e.RowsUpdateReason.Render;if(!s(this).bListeningForFirstRowsUpdatedAfterRendering){s(this).bListeningForFirstRowsUpdatedAfterRendering=true;o.attachEvent("_rowsUpdated",function(){this._bFiredRowsUpdatedAfterRendering=true;s(this).bListeningForFirstRowsUpdatedAfterRendering=false}.bind(this))}}o._fireRowsUpdated(t)};i.prototype.disableNoData=function(){if(this.isNoDataDisabled()){return}s(this).bNoDataDisabled=true;const e=this.getTable();if(e){e.invalidate()}};i.prototype.enableNoData=function(){if(!this.isNoDataDisabled()){return}s(this).bNoDataDisabled=false;const e=this.getTable();if(e){e.invalidate()}};i.prototype.isNoDataDisabled=function(){return s(this).bNoDataDisabled};function a(e,t){const o=e.getTable();let n=o.getRows();if(n.length<t){const s=l(o,t-n.length);n=n.concat(s);h(e,n);s.forEach(function(e){o.addAggregation("rows",e,true)})}else{for(let e=n.length-1;e>=t;e--){o.removeAggregation("rows",e,true)}n.splice(t);h(e,n)}}function l(e,t){const o=[];const n=e.getRows().length;for(let s=0;s<t;s++){o.push(e._getRowClone(n+s))}return o}function h(e,t){const o=e.getTable();if(!o||t.length===0){return}const n=e.getRowContexts(t.length);for(let e=0;e<t.length;e++){t[e].setRowBindingContext(n[e],o)}}function d(e,t){throw new Error(e+": sap.ui.table.rowmodes.RowMode subclass does not implement #"+t)}r.onBeforeRendering=function(t){const o=t&&t.isMarked("renderRows");if(!o){this._bFiredRowsUpdatedAfterRendering=false;this.updateTable(e.RowsUpdateReason.Render)}};return i});
//# sourceMappingURL=RowMode.js.map