//@ui5-bundle library/Component-preload.js
sap.ui.predefine("library/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("library.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("library/controller/App.controller", ["./BaseController"],function(t){"use strict";return t.extend("library.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("library/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("library.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("library/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel"],function(e,n){"use strict";return e.extend("library.controller.Main",{onInit:function(){const e=new n(sap.ui.require.toUrl("library/data/books.json"));this.getView().setModel(e)}})});
sap.ui.predefine("library/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("library/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"library/i18n/i18n.properties":'appTitle=library\nappDescription=UI5 Application library\nbtnText=Say Hello\n',
	"library/i18n/i18n_de.properties":'appTitle=library\nappDescription=UI5 Application library\nbtnText=Sag Hallo\n',
	"library/i18n/i18n_en.properties":'appTitle=library\nappDescription=UI5 Application library\nbtnText=Say Hello\n',
	"library/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"library","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"library.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"library.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"library.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"library/view/App.view.xml":'<mvc:View\n\tcontrollerName="library.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"library/view/Form.fragment.xml":'<c:FragmentDefinition\n        xmlns:m="sap.m"\n        xmlns:c="sap.ui.core"\n        xmlns:f="sap.ui.layout.form"><f:SimpleForm><f:content><m:Label text="{i18n>CODIGO}"/><m:Select selectedKey="{/form1/idfabrica}"\n                items="{\n                  path: \'/data/masterdata/fabricas\',\n                  sorter: { path: \'nombrecompleto\' }\n                }"><c:Item text="{idfabrica} - {nombrecompleto}" key="{idfabrica}"/></m:Select></f:content></f:SimpleForm><m:Toolbar><m:Button text="{i18n>CLEAR}" press="handleCancel"/><m:ToolbarSpacer/><m:Button text="{i18n>FIND}" type="Emphasized" press="handleFind"/></m:Toolbar></c:FragmentDefinition>\n',
	"library/view/Main.view.xml":'<mvc:View\n  controllerName="library.controller.Main"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns="sap.m"\n  xmlns:c="sap.ui.core"\n  xmlns:f="sap.f"\n  height="100%"><f:DynamicPage id="dynamicPageId" headerExpanded="{/headerExpanded}" toggleHeaderOnTitleClick="{/titleClickable}"><f:title><f:DynamicPageTitle><f:heading><Title text="Mi biblioteca"/></f:heading><f:expandedContent><Label text="Biblioteca personal de libros físicos de Gonzalo Ayuso"/></f:expandedContent><f:content></f:content><f:actions></f:actions><f:navigationActions></f:navigationActions></f:DynamicPageTitle></f:title><f:header><f:DynamicPageHeader pinnable="true"><c:Fragment fragmentName="library.view.Form" type="XML"/></f:DynamicPageHeader></f:header><f:content><c:Fragment fragmentName="library.view.Table" type="XML"/></f:content><f:footer></f:footer></f:DynamicPage></mvc:View>\n',
	"library/view/Table.fragment.xml":'<mvc:View\n  xmlns:m="sap.m"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns:t="sap.ui.table"\n  controllerName="ris.controller.Main"><m:VBox class="sapUiSizeCompact"><t:Table\n      id="table"\n      selectionMode="None"\n      rows="{/Books}"\n      sort="sortDeliveryDate"\n      ariaLabelledBy="title"><t:extension></t:extension><t:columns><t:Column\n          id="Id"\n          width="3rem"\n          sortProperty="Id"><m:Label text="Id"/><t:template><m:Text text="{Id}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Title"\n          width="11rem"\n          sortProperty="Title"><m:Label text="Title"/><t:template><m:Text text="{Title}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Author"\n          width="11rem"\n          sortProperty="Author"><m:Label text="Author"/><t:template><m:Text text="{Author}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Status"\n          width="11rem"\n          sortProperty="Status"><m:Label text="Status"/><t:template><m:Text text="{Status}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Genre"\n          width="11rem"\n          sortProperty="Genre"><m:Label text="Genre"/><t:template><m:Text text="{Genre}" wrapping="false"/></t:template></t:Column><t:Column\n          id="ReadingDate"\n          width="11rem"\n          sortProperty="ReadingDate"><m:Label text="ReadingDate"/><t:template><m:Text text="{\n\t\t\t\t\t\t\t\tpath: \'ReadingDate\',\n\t\t\t\t\t\t\t\ttype: \'sap.ui.model.type.Date\',\n\t\t\t\t\t\t\t\tformatOptions: {source: {pattern: \'dd/MM/yyyy\'}, style: \'long\'}\n\t\t\t\t\t\t\t}" wrapping="false"/></t:template></t:Column></t:columns></t:Table></m:VBox></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
