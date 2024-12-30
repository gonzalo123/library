sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("library.controller.Main", {

		onInit: function () {
			const oModel = new JSONModel(sap.ui.require.toUrl("library/data/books.json"));
			this.getView().setModel(oModel);
		},
	});
});
