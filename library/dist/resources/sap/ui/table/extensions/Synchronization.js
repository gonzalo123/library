/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","../library","sap/base/Log","sap/ui/core/RenderManager"],function(e,t,n,o,r){"use strict";const l={setRowSelection:function(e,n){const o=this.getTable();const r=o.getRows()[e];if(r&&n!=null){t.toggleRowSelection(o,r,n)}},setRowHover:function(e,t){const n=this.getTable();const o=n.getRows()[e];if(o&&t!=null){o._setHovered(t)}},addVerticalScrollingListener:function(e){const t=this.getTable();const n=t._getSyncExtension();const o=t._getScrollExtension();const r={scrollDirection:o.constructor.ScrollDirection.VERTICAL};l.removeVerticalScrollingListener.call(this);if(!e){return}if(e.wheelAreas){n._mMouseWheelEventListener=o.registerForMouseWheel(e.wheelAreas,r);n._mMouseWheelEventListener.areas=e.wheelAreas}if(e.touchAreas){n._mTouchEventListener=o.registerForTouch(e.touchAreas,r);n._mTouchEventListener.areas=e.touchAreas}},removeVerticalScrollingListener:function(){const e=this.getTable();const t=e._getSyncExtension();function n(e,t){for(const n in t){const o=t[n];if(o){for(let t=0;t<e.length;t++){e[t].removeEventListener(n,o)}}}}if(t._mMouseWheelEventListener){n(t._mMouseWheelEventListener.areas,t._mMouseWheelEventListener);delete t._mMouseWheelEventListener}if(t._mTouchEventListener){n(t._mTouchEventListener.areas,t._mTouchEventListener);delete t._mTouchEventListener}},placeVerticalScrollbarAt:function(e){const t=this.getTable();const o=t._getScrollExtension();if(!e){throw new Error("The HTMLElement in which the vertical scrollbar should be placed must be specified.")}if(!o.isVerticalScrollbarExternal()){const l=(new r).getInterface();t.getRenderer().renderVSbExternal(l,t);l.flush(e);const i=t.getId()+"-"+n.SharedDomRef.VerticalScrollBar;const c=e.querySelector('[id="'+i+'"]');o.markVerticalScrollbarAsExternal(c);t.invalidate()}else{e.appendChild(o.getVerticalScrollbar().parentElement);o.restoreVerticalScrollPosition()}},renderHorizontalScrollbar:function(e,t,n){const o=this.getTable();if(t==null){throw new Error("The id must be specified.")}o.getRenderer().renderHSbExternal(e,o,t,n)}};const i={onBeforeRendering:function(e){const t=this._getSyncExtension();const n=e&&e.isMarked("renderRows");const o=this.getDomRef("tableCCnt");if(!n&&o&&t._onTableContainerScrollEventHandler){o.removeEventListener("scroll",t._onTableContainerScrollEventHandler);delete t._onTableContainerScrollEventHandler}},onAfterRendering:function(e){const t=this._getScrollExtension();const n=e&&e.isMarked("renderRows");const o=this.getDomRef("tableCCnt");if(t.isVerticalScrollbarExternal()&&!n){t.updateVerticalScrollbarHeight();t.updateVerticalScrollHeight()}if(!n){const e=this._getSyncExtension();e.syncInnerVerticalScrollPosition(o.scrollTop);if(!e._onTableContainerScrollEventHandler){e._onTableContainerScrollEventHandler=function(t){e.syncInnerVerticalScrollPosition(t.target.scrollTop)}}o.addEventListener("scroll",e._onTableContainerScrollEventHandler)}}};const c=e.extend("sap.ui.table.extensions.Synchronization",{_init:function(e,n,o){this._delegate=i;this._oPublicInterface={syncRowSelection:l.setRowSelection.bind(this),syncRowHover:l.setRowHover.bind(this),registerVerticalScrolling:l.addVerticalScrollingListener.bind(this),deregisterVerticalScrolling:l.removeVerticalScrollingListener.bind(this),placeVerticalScrollbarAt:l.placeVerticalScrollbarAt.bind(this),renderHorizontalScrollbar:l.renderHorizontalScrollbar.bind(this)};t.addDelegate(e,this._delegate,e);return"SyncExtension"},destroy:function(){const t=this.getTable();if(t){t.removeEventDelegate(this._delegate)}l.removeVerticalScrollingListener.call(this);this._delegate=null;this._oPublicInterface=null;e.prototype.destroy.apply(this,arguments)}});c.prototype.syncRowCount=function(e){this.callInterfaceHook("rowCount",arguments)};c.prototype.syncRowSelection=function(e,t){this.callInterfaceHook("rowSelection",arguments)};c.prototype.syncRowHover=function(e,t){this.callInterfaceHook("rowHover",arguments)};c.prototype.syncRowHeights=function(e){return this.callInterfaceHook("rowHeights",arguments)};c.prototype.syncInnerVerticalScrollPosition=function(e){this.callInterfaceHook("innerVerticalScrollPosition",arguments)};c.prototype.syncLayout=function(e){this.callInterfaceHook("layout",arguments)};c.prototype.callInterfaceHook=function(e,n){const r={};r[e]=Array.prototype.slice.call(n);o.debug("sap.ui.table.extensions.Synchronization","Sync "+e+"("+r[e]+")",this.getTable());return t.dynamicCall(this._oPublicInterface,r)};c.prototype.getInterface=function(){return this._oPublicInterface};return c});
//# sourceMappingURL=Synchronization.js.map