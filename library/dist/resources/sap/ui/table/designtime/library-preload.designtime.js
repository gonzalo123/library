//@ui5-bundle sap/ui/table/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/AnalyticalTable.designtime", [],function(){"use strict";return{aggregations:{columns:{domRef:".sapUiTableCHA"},hScroll:{ignore:false,domRef:function(e){return e.$("hsb").get(0)}},vScroll:{ignore:false,domRef:function(e){return e.$("vsb").get(0)}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/Table.designtime", ["sap/ui/table/rowmodes/Type"],function(e){"use strict";return{domRef:function(o){const t=o.getRowMode();let n=false;if(!t){n=o.getVisibleRowCountMode()==="Auto"}if(t){n=t===e.Auto||t.isA("sap.ui.table.rowmodes.Auto")}if(n){return o.$("sapUiTableCnt").get(0)}return o.getDomRef()},aggregations:{columns:{domRef:".sapUiTableCHA"},rows:{ignore:true},hScroll:{ignore:false,domRef:function(e){return e.$("hsb").get(0)}},scrollContainers:[{domRef:function(e){return e.$("sapUiTableCnt").get(0)},aggregations:["rows"]}]}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/library.designtime", [],function(){"use strict";return{}});
//# sourceMappingURL=library-preload.designtime.js.map
