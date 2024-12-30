/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./MaskEnabler","./MaskInputRenderer"],function(e,t,a){"use strict";var i=e.extend("sap.m.MaskInput",{metadata:{library:"sap.m",properties:{placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null},showClearIcon:{type:"boolean",defaultValue:false},effectiveShowClearIcon:{type:"boolean",defaultValue:false,visibility:"hidden"}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"}},events:{liveChange:{parameters:{value:{type:"string"},previousValue:{type:"string"}}},submit:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},renderer:a});t.call(i.prototype);i.prototype._isMaskEnabled=function(){return true};i.prototype._revertKey=function(e,t){t=t||this._getTextSelection();let a=t.iFrom,i=t.iTo,s=a,l,r;if(!t.bHasSelection){if(e.bBackspace){s=a=this._oRules.previousTo(a)}else if(e.bDelete){l=this.getPlaceholderSymbol();r=this._oTempValue._aContent.length;while((this._oTempValue._aContent[a]===l||this._oTempValue._aInitial[a]!==l)&&a<r){a++}i=a}}if(e.bBackspace||e.bDelete&&t.bHasSelection){i=i-1}this._resetTempValue(a,i);this._bCheckForLiveChange=true;this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,s))};i.prototype.onsapenter=function(t){const a=this.getEnabled()&&this.getEditable();if(a){e.prototype.onsapenter.apply(this,arguments);this.fireSubmit({value:this.getValue()})}};return i});
//# sourceMappingURL=MaskInput.js.map