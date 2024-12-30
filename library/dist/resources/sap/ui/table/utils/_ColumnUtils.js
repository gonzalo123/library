/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","../library","sap/base/Log"],function(e,n,t){"use strict";const o={TableUtils:null,initColumnUtils:function(e){if(!e._oColumnInfo){o.updateColumnInfo(e,o.collectColumnInfo(e))}},invalidateColumnUtils:function(e){e._oColumnInfo=null},updateColumnInfo:function(e,n){e._oColumnInfo=n},collectColumnInfo:function(e){return{columnCount:e.getColumns().length,visibleColumnCount:o.TableUtils.getVisibleColumnCount(e),columnMap:o.getColumnMap(e)}},getColumnMap:function(e){let n;let t;let l={};const u={};const i=e.getColumns();const r=o.TableUtils.getHeaderRowCount(e);const s={};for(let e=0;e<i.length;e++){t=i[e];l={};l.id=t.getId();l.column=t;l.levelInfo=[];l.parents=[];for(let u=0;u<r;u++){l.levelInfo[u]={};l.levelInfo[u].spannedColumns=[];const r=o.getHeaderSpan(t,u);for(n=1;n<r;n++){const o=i[e+n];if(o){const r=o.getId();l.levelInfo[u].spannedColumns.push(i[e+n]);if(!s[r]){s[r]=[]}s[r].push({column:t,level:u})}}}u[l.id]=l}const a=Object.keys(s);for(n=0;n<a.length;n++){const e=a[n];u[e].parents=s[e]}return u},getColumnMapItem:function(e,n){o.initColumnUtils(e);const l=e._oColumnInfo.columnMap[n];if(!l){t.error("Column with ID '"+n+"' not found",e)}else{return l}},getParentSpannedColumns:function(e,n,t){const l=o.getColumnMapItem(e,n);if(!l){return undefined}const u=[];for(let e=0;e<l.parents.length;e++){const n=l.parents[e];if(t===undefined||n.level===t){u.push(n)}}return u},getChildrenSpannedColumns:function(e,n,t){const l=o.getColumnMapItem(e,n);if(!l){return undefined}const u=[];let i;if(t===undefined){i=l.levelInfo.length}else{i=t+1}for(let e=t||0;e<i;e++){const n=l.levelInfo[e];for(let t=0;t<n.spannedColumns.length;t++){u.push({column:n.spannedColumns[t],level:e})}}return u},getHeaderSpan:function(e,n){let t=e.getHeaderSpan();let o;if(!t){return 1}if(!Array.isArray(t)){t=(t+"").split(",")}function l(e){const n=parseInt(e);return isNaN(n)?1:n}if(isNaN(n)){o=Math.max.apply(null,t.map(l))}else{o=l(t[n])}return Math.max(o,1)},getMaxHeaderSpan:function(e){return o.getHeaderSpan(e)},hasHeaderSpan:function(e){return o.getHeaderSpan(e)>1},getColumnBoundaries:function(e,n){const t=o.getColumnMapItem(e,n);if(!t){return undefined}let l={};if(n){l[n]=t.column}const u=function(n,t){let l;let i;let r=[];t=t||[];for(i=0;i<t.length;i++){l=n[t[i]];r=r.concat(o.getParentSpannedColumns(e,l.getId()));r=r.concat(o.getChildrenSpannedColumns(e,l.getId()))}t=[];for(i=0;i<r.length;i++){l=r[i].column;const e=l.getId();if(!n[e]){t.push(e);n[e]=l}}if(t.length>0){return u(n,t)}else{return n}};l=u(l,[n]);let i=e.indexOfColumn(t.column);const r={startColumn:t.column,startIndex:i,endColumn:t.column,endIndex:-1};const s=e.getColumns();const a=Object.getOwnPropertyNames(l);for(let n=0;n<a.length;n++){const t=l[a[n]];i=e.indexOfColumn(t);const u=o.getMaxHeaderSpan(t);if(i<r.startIndex){r.startIndex=i;r.startColumn=t}const f=i+u-1;if(f>r.endIndex){r.endIndex=f;r.endColumn=s[f]}}return r},isColumnMovable:function(e,n){const t=e._getTable();if(!t||!t.getEnableColumnReordering()&&!n){return false}const l=t.indexOfColumn(e);if(l<t.getComputedFixedColumnCount()||l<t._iFirstReorderableIndex){return false}if(o.hasHeaderSpan(e)||o.getParentSpannedColumns(t,e.getId()).length!==0){return false}return true},normalizeColumnMoveTargetIndex:function(e,n){const t=e._getTable();const o=t.indexOfColumn(e);const l=t.getColumns();if(n>o){n--}if(n<0){n=0}else if(n>l.length){n=l.length}return n},isColumnMovableTo:function(e,n,t){const l=e._getTable();if(!l||n===undefined||!o.isColumnMovable(e,t)){return false}n=o.normalizeColumnMoveTargetIndex(e,n);if(n<l.getComputedFixedColumnCount()||n<l._iFirstReorderableIndex){return false}const u=l.indexOfColumn(e);const i=l.getColumns();if(n>u){const e=i[n>=i.length?i.length-1:n];const t=o.getColumnBoundaries(l,e.getId());if(o.hasHeaderSpan(e)||t.endIndex>n){return false}}else{const e=i[n];if(o.getParentSpannedColumns(l,e.getId()).length!==0){return false}}return true},moveColumnTo:function(e,n){if(!o.isColumnMovableTo(e,n)){return false}const t=e._getTable();const l=t.indexOfColumn(e);if(n===l){return false}n=o.normalizeColumnMoveTargetIndex(e,n);const u=t.fireColumnMove({column:e,newPos:n});if(!u){return false}t._bReorderInProcess=true;t.removeColumn(e,true);t.insertColumn(e,n);t._bReorderInProcess=false;return true},getMinColumnWidth:function(){return e.system.desktop?48:88},autoResizeColumn:function(e){const n=e._getTable();const t=e.getWidth();const l=o._calculateColumnWidth(e);if(l+"px"!==t){o.resizeColumn(n,e,l)}},_calculateColumnWidth:function(e){const n=e._getTable().getDomRef();const t=document.createElement("div");t.classList.add("sapUiTableHiddenSizeDetector","sapUiTableHeaderDataCell","sapUiTableDataCell");n.appendChild(t);const l=Array.from(n.querySelectorAll(`td[data-sap-ui-colid="${e.getId()}"]:not([colspan])`)).filter(e=>!e.classList.contains("sapUiTableHidden")).map(e=>e.firstElementChild.cloneNode(true));l.forEach(e=>{e.removeAttribute("id");t.appendChild(e)});let u=t.getBoundingClientRect().width+4;const i=n.querySelector(".sapUiTableCnt").getBoundingClientRect().width;u=Math.min(u,i);u=Math.max(u,o.getMinColumnWidth());n.removeChild(t);return Math.round(u)},resizeColumn:function(e,n,t,l=true,u=1){if(!e||!n||t==null||t<=0){return false}const i=o._getVisibleColumnsInSpan(e,n.getIndex(),u);const r=o._getResizableColumns(i);if(r.length===0){return false}const s=o._calculateSpanWidth(e,i);if(!o.TableUtils.isFixedColumn(e,n.getIndex())){o._fixAutoColumns(e,r)}const a=t-s;return o._performResize(e,r,a,l)},_getVisibleColumnsInSpan:function(e,n,t){const o=e.getColumns();if(n>=o.length||!o[n].getVisible()){return false}const l=[];for(let e=n;e<o.length;e++){const n=o[e];if(n.getVisible()){l.push(n);if(l.length===t){break}}}return l},_getResizableColumns:function(e){const n=[];for(let t=0;t<e.length;t++){const o=e[t];if(o.getResizable()){n.push(o)}}return n},_fixAutoColumns:function(e,n){const t=e.getDomRef();e._getVisibleColumns().forEach(function(e){const l=e.getWidth();let u;if(t&&n.indexOf(e)<0&&o.TableUtils.isVariableWidth(l)){u=t.querySelector('th[data-sap-ui-colid="'+e.getId()+'"]');if(u){e._minWidth=Math.max(u.offsetWidth,o.getMinColumnWidth())}}})},_calculateSpanWidth:function(e,n){let t=0;for(let l=0;l<n.length;l++){const u=n[l];t+=o.getColumnWidth(e,u.getIndex())}return t},_performResize:function(e,n,t,l){let u=Math.round(t/n.length);let i=false;for(let r=0;r<n.length;r++){const s=n[r];const a=o.getColumnWidth(e,s.getIndex());let f=a+u;const c=o.getMinColumnWidth();if(f<c){f=c}const d=f-a;if(Math.abs(d)<Math.abs(u)){const e=n.length-(r+1);t-=d;u=Math.round(t/e)}if(d!==0){let n=true;const t=f+"px";if(l){n=e.fireColumnResize({column:s,width:t})}if(n){s.setWidth(t);i=true}}}return i},getColumnWidth:function(e,n){if(!e||n==null||n<0){return null}const t=e.getColumns();if(n>=t.length){return null}const l=t[n];const u=l.getWidth();if(u===""||u==="auto"||u.match(/%$/)){if(l.getVisible()){const e=l.getDomRef();return e?e.offsetWidth:0}else{return 0}}else{return o.TableUtils.convertCSSSizeToPixel(u)}},getHeaderText:function(e){return e.getName()||o.getHeaderLabel(e)?.getText?.()||""},getHeaderLabel:function(e){let n;const t=e.getMultiLabels();for(let l=t.length-1;l>=0;l--){if(o.getHeaderSpan(e,l)===1){n=t[l];break}}if(!n){n=e.getLabel()}return n}};return o},true);
//# sourceMappingURL=_ColumnUtils.js.map