/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils"],function(t,e){"use strict";const o={onAfterRendering:function(){this.attachScrollbar()}};const l=t.extend("sap.ui.table.extensions.ScrollingIOS",{_init:function(t){e.addDelegate(t,o,this);this.attachScrollbar();return"ScrollIOSExtension"},destroy:function(){const l=this.getTable();e.removeDelegate(l,o);clearTimeout(this._iUpdateDefaultScrollbarPositionTimeoutId);t.prototype.destroy.apply(this,arguments)},_attachEvents:function(){const t=this.getTable();e.Hook.register(t,e.Hook.Keys.Table.TotalRowCountChanged,this.onTotalRowCountChanged,this);e.Hook.register(t,e.Hook.Keys.Table.UpdateSizes,this.onUpdateTableSizes,this)},_detachEvents:function(){const t=this.getTable();const o=t._getScrollExtension().getVerticalScrollbar();if(o){o.removeEventListener("scroll",this._onVerticalScrollEventHandler)}delete this._onVerticalScrollEventHandler;const l=this.getVerticalScrollbar();if(l){l.removeEventListener("pointerdown",this._onPointerDownEventHandler)}delete this._onPointerDownEventHandler;const i=this.getVerticalScrollbarThumb();if(i){i.removeEventListener("touchmove",this._onTouchMoveEventHandler)}delete this._onTouchMoveEventHandler;e.Hook.deregister(t,e.Hook.Keys.Table.TotalRowCountChanged,this.onTotalRowCountChanged,this);e.Hook.deregister(t,e.Hook.Keys.Table.UpdateSizes,this.onUpdateTableSizes,this)}});l.prototype.onUpdateTableSizes=function(){this.updateVerticalScrollbarThumbHeight();this.updateVerticalScrollbarThumbPosition()};l.prototype.onTotalRowCountChanged=function(){this.updateVerticalScrollbarThumbHeight()};l.prototype.attachScrollbar=function(){const t=this.getTable();const e=t._getScrollExtension().getVerticalScrollbar();let o=this.getVerticalScrollbar();let l=this.getVerticalScrollbarThumb();if(!e||!e.isConnected){return}if(!o){o=document.createElement("div");o.setAttribute("id",t.getId()+"-vsb-ios");o.classList.add("sapUiTableVSbIOS");l=document.createElement("div");l.classList.add("sapUiTableVSbIOSThumb");o.append(l);e.after(o)}if(!this._onPointerDownEventHandler){this._onPointerDownEventHandler=this.onPointerDown.bind(this);o.addEventListener("pointerdown",this._onPointerDownEventHandler);this._onTouchMoveEventHandler=this.onTouchMove.bind(this);l.addEventListener("touchmove",this._onTouchMoveEventHandler);this._onVerticalScrollEventHandler=this.updateVerticalScrollbarThumbPosition.bind(this);e.addEventListener("scroll",this._onVerticalScrollEventHandler)}this.updateVerticalScrollbar()};l.prototype.getVerticalScrollbar=function(){const t=this.getTable();return t?t.getDomRef("vsb-ios"):null};l.prototype.getVerticalScrollbarThumb=function(){const t=this.getVerticalScrollbar();return t?t.firstElementChild:null};l.prototype.updateVerticalScrollbar=function(){const t=this.getTable();const e=this.getVerticalScrollbar();e.style.height=t._getScrollExtension().getVerticalScrollbarHeight()+"px";e.style.top=Math.max(0,t._getRowCounts().fixedTop*t._getBaseRowHeight()-1)+"px";this.updateVerticalScrollbarThumbPosition();this.updateVerticalScrollbarThumbHeight()};l.prototype.updateVerticalScrollbarThumbPosition=function(){const t=this.getVerticalScrollbarThumb();if(t){t.style.top=this.getCalculateThumbOffset()+"px"}};l.prototype.updateVerticalScrollbarThumbHeight=function(){const t=this.getTable();const e=t._getScrollExtension();const o=this.getVerticalScrollbarThumb();if(o){if(e.isVerticalScrollbarRequired()){o.style.height=this.getCalculateThumbHeight()+"px"}else{o.style.height="0"}}};l.prototype.getCalculateThumbHeight=function(){const t=this.getTable();const e=t._getScrollExtension();const o=e.getVerticalScrollbarHeight();const l=e.getVerticalScrollHeight();return Math.round(Math.pow(o,2)/l)};l.prototype.getCalculateThumbOffset=function(){const t=this.getTable();const e=t._getScrollExtension();const o=e.getVerticalScrollbarHeight();const l=e.getVerticalScrollHeight();const i=e.getVerticalScrollbar();const n=i?e.getVerticalScrollbar().scrollTop:0;return Math.round(n*o/l)};l.prototype.onTouchMove=function(t){const e=this.getTable();const o=e._getScrollExtension();const l=this.getVerticalScrollbarThumb();const i=l.getBoundingClientRect().y;const n=this.getCalculateThumbHeight();const r=l.offsetTop+t.touches[0].pageY-i-n/2;const a=Math.min(o.getVerticalScrollbarHeight()-n,Math.max(0,r));t.preventDefault();t.stopPropagation();l.style.top=a+"px";clearTimeout(this._iUpdateDefaultScrollbarPositionTimeoutId);this._iUpdateDefaultScrollbarPositionTimeoutId=setTimeout(function(){this.updateDefaultScrollbarPosition(a,n);delete this._iUpdateDefaultScrollbarPositionTimeoutId}.bind(this),30)};l.prototype.onPointerDown=function(t){const e=this.getTable();const o=e._getScrollExtension();const l=this.getVerticalScrollbarThumb();const i=l.getBoundingClientRect().y;const n=this.getCalculateThumbHeight();const r=l.offsetTop+t.clientY-i-n/2;const a=Math.min(o.getVerticalScrollbarHeight()-n,Math.max(0,r));t.preventDefault();t.stopPropagation();l.style.top=a+"px";this.updateDefaultScrollbarPosition(a,n)};l.prototype.updateDefaultScrollbarPosition=function(t,e){const o=this.getTable();if(!o){return}const l=o._getScrollExtension();const i=l.getVerticalScrollbarHeight();if(t+e>=i){l.scrollVerticallyMax(true)}else{const e=t*l.getVerticalScrollHeight()/i;const o=l.getVerticalScrollbar();o.scrollTop=e}};return l});
//# sourceMappingURL=ScrollingIOS.js.map