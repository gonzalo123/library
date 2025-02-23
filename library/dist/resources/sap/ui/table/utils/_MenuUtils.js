/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/unified/Menu","sap/ui/unified/MenuItem"],function(e,t,n){"use strict";function l(e,t){const n=t.getRowBindingContext();const l=e.getFilterProperty();let o=n.getProperty(l);if(o!=null&&typeof o!=="string"){o=o.toString()}if(this.getEnableCustomFilter()){this.fireCustomFilter({column:e,value:o})}else{this.filter(e,o)}}const o={TableUtils:null,openContextMenu:function(e,t){const n=o.TableUtils.getCell(e,t.target);const l=o.TableUtils.getCellInfo(n);if(l.isOfType(o.TableUtils.CELLTYPE.COLUMNHEADER)){e.getColumns()[l.columnIndex]._openHeaderMenu(l.cell);t.preventDefault()}else if(l.isOfType(o.TableUtils.CELLTYPE.ANYCONTENTCELL)){if(l.columnIndex>=0){const n=o.TableUtils.getRowColCell(e,l.rowIndex,l.columnIndex,true);const u=e.fireCellContextmenu({rowIndex:n.row.getIndex(),columnIndex:l.columnIndex,columnId:n.column.getId(),cellControl:n.cell,rowBindingContext:n.row.getRowBindingContext(),cellDomRef:l.cell});if(!u){t.preventDefault()}}o._openContentCellContextMenu(e,l,t)}},_openContentCellContextMenu:function(e,t,n){const l=e.getRows()[t.rowIndex];if(l.isEmpty()){return}if(l.isGroupHeader()||l.isSummary()||!e.getContextMenu()){o._openDefaultContentCellContextMenu(e,t,n)}else{o._openCustomContentCellContextMenu(e,t,n)}},_openCustomContentCellContextMenu:function(e,t,n){const l=e.getRows()[t.rowIndex];const o=e.getContextMenu();o.setBindingContext(l.getRowBindingContext(),e.getBindingInfo("rows").model);const u=e.fireBeforeOpenContextMenu({rowIndex:l.getIndex(),columnIndex:t.columnIndex>=0?t.columnIndex:null,contextMenu:o});if(u){e.getContextMenu()?.openAsContextMenu(n,t.cell);n.preventDefault()}},_openDefaultContentCellContextMenu:function(u,C,i){const s=C.rowIndex;const c=u.getRows()[s];const r=u.getColumns()[C.columnIndex];if(!u._oCellContextMenu){u._oCellContextMenu=new t(u.getId()+"-cellcontextmenu")}const x=u._oCellContextMenu.getId()+"-cellfilter";let f=e.getElementById(x);if(u.getEnableCellFilter()&&r?.isFilterableByMenu()&&!c.isGroupHeader()&&!c.isSummary()){if(!f){f=new n({id:x,text:o.TableUtils.getResourceText("TBL_FILTER")});f._onSelect=l.bind(u,r,c);f.attachSelect(f._onSelect)}else{f.detachSelect(f._onSelect);f._onSelect=l.bind(u,r,c);f.attachSelect(f._onSelect)}u._oCellContextMenu.insertItem(f,0)}else if(f){u._oCellContextMenu.removeItem(f)}o.TableUtils.Hook.call(u,o.TableUtils.Hook.Keys.Table.OpenContextMenu,C,u._oCellContextMenu);if(u._oCellContextMenu.getItems().length===0){return}u._oCellContextMenu.openAsContextMenu(i,C.cell);i.preventDefault()},closeContentCellContextMenu:function(e){e.getContextMenu()?.close?.();e._oCellContextMenu?.close()},cleanupDefaultContentCellContextMenu:function(t){if(!t._oCellContextMenu){return}const n=t._oCellContextMenu.getId()+"-cellfilter";e.getElementById(n)?.destroy();t._oCellContextMenu.removeAllItems();t._oCellContextMenu.destroy();delete t._oCellContextMenu}};return o},true);
//# sourceMappingURL=_MenuUtils.js.map