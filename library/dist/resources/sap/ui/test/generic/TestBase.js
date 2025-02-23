/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/generic/Utils","sap/ui/dom/includeStylesheet","sap/ui/core/ElementRegistry","require"],function(t,e,i,s,n){"use strict";var r=new Set;return t.extend("sap.ui.test.generic.TestBase",{shouldIgnoreControl:function(t,e){return false},testControl:function(t,e){},getObjectCapabilities:function(t){if(t){return this._mObjectCapabilities[t]}else{return this._mObjectCapabilities}},run:function(t){return i({url:n.toUrl("test-resources/sap/ui/core/qunit/generic/helper/_cleanupStyles.css")}).then(function(){return Promise.all(t.map(function(t){var e=t.className;var i=e.startsWith(this._sLibName)?e.slice(this._sLibName.length):e;QUnit.test(i,function(e){if(!this.shouldIgnoreControl(t,e)){this._iFullyTestedControls++;return this.testControl.apply(this,[t,e])}else{this._iIgnoredOrExcludedControls++;return Promise.resolve()}}.bind(this))}.bind(this))).then(function(){QUnit.test("Statistics",function(t){t.ok(true,"Total number of found controls: "+this._iAllControls);t.ok(true,"Total number of ignored or excluded controls: "+this._iIgnoredOrExcludedControls);t.ok(true,"Number of fully tested controls: "+this._iFullyTestedControls)}.bind(this))}.bind(this))}.bind(this))},setupAndStart:function(t){this._iAllControls=0;this._iIgnoredOrExcludedControls=0;this._iFullyTestedControls=0;this._oTestParameters=window["sap-ui-test-config"];this._mObjectCapabilities=this._oTestParameters.objectCapabilities||{};this._sLibName=this._oTestParameters.library;return e.loadAllControls(this._oTestParameters,{includeElements:t&&t.includeElements}).then(function(t){QUnit.module(this.getMetadata().getName()+" Tests - "+this._sLibName,{afterEach:function(t){s.forEach(function(e,i){try{e.destroy()}catch(e){if(!r.has(i)){r.add(i);t.notOk(i,"Destruction of element with id '"+i+"' failed.")}}})}});if(t.length===0){QUnit.test("No classes to test for library '"+this._sLibName+"'.",function(t){t.ok(true,"Nothing to test.")})}else{this._iAllControls=t.length;return this.run(t)}}.bind(this))}})});
//# sourceMappingURL=TestBase.js.map