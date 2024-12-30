/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var e=[],t=/[()]/g,n=c(),r=[],a,i=/\w/;function s(e,t,n,a){if(t>=0){if(n){r[e].branchTracking[t].truthy+=1}else{r[e].branchTracking[t].falsy+=1}}if(a>=0){u(e,a)}return n}function o(e,t,n){var r=parseInt(e.getAttribute(t));return r>0?r:n}function c(){var e,t=document.getElementsByTagName("script"),n,r;for(n=0,r=t.length;n<r;n+=1){e=t[n];if(/BranchTracking.js$/.test(e.getAttribute("src"))){return e}}}function l(t,n){var a=blanket.options("branchTracking"),i=e.length,s=t.inputFileName,o,c=t.inputFile,l;e.push(s);r[i]=_$blanket[s]=[];if(a){_$blanket[s].branchTracking=[]}_$blanket[s].source=c.split("\n");_$blanket[s].source.unshift("");_$blanket[s].warnings=[];l=""+falafel(c,{loc:true,range:true,source:c},f.bind(null,a,i));o=l.split("\n").length+1;if(o!==_$blanket[s].source.length){h(s,"Line length mismatch! "+_$blanket[s].source.length+" vs. "+o)}n(l)}function u(e,t){r[e][t]+=1}function f(e,n,a){var s=r[n],o=s.branchTracking,c=a.loc.start.line,l;function u(){a.update("blanket.$l("+n+", "+c+"); "+a.source());f();return true}function f(){if(c in s){h(n,"Multiple statements on same line detected"+" – minified code not supported! Line number "+c)}s[c]=0}function d(){return a.loc.source.slice(a.left.range[1],a.right.range[0]).replace(t,"")}switch(a.type){case"FunctionDeclaration":case"FunctionExpression":if(a.body.body[0]&&c===a.body.body[0].loc.start.line){h(n,"Function body must not start on same line! Line number "+c)}break;default:}switch(a.type){case"AssignmentExpression":case"ArrayExpression":case"BlockStatement":case"BinaryExpression":case"Block":case"CallExpression":case"CatchClause":case"DebuggerStatement":case"EmptyStatement":case"FunctionExpression":case"Identifier":case"Line":case"Literal":case"MemberExpression":case"NewExpression":case"ObjectExpression":case"Program":case"Property":case"SequenceExpression":case"SwitchCase":case"ThisExpression":case"UnaryExpression":case"UpdateExpression":case"VariableDeclarator":return false;case"ConditionalExpression":if(!e){return false}a.test.update("blanket.$b("+n+", "+o.length+", "+a.test.source()+")");o.push({alternate:a.alternate.loc,consequent:a.consequent.loc,falsy:0,truthy:0});return true;case"ExpressionStatement":if(a.expression.type==="Literal"&&a.expression.value==="use strict"){return false}case"DoWhileStatement":case"ForInStatement":case"ForStatement":case"WhileStatement":case"WithStatement":case"BreakStatement":case"ContinueStatement":case"FunctionDeclaration":case"ReturnStatement":case"SwitchStatement":case"ThrowStatement":case"TryStatement":return u(a);case"IfStatement":a.test.update("blanket.$b("+n+", "+(e?o.length:-1)+", "+a.test.source()+", "+c+")");f();if(e){o.push({alternate:(a.alternate||a.test).loc,consequent:a.consequent.loc,falsy:0,truthy:0})}return true;case"LogicalExpression":if(!e){return false}if(a.operator==="||"||a.operator==="&&"){l="blanket.$b("+n+", "+o.length+", "+a.left.source()+") "+d()+" ("+a.right.source()+")";if(!i.test(a.loc.source[a.range[0]])){l=" "+l}a.update(l);o.push({alternate:a.operator==="&&"?a.left.loc:a.right.loc,consequent:a.operator==="&&"?a.right.loc:a.left.loc,falsy:0,truthy:0})}return true;case"VariableDeclaration":if(a.parent.type==="ForInStatement"||a.parent.type==="ForStatement"){return false}return u(a);case"LabeledStatement":default:throw new Error(a.source())}}function h(t,n){var r=typeof t==="string"?t:e[t];jQuery.sap.log.warning(n,r,"sap.ui.test.BranchTracking");_$blanket[r].warnings.push(n)}function d(){var e={},t=[],n;QUnit.begin(function(t){n=t.modules.length;t.modules.forEach(function(t){e[t.name]=t})});QUnit.moduleStart(function(n){t=t.concat(Object.keys(e).filter(function(t){return e[t].tests===n.tests}))});return function(){return t.length<n?t:undefined}}if(window.blanket){window._$blanket={};blanket.$b=s;blanket.$l=u;blanket.instrument=l;var p=d(),b=o(n,"data-lines-of-context",3);a=Math.min(o(n,"data-threshold",0),100);sap.ui.require(["sap/ui/test/BlanketReporter"],function(e){blanket.options("reporter",e.bind(null,b,a,p))})}var g,m="sap.ui.base.SyncPromise",k={},y,$,w=0,v,S={},E=new Map;function j(e,t){var n,r=_$blanket[e.$currentFileName],a=k[e.$currentFileName],i;if(e.$oldHits){i=Object.keys(r).filter(function(t){return!(a&&a[t])&&r[t]===e.$oldHits[t]});t.notOk(i.length,"Some lines have not been covered by this module in isolation: "+i)}if(e.$oldBranchTracking){n=Object.keys(r.branchTracking).filter(function(t){return r.branchTracking[t].falsy===e.$oldBranchTracking[t].falsy||r.branchTracking[t].truthy===e.$oldBranchTracking[t].truthy});t.notOk(n.length,"Some branches have not been fully covered by this module in isolation: "+n)}}function x(e){var t,n=Object.keys(S).length+(E?E.size:0),r="Uncaught (in promise): "+n+" times\n",a,i,s,o;if(n){for(t in S){a=S[t];if(a.getResult()&&a.getResult().stack){r+=a.getResult().stack}else{r+=a.getResult()}if(a.$error.stack){r+="\n>>> SyncPromise rejected with above reason...\n"+a.$error.stack.split("\n").slice(2).join("\n")}r+="\n\n"}S={};if(E&&E.size){o=E.values();for(;;){s=o.next();if(s.done){break}i=s.value;r+=(i&&i.stack||i)+"\n\n"}E.clear()}if(e){e(r)}else if(g){jQuery.sap.log.info("Clearing "+n+" uncaught promises",r,m)}}}if(n.getAttribute("data-uncaught-in-promise")!=="true"){window.addEventListener("unhandledrejection",function(e){if(e.reason&&e.reason.$uncaughtInPromise){return}if(E){E.set(e.promise,e.reason);e.preventDefault()}else{alert("Uncaught (in promise) "+e.reason)}});window.addEventListener("rejectionhandled",function(e){if(E){E.delete(e.promise)}})}function T(e,t){if(t){delete S[e.$id];if(g){jQuery.sap.log.info("Promise "+e.$id+" caught",Object.keys(S),m)}return}e.$id=w++;e.$error=new Error;S[e.$id]=e;if(g){jQuery.sap.log.info("Promise "+e.$id+" rejected with "+e.getResult(),Object.keys(S),m)}}function Q(e,t){var n,r,i,s;t=t||{};n=t.after||function(){};r=t.afterEach||function(){};i=t.before||function(){};s=t.beforeEach||function(){};t.after=function(e){if(window.blanket&&!y&&!v&&!this.__ignoreIsolatedCoverage__&&a>=100&&!e.test.module.stats.bad){j(this,e)}return n.apply(this,arguments)};t.afterEach=function(e){var t=x.bind(null,e.ok.bind(e,false));function n(e){t();throw e}function a(e){if(e&&typeof e.then==="function"){return e.then(a,n)}t();return e}try{return a(r.apply(this,arguments))}catch(e){n(e)}};t.before=function(e){var t;this.$currentFileName=jQuery.sap.getResourceName(e.test.module.name);t=window.blanket&&_$blanket[this.$currentFileName];if(t){this.$oldHits=t.slice();if(t.branchTracking){this.$oldBranchTracking=JSON.parse(JSON.stringify(t.branchTracking,["falsy","truthy"]))}t.warnings.forEach(function(t){e.ok(false,t)})}return i.apply(this,arguments)};t.beforeEach=function(e){x();return s.apply(this,arguments)};$(e,t)}if(QUnit.module!==Q){$=QUnit.module.bind(QUnit);QUnit.module=Q;sap.ui.require(["sap/base/Log","sap/ui/base/SyncPromise"],function(e,t){var n=new URLSearchParams(window.location.search);g=e.isLoggable(e.Level.INFO,m);y=n.get("filter");v=n.get("testId");t.listener=T});QUnit.begin(function(){var e,t;jQuery("body").css("overflow","scroll");jQuery("#qunit-modulefilter-dropdown-list").css("max-height","none");jQuery("#qunit-modulefilter-dropdown").on("click",function(e){if(e.target.tagName==="LABEL"){setTimeout(function(){jQuery("#qunit-modulefilter-actions").children().first().trigger("click")})}});if(window.blanket){for(e in _$blanket){t=_$blanket[e];k[e]=t.slice()}}});QUnit.done(function(){E=null})}})();
//# sourceMappingURL=BranchTracking.js.map