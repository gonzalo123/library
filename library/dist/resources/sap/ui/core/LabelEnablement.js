/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/ManagedObject","sap/base/assert"],function(e,t){"use strict";var r={};const n={};var i;function a(e,t){if(!e){return null}i??=sap.ui.require("sap/ui/core/Element");var r=i.getElementById(e);if(r&&t&&(!r.isA("sap.ui.core.Control")||r.getDomRef())){r.invalidate()}return r}function l(e,t){const r=e.getLabelFor()||e._sAlternativeId||"";const n={controlId:r};i??=sap.ui.require("sap/ui/core/Element");const a=i.getElementById(r);if(a&&typeof a.getIdForLabel==="function"){const l=a.getIdForLabel();if(l!==a.getId()){const o=document.getElementById(l);if(!o){const r={onAfterRendering:function(e){this.removeEventDelegate(r);if(typeof t==="function"){t(e)}}.bind(a,e)};a.addEventDelegate(r)}else{const e=i.closestTo(o);const t=e.getId();if(t!==r){n.innerControlId=t}}}}return n}function o(e,t,i){var s=e.getId();var u=e.__sLabeledControl;var d=t?null:l(e,e=>{if(!i){o(e,false,true)}});if(d&&u===d.controlId&&d.innerControlId===n[d.controlId]){return}if(!t){e.invalidate()}if(d?.controlId){e.__sLabeledControl=d.controlId}else{delete e.__sLabeledControl}var f;if(u){f=r[u];if(f){const e=n[u];f=f.filter(function(e){return e!=s});if(f.length){r[u]=f;if(e){r[e]=f}}else{delete r[u];if(e){delete r[e];delete n[u]}}}}if(d?.controlId){f=r[d.controlId]||[];f.push(s);r[d.controlId]=f;if(d.innerControlId){r[d.innerControlId]=f;n[d.controlId]=d.innerControlId}else{const e=n[d.controlId];if(e){delete r[e];delete n[d.controlId]}}}var c=a(u,true);var g=a(d?.controlId,true);if(c){e.detachRequiredChange(c)}if(g){e.attachRequiredChange(g)}}function s(e){if(!e){throw new Error("sap.ui.core.LabelEnablement cannot enrich null")}var t=e.getMetadata();if(!t.isInstanceOf("sap.ui.core.Label")){throw new Error("sap.ui.core.LabelEnablement only supports Controls with interface sap.ui.core.Label")}var r=t.getAssociation("labelFor");if(!r||r.multiple){throw new Error("sap.ui.core.LabelEnablement only supports Controls with a to-1 association 'labelFor'")}}function u(e){if(!e){return true}if(e.isA("sap.ui.core.ILabelable")){return e.hasLabelableHTMLElement()}return true}var d={};d.writeLabelForAttribute=function(e,t){if(!t){return}const r=l(t,e=>{e.invalidate()});if(!r.controlId){return}i??=sap.ui.require("sap/ui/core/Element");const n=i.getElementById(r.innerControlId||r.controlId);if(n&&typeof n.getIdForLabel==="function"&&u(n)){e.attr("for",n.getIdForLabel())}};d.getReferencingLabels=function(e){var t=e?e.getId():null;if(!t){return[]}return r[t]||[]};d._getLabelTexts=function(e){const t={};const r=e.getFieldHelpInfo?.();if(r?.label){t.label=r.label}let n=d.getReferencingLabels(e);if(n.length){t.labelledby=n}if(e.getMetadata().getAssociation("ariaLabelledBy")){n=e.getAriaLabelledBy();if(n.length){t.labelledby??=[];n.forEach(e=>{if(!t.labelledby.includes(e)){t.labelledby.push(e)}})}}if(t.labelledby?.length){t.labelledby=t.labelledby.join(" ")}e.getParent()?.enhanceAccessibilityState?.(e,t);const a=t.label?[t.label]:[];if(t.labelledby){t.labelledby.split(" ").forEach(e=>{const t=i.getElementById(e);if(t){const e=t.getText?.()||t.getDomRef()?.innerText;if(e){a.push(e)}}})}return a};d.isRequired=function(e){if(f(e)){return true}var t=d.getReferencingLabels(e),r;i??=sap.ui.require("sap/ui/core/Element");for(var n=0;n<t.length;n++){r=i.getElementById(t[n]);if(f(r)){return true}}return false};function f(e){return!!(e&&e.getRequired&&e.getRequired())}d.enrich=function(n){s(n);n.__orig_setLabelFor=n.setLabelFor;n.setLabelFor=function(e){var t=this.__orig_setLabelFor.apply(this,arguments);o(this);return t};n.__orig_exit=n.exit;n.exit=function(){this._sAlternativeId=null;o(this,true);if(n.__orig_exit){n.__orig_exit.apply(this,arguments)}};n.setAlternativeLabelFor=function(r){if(r instanceof e){r=r.getId()}else if(r!=null&&typeof r!=="string"){t(false,"setAlternativeLabelFor(): sId must be a string, an instance of sap.ui.base.ManagedObject or null");return this}this._sAlternativeId=r;o(this);return this};n.getLabelForRendering=function(){var e=this.getLabelFor()||this._sAlternativeId;var t=a(e);var r;i??=sap.ui.require("sap/ui/core/Element");if(t&&!t.isA("sap.ui.core.ILabelable")&&t.getIdForLabel&&t.getIdForLabel()){r=i.getElementById(t.getIdForLabel());if(r){t=r}}return u(t)?e:""};n.isLabelFor=function(e){var t=e.getId();var n=r[t];return n&&n.indexOf(this.getId())>-1};if(!n.getMetadata().getProperty("required")){return}n.__orig_setRequired=n.setRequired;n.setRequired=function(e){var t=this.getRequired(),r=this.__orig_setRequired.apply(this,arguments);if(this.getRequired()!==t){a(this.__sLabeledControl,true)}return r};n.isRequired=function(){var e=a(this.getLabelForRendering(),false);return f(this)||f(e)};n.isDisplayOnly=function(){if(this.getDisplayOnly){return this.getDisplayOnly()}else{return false}};n.isWrapping=function(){if(this.getWrapping){return this.getWrapping()}else{return false}};n.disableRequiredChangeCheck=function(e){this._bNoRequiredChangeCheck=e};n.attachRequiredChange=function(e){if(e&&!this._bNoRequiredChangeCheck){if(e.getMetadata().getProperty("required")){e.attachEvent("_change",l,this)}this._bRequiredAttached=true}};n.detachRequiredChange=function(e){if(e&&!this._bNoRequiredChangeCheck){if(e.getMetadata().getProperty("required")){e.detachEvent("_change",l,this)}this._bRequiredAttached=false}};function l(e){if(e.getParameter("name")=="required"){this.invalidate()}}n.__orig_onAfterRendering=n.onAfterRendering;n.onAfterRendering=function(e){var t;if(this.__orig_onAfterRendering){t=this.__orig_onAfterRendering.apply(this,arguments)}if(!this._bNoRequiredChangeCheck&&!this._bRequiredAttached&&this.__sLabeledControl){var r=a(this.__sLabeledControl,false);this.attachRequiredChange(r)}return t}};return d},true);
//# sourceMappingURL=LabelEnablement.js.map