//@ui5-bundle library/Component-preload.js
sap.ui.predefine("library/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("library.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("library/controller/App.controller", ["./BaseController"],function(t){"use strict";return t.extend("library.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("library/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("library.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("library/controller/Main.controller", ["./BaseController","sap/m/Dialog","sap/m/Button","sap/m/library","sap/m/List","sap/m/StandardListItem","sap/ui/model/json/JSONModel"],function(t,e,o,a,s,n,r){"use strict";return t.extend("library.controller.Main",{model:{form:{},masterdata:{}},onInit:function(){this.setModel(new r(this.model));const t=new r(sap.ui.require.toUrl("library/data/books.json?x="+Math.random()));t.attachRequestCompleted(this._onDataLoaded.bind(this))},_onDataLoaded:function(t){const e=this.getModel();const o=t.getSource().getData();const a=[...new Set(o.map(t=>t.Author))].map(t=>({value:t}));const s=[...new Set(o.map(t=>t.State))].map(t=>({value:t}));const n=[...new Set(o.map(t=>t.Genre))].map(t=>({value:t}));e.setProperty("/allBooks",o);e.setProperty("/masterdata/authors",a);e.setProperty("/masterdata/states",s);e.setProperty("/masterdata/genres",n);e.setProperty("/books",o)},handleCleanSelected:function(){const t=this.getModel();const e=t.getProperty("/allBooks");t.setProperty("/form",{});t.setProperty("/books",e)},handleBookPress:function(t){const a=t.getSource().data("Image");const s=t.getSource().data("Title");this.oDefaultDialog=new e({title:s,contentAlign:"Center",content:new sap.m.Image({src:`./data/cover/${a}`,width:"300px"}),endButton:new o({text:"Close",press:function(){this.oDefaultDialog.close()}.bind(this)})});this.getView().addDependent(this.oDefaultDialog);this.oDefaultDialog.open()},handleSearchSelected:function(){const t=this.getModel();const e=t.getProperty("/form");const o=t.getProperty("/allBooks");const a=o.filter(t=>(!e.title||t.Title.includes(e.title))&&(!e.author||t.Author===e.author)&&(!e.state||t.State===e.state)&&(!e.genre||t.Genre===e.genre)&&(!e.readingDate||t.ReadingDate===e.readingDate));t.setProperty("/books",a)}})});
sap.ui.predefine("library/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("library/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"library/i18n/i18n.properties":'appTitle=library\nappDescription=UI5 Application library\nbtnText=Say Hello\n',
	"library/i18n/i18n_en.properties":'appTitle=library\nappDescription=UI5 Application library\nbtnText=Say Hello\n',
	"library/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"library","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"library.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"library.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"library.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"library/view/App.view.xml":'<mvc:View\n\tcontrollerName="library.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"library/view/Form.fragment.xml":'<c:FragmentDefinition\n  xmlns:m="sap.m"\n  xmlns:c="sap.ui.core"\n  xmlns:f="sap.ui.layout.form"\n><f:Form editable="true" class="sapUiSizeCompact"><f:title></f:title><f:layout><f:ResponsiveGridLayout\n              labelSpanXL="4"\n              labelSpanL="3"\n              labelSpanM="4"\n              labelSpanS="12"\n              adjustLabelSpan="false"\n              emptySpanXL="0"\n              emptySpanL="4"\n              emptySpanM="0"\n              emptySpanS="0"\n              columnsXL="2"\n              columnsL="1"\n              columnsM="1"\n              singleContainerFullSize="false"/></f:layout><f:formContainers><f:FormContainer title=""><f:formElements><f:FormElement label="Título"><f:fields><m:Input\n                      value="{/form/title}"\n                      showValueHelp="false"\n                    ></m:Input></f:fields></f:FormElement><f:FormElement label="Autor"><f:fields><m:ComboBox\n                      selectedKey="{/form/author}"\n                      id="author"\n                      items="{\n                        path: \'/masterdata/authors\',\n                        sorter: {\n                          path: \'value\',\n                          descending: false\n                        }\n                        }"><c:Item text="{value}" key="{value}"/></m:ComboBox></f:fields></f:FormElement><f:FormElement label="Estado"><f:fields><m:ComboBox\n                      selectedKey="{/form/state}"\n                      items="{\n                        path: \'/masterdata/states\',\n                        sorter: {\n                          path: \'value\',\n                          descending: false\n                        }\n                        }"><c:Item text="{value}" key="{value}"/></m:ComboBox></f:fields></f:FormElement><f:FormElement label="Género"><f:fields><m:ComboBox\n                      selectedKey="{/form/genre}"\n                      items="{\n                        path: \'/masterdata/genres\',\n                        sorter: {\n                          path: \'genre\',\n                          descending: false\n                        }\n                        }"><c:Item text="{value}" key="{value}"/></m:ComboBox></f:fields></f:FormElement></f:formElements></f:FormContainer></f:formContainers></f:Form><m:Toolbar><m:Button\n      text="Limpiar"\n      type="Reject"\n      icon="sap-icon://decline"\n      press="handleCleanSelected"/><m:ToolbarSpacer/><m:Button\n      text="Buscar"\n      icon="sap-icon://search"\n      type="Emphasized"\n      press="handleSearchSelected"/></m:Toolbar></c:FragmentDefinition>\n',
	"library/view/Main.view.xml":'<mvc:View\n  controllerName="library.controller.Main"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns="sap.m"\n  xmlns:c="sap.ui.core"\n  xmlns:f="sap.f"\n  height="100%"><f:DynamicPage id="dynamicPageId" headerExpanded="{/headerExpanded}" toggleHeaderOnTitleClick="{/titleClickable}"><f:title><f:DynamicPageTitle><f:heading><Title text="Mi biblioteca"/></f:heading><f:expandedContent><Label text="Biblioteca personal de libros físicos de Gonzalo Ayuso"/></f:expandedContent><f:content></f:content><f:actions></f:actions><f:navigationActions></f:navigationActions></f:DynamicPageTitle></f:title><f:header><f:DynamicPageHeader pinnable="true"><c:Fragment fragmentName="library.view.Form" type="XML"/></f:DynamicPageHeader></f:header><f:content><c:Fragment fragmentName="library.view.Table" type="XML"/></f:content><f:footer></f:footer></f:DynamicPage></mvc:View>\n',
	"library/view/Table.fragment.xml":'<mvc:View\n  xmlns:m="sap.m"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns:t="sap.ui.table"\n  xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"\n  controllerName="ris.controller.Main"><m:VBox class="sapUiSizeCompact"><t:Table\n      id="table"\n      selectionMode="None"\n      rows="{\n            path: \'/books\',\n            sorter: {\n              path: \'ReadingDate\',\n              descending: true\n            }\n            }"\n      sort="ReadingDate"\n      ariaLabelledBy="title"><t:extension></t:extension><t:columns><t:Column\n          id="Id"\n          width="4rem"\n          sortProperty="Id"><t:template><m:Button\n              press="handleBookPress"\n              icon="sap-icon://course-book"\n              app:Title="{Title}"\n              app:Author="{Author}"\n              app:State="{State}"\n              app:Genre="{Genre}"\n              app:ReadingDate="{ReadingDate}"\n              app:Image="{Image}"\n            /></t:template></t:Column><t:Column\n          id="Title"\n          width="11rem"\n          sortProperty="Title"><m:Label text="Título"/><t:template><m:Text text="{Title}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Author"\n          width="11rem"\n          sortProperty="Author"><m:Label text="Autor"/><t:template><m:Text text="{Author}" wrapping="false"/></t:template></t:Column><t:Column\n          id="State"\n          width="11rem"\n          sortProperty="State"><m:Label text="Estado"/><t:template><m:Text text="{State}" wrapping="false"/></t:template></t:Column><t:Column\n          id="Genre"\n          width="11rem"\n          sortProperty="Genre"><m:Label text="Género"/><t:template><m:Text text="{Genre}" wrapping="false"/></t:template></t:Column><t:Column\n          id="ReadingDate"\n          width="11rem"\n          sortProperty="ReadingDate"><m:Label text="Fecha de lectura"/><t:template><m:Text text="{\n\t\t\t\t\t\t\t\tpath: \'ReadingDate\',\n\t\t\t\t\t\t\t\ttype: \'sap.ui.model.type.Date\',\n\t\t\t\t\t\t\t\tformatOptions: {source: {pattern: \'dd/MM/yyyy\'}, style: \'long\'}\n\t\t\t\t\t\t\t}" wrapping="false"/></t:template></t:Column></t:columns></t:Table></m:VBox></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
