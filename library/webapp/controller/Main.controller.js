sap.ui.define([
	"./BaseController",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/ui/model/json/JSONModel"
], function (BaseController, Dialog, Button, mobileLibrary, List, StandardListItem, JSONModel) {
	"use strict";
	return BaseController.extend("library.controller.Main", {
		model: {
			form: {},
			masterdata: {}
		},

		onInit: function () {
			this.setModel(new JSONModel(this.model))
			const booksModel = new JSONModel(sap.ui.require.toUrl("library/data/books.json?x="+ Math.random()));
			booksModel.attachRequestCompleted(this._onDataLoaded.bind(this));
		},

		_onDataLoaded: function (oEvent) {
			const m = this.getModel();
			const books = oEvent.getSource().getData();
			const authors = [...new Set(books.map(book => book.Author))].map(value => ({value}));
			const states = [...new Set(books.map(book => book.State))].map(value => ({value}));
			const genres = [...new Set(books.map(book => book.Genre))].map(value => ({value}));
			m.setProperty("/allBooks", books);
			m.setProperty("/masterdata/authors", authors);
			m.setProperty("/masterdata/states", states);
			m.setProperty("/masterdata/genres", genres);

			m.setProperty("/books", books);
		},

		handleCleanSelected: function () {
			const m = this.getModel();
			const allBooks = m.getProperty("/allBooks");
			m.setProperty("/form", {});
			m.setProperty("/books", allBooks);
		},

		handleBookPress: function (e) {
			const image = e.getSource().data("Image");
			const title = e.getSource().data("Title");

			this.oDefaultDialog = new Dialog({
				title: title,
				contentAlign: "Center",
				content: new sap.m.Image({
					src: `./data/cover/${image}`,
					width: "300px"
				}),
				endButton: new Button({
					text: "Close",
					press: function () {
						this.oDefaultDialog.close();
					}.bind(this)
				})
			});

			this.getView().addDependent(this.oDefaultDialog);

			this.oDefaultDialog.open();
		},

		handleSearchSelected: function () {
			const m = this.getModel();
			const form = m.getProperty("/form");
			const allBooks = m.getProperty("/allBooks");

			const filteredBooks = allBooks.filter(book => {
				return (!form.title || book.Title.includes(form.title)) &&
					(!form.author || book.Author === form.author) &&
					(!form.state || book.State === form.state) &&
					(!form.genre || book.Genre === form.genre) &&
					(!form.readingDate || book.ReadingDate === form.readingDate);
			});
			m.setProperty("/books", filteredBooks);
		}
	});
});
