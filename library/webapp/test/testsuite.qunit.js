sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: library",
		defaults: {
			page: "ui5://test-resources/library/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "library/",
				never: "test-resources/library/"
			},
			loader: {
				paths: {
					"library": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for library"
			},
			"integration/opaTests": {
				title: "Integration tests for library"
			}
		}
	};
});
