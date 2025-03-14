/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./ColumnHeaderMenuAdapter",
	"sap/ui/table/ColumnMenu",
	"sap/ui/table/AnalyticalColumnMenu",
	"sap/ui/table/utils/TableUtils",
	"sap/ui/core/Popup",
	"sap/ui/Device",
	"sap/ui/base/ManagedObjectObserver"
], function(
	ColumnHeaderMenuAdapter,
	ColumnMenu,
	AnalyticalColumnMenu,
	TableUtils,
	Popup,
	Device,
	ManagedObjectObserver
) {
	"use strict";

	const INVALIDATE_MENU = ["sortProperty", "filterProperty", "showSortMenuEntry", "showFilterMenuEntry"];
	const SET_FILTER_VALUE = ["filterValue"];
	const INVALIDATE_ALL_MENUS = ["enableCustomFilter", "enableGrouping", "enableColumnFreeze", "showColumnVisibilityMenu"];

	/**
	 * @deprecated As of Version 1.117
	 */
	const LegacyColumnMenuAdapter = ColumnHeaderMenuAdapter.extend("sap.ui.table.menus.LegacyColumnMenuAdapter", {
		constructor: function() {
			ColumnHeaderMenuAdapter.apply(this, arguments);

			this._oLegacyMenuObserver = new ManagedObjectObserver(function(oChange) {
				if (oChange.old !== oChange.current) {
					if (INVALIDATE_MENU.indexOf(oChange.name) > -1) {
						this._invalidateMenu(oChange.object);
					} else if (SET_FILTER_VALUE.indexOf(oChange.name) > -1) {
						this._setFilterValue(oChange.object, oChange.current);
					} else if (INVALIDATE_ALL_MENUS.indexOf(oChange.name) > -1) {
						this._invalidateAllMenus();
					}
				}
			}.bind(this));
		}
	});

	LegacyColumnMenuAdapter.prototype.injectMenuItems = function(oMenu, oColumn) {
		const oTable = oColumn._getTable();
		const oCell = oColumn.getDomRef();
		const bCellHasMenuButton = oCell.querySelector(".sapUiTableColDropDown") !== null;

		if (!Device.system.desktop && !bCellHasMenuButton) {
			return this._applyColumnHeaderCellMenu(oColumn);
		}

		this._removeColumnHeaderCellMenu(oTable);
		const bExecuteDefault = oTable.fireColumnSelect({
			column: oColumn
		});

		if (bExecuteDefault) {
			this._openColumnContextMenu(oColumn);
		}
	};

	/**
	 * This function invalidates the column menu. All items will be re-created the next time the menu opens.
	 * @param {sap.ui.table.Column} oColumn Instance of the column.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._invalidateMenu = function(oColumn) {
		const oMenu = oColumn.getMenu();
		if (TableUtils.isA(oMenu, "sap.ui.table.ColumnMenu")) {
			oMenu._invalidate();
		}
	};

	LegacyColumnMenuAdapter.prototype._invalidateAllMenus = function(oTable) {
		const aCols = oTable.getColumns();
		for (let i = 0, l = aCols.length; i < l; i++) {
			this._invalidateMenu(aCols[i]);
		}
	};

	LegacyColumnMenuAdapter.prototype._setFilterValue = function(oColumn, sValue) {
		const oMenu = oColumn.getMenu();
		if (TableUtils.isA(oMenu, "sap.ui.table.ColumnMenu")) {
			oMenu._setFilterValue(sValue);
		}
	};

	LegacyColumnMenuAdapter.prototype._setFilterState = function(oColumn, sState) {
		const oMenu = oColumn.getMenu();
		if (TableUtils.isA(oMenu, "sap.ui.table.ColumnMenu")) {
			oMenu._setFilterState(sState);
		}
	};

	/**
	 * Applies a cell menu on a column header cell.
	 * Hides the column header cell and inserts an element containing two buttons in its place. One button to open the column context menu and
	 * one to resize the column. These are useful on touch devices.
	 *
	 * <b>Note: Multi Headers are currently not fully supported.</b>
	 * In case of a multi-column header the menu will be applied in the first row of the column header. If this column header cell is a span,
	 * then the index of the first column of this span must be provided.
	 *
	 * @param {sap.ui.table.Column} oColumn Instance of the column.
	 * @returns {boolean} Whether the cell menu was applied.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._applyColumnHeaderCellMenu = function(oColumn) {
		const oTable = oColumn._getTable();
		const oCell = oColumn.getDomRef();
		const sColspan = oCell.getAttribute("colspan");
		const oCellInner = oCell.querySelector(".sapUiTableCellInner");
		const bCellMenuAlreadyExists = oCell.querySelector(".sapUiTableCellTouchMenu") !== null;

		if (sColspan && sColspan !== "1" // headers with span do not have connection to a column, do not open the context menu
			|| bCellMenuAlreadyExists
			|| (!oColumn.getResizable() && !oColumn._menuHasItems())) {
			return false;
		}

		const oColumnTouchMenu = document.createElement("div");

		this._removeColumnHeaderCellMenu(oTable); // First remove any existing column header cell menu of another column.
		oCellInner.style.display = "none";

		if (oColumn._menuHasItems()) {
			const oColumnContextMenuButton = document.createElement("div");
			oColumnContextMenuButton.classList.add("sapUiTableColDropDown");
			oColumnContextMenuButton.textContent = "";
			oColumnTouchMenu.appendChild(oColumnContextMenuButton);
		}

		if (oColumn.getResizable()) {
			const oColumnResizerButton = document.createElement("div");
			oColumnResizerButton.classList.add("sapUiTableColResizer");
			oColumnResizerButton.textContent = "";
			oColumnTouchMenu.appendChild(oColumnResizerButton);
		}

		oColumnTouchMenu.classList.add("sapUiTableCellTouchMenu");
		oCell.appendChild(oColumnTouchMenu);

		const onFocusOut = function() {
			this._removeColumnHeaderCellMenu(oTable);
			oCell.removeEventListener("focusout", onFocusOut);
		}.bind(this);

		oCell.addEventListener("focusout", onFocusOut);

		return true;
	};

	/**
	 * Removes a cell menu from a column header cell.
	 * Removes the cell menu from the dom and unhides the column header cell.
	 *
	 * @param {sap.ui.table.Table} oTable Instance of the table.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._removeColumnHeaderCellMenu = function(oTable) {
		const $ColumnCellMenu = oTable && oTable.$().find(".sapUiTableCHT .sapUiTableCellTouchMenu");
		if ($ColumnCellMenu.length) {
			$ColumnCellMenu.parent().find(".sapUiTableCellInner").show();
			$ColumnCellMenu.remove();
		}
	};

	/**
	 * Opens the context menu of a column.
	 * If context menus of other columns are open, they will be closed.
	 *
	 * @param {sap.ui.table.Column} oColumn Instance of the column.
	 * @returns {boolean} Whether a context menu was opened.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._openColumnContextMenu = function(oColumn) {
		const oTable = oColumn._getTable();
		const oDomRef = oColumn._cellPressed;
		const aColumns = oTable.getColumns();

		// Close all menus.
		for (let i = 0; i < aColumns.length; i++) {
			// If column menus of other columns are open, close them.
			if (aColumns[i] !== oColumn) {
				this._closeColumnContextMenu(aColumns[i]);
			}
		}

		const sColspan = oDomRef.getAttribute("colspan");
		if (sColspan && sColspan !== "1") {
			return false; // headers with span do not have connection to a column, do not open the context menu
		}

		return this._openMenu(oColumn, oDomRef);
	};

	/**
	 * Opens the column menu.
	 * @param {sap.ui.table.Column} oColumn The column for which the menu should open.
	 * @param {HTMLElement} oDomRef column DOM reference
	 * @returns {boolean} Whether the menu was opened.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._openMenu = function(oColumn, oDomRef) {
		const oMenu = this._getMenu(oColumn);

		if (!oColumn._menuHasItems()) {
			return false;
		}

		const bExecuteDefault = oColumn.fireColumnMenuOpen({
			menu: oMenu
		});

		if (bExecuteDefault) {
			const eDock = Popup.Dock;
			oMenu.open(null, oDomRef, eDock.BeginTop, eDock.BeginBottom, oDomRef);
			return true;
		} else {
			return true; // We do not know whether the event handler opens a context menu or not, so we just assume it is done.
		}
	};

	/**
	 * Closes the context menu of a column.
	 *
	 * @param {sap.ui.table.Column} oColumn Instance of the column.
	 * @private
	 */
	LegacyColumnMenuAdapter.prototype._closeColumnContextMenu = function(oColumn) {
		const oMenu = oColumn.getMenu();
		if (oMenu) {
			oMenu.close();
		}
	};

	LegacyColumnMenuAdapter.prototype._getMenu = function(oColumn) {
		let oMenu = oColumn.getMenu();
		if (!oMenu) {
			oMenu = this._createMenu(oColumn);
			oColumn.setAggregation("menu", oMenu, true);

			const arr = INVALIDATE_MENU.concat(SET_FILTER_VALUE).concat(INVALIDATE_ALL_MENUS);
			this._oLegacyMenuObserver.observe(oColumn, {
				properties: arr
			});
			TableUtils.Hook.register(oColumn._getTable(), TableUtils.Hook.Keys.Column.SetFilterState, this._setFilterState, this);
		}
		return oMenu;
	};

	/*
	 * Factory method. Creates the column menu.
	 *
	 * @returns {sap.ui.table.ColumnMenu} The created column menu.
	 */
	LegacyColumnMenuAdapter.prototype._createMenu = function(oColumn) {
		const ColumnMenuClass = oColumn.isA("sap.ui.table.AnalyticalColumn") ? AnalyticalColumnMenu : ColumnMenu;
		return new ColumnMenuClass(oColumn.getId() + "-menu", {ariaLabelledBy: oColumn});
	};

	return LegacyColumnMenuAdapter;
});