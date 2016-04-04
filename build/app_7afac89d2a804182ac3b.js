webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(2);

	var React = babelHelpers.interopRequireWildcard(_react);

	var _reactDom = __webpack_require__(159);

	var ReactDom = babelHelpers.interopRequireWildcard(_reactDom);

	var _App = __webpack_require__(160);

	var _App2 = babelHelpers.interopRequireDefault(_App);

	ReactDom.render(React.createElement(_App2.default, null), document.getElementById("root")); /// <reference path="../typings/tsd.d.ts" />

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var React = babelHelpers.interopRequireWildcard(_react);

	var _ContentPage = __webpack_require__(161);

	var _ContentPage2 = babelHelpers.interopRequireDefault(_ContentPage);

	var _CommonActionCreators = __webpack_require__(175);

	var _CommonActionCreators2 = babelHelpers.interopRequireDefault(_CommonActionCreators);

	__webpack_require__(177); /// <reference path="../typings/tsd.d.ts" />

	var App = function (_React$Component) {
	    babelHelpers.inherits(App, _React$Component);

	    function App() {
	        babelHelpers.classCallCheck(this, App);
	        return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }

	    App.prototype.render = function render() {
	        return React.createElement("div", null, React.createElement(_ContentPage2.default, null));
	    };

	    App.prototype.componentDidMount = function componentDidMount() {
	        _CommonActionCreators2.default.loadApp();
	    };

	    return App;
	}(React.Component);

	exports.default = App;

	;

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var React = babelHelpers.interopRequireWildcard(_react);

	var _ContentHeader = __webpack_require__(162);

	var _ContentHeader2 = babelHelpers.interopRequireDefault(_ContentHeader);

	var _ContentBody = __webpack_require__(164);

	var _ContentBody2 = babelHelpers.interopRequireDefault(_ContentBody);

	var _CommonStore = __webpack_require__(166);

	var _CommonStore2 = babelHelpers.interopRequireDefault(_CommonStore);

	var _CommonActionCreators = __webpack_require__(175);

	var _CommonActionCreators2 = babelHelpers.interopRequireDefault(_CommonActionCreators);

	/* tslint:disable:no-any */
	var styles = __webpack_require__(176); /// <reference path="../../../typings/tsd.d.ts" />

	var ContentPage = function (_React$Component) {
	    babelHelpers.inherits(ContentPage, _React$Component);

	    function ContentPage() {
	        babelHelpers.classCallCheck(this, ContentPage);

	        var _this = babelHelpers.possibleConstructorReturn(this, _React$Component.call(this));

	        _this.onChange = function () {
	            _this.setState(_this.getStateFromStores());
	        };
	        _this.state = _this.getStateFromStores();
	        return _this;
	    }

	    ContentPage.prototype.render = function render() {
	        var _this2 = this;

	        var headerTitle = "Welcome to Lorem Ipsum";
	        return React.createElement("div", { "className": styles.container }, React.createElement(_ContentHeader2.default, { "isActive": true, "title": headerTitle }), React.createElement(_ContentBody2.default, { "ref": "contentBodyRef", "title": this.state.bodyTitle, "summary": this.state.bodySummary }, React.createElement("div", { "className": styles.hello }, React.createElement("button", { "onClick": function onClick() {
	                return _this2.onButtonClick();
	            } }, "Say Hello!"), React.createElement("span", null, " You said hello ", this.state.sayHelloCount, " time(s)"))));
	    };

	    ContentPage.prototype.componentDidMount = function componentDidMount() {
	        _CommonStore2.default.addListener(this.onChange);
	    };

	    ContentPage.prototype.componentWillUnmount = function componentWillUnmount() {
	        _CommonStore2.default.removeListener(this.onChange);
	    };

	    ContentPage.prototype.onButtonClick = function onButtonClick() {
	        _CommonActionCreators2.default.sayHello();
	    };

	    ContentPage.prototype.getStateFromStores = function getStateFromStores() {
	        return {
	            bodyTitle: _CommonStore2.default.getBodyTitle(),
	            bodySummary: _CommonStore2.default.getBodySummary(),
	            sayHelloCount: _CommonStore2.default.getSayHelloCount()
	        };
	    };

	    return ContentPage;
	}(React.Component);

	exports.default = ContentPage;

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var React = babelHelpers.interopRequireWildcard(_react);

	/* tslint:disable:no-any */
	var styles = __webpack_require__(163); /// <reference path="../../../../typings/tsd.d.ts" />

	;

	var ContentHeader = function (_React$Component) {
	    babelHelpers.inherits(ContentHeader, _React$Component);

	    function ContentHeader() {
	        babelHelpers.classCallCheck(this, ContentHeader);
	        return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }

	    ContentHeader.prototype.render = function render() {
	        if (!this.props.isActive) {
	            return null;
	        }
	        return React.createElement("div", { "className": styles.container }, this.props.title);
	    };

	    return ContentHeader;
	}(React.Component);

	exports.default = ContentHeader;

	;

/***/ },

/***/ 163:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"ContentHeader-module__container___3m6Cy"};

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var React = babelHelpers.interopRequireWildcard(_react);

	/* tslint:disable:no-any */
	var styles = __webpack_require__(165); /// <reference path="../../../../typings/tsd.d.ts" />

	;

	var ContentBody = function (_React$Component) {
	    babelHelpers.inherits(ContentBody, _React$Component);

	    function ContentBody() {
	        babelHelpers.classCallCheck(this, ContentBody);
	        return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }

	    ContentBody.prototype.render = function render() {
	        return React.createElement("div", { "className": styles.container }, React.createElement("div", { "className": styles.title }, this.props.title), React.createElement("span", { "className": styles.summaryTitle }, "Summary:"), React.createElement("div", { "ref": "summaryRef", "className": styles.summary }, this.props.summary), this.props.children);
	    };

	    return ContentBody;
	}(React.Component);

	exports.default = ContentBody;

	;

/***/ },

/***/ 165:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"ContentBody-module__container___1StBP","title":"ContentBody-module__title___2vPqk","summary":"ContentBody-module__summary___25sJy","summaryTitle":"ContentBody-module__summaryTitle___17IEN ContentBody-module__summary___25sJy"};

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _BaseStore2 = __webpack_require__(167);

	var _BaseStore3 = babelHelpers.interopRequireDefault(_BaseStore2);

	var _Dispatcher = __webpack_require__(168);

	var _Dispatcher2 = babelHelpers.interopRequireDefault(_Dispatcher);

	var _AppLoadedAction = __webpack_require__(172);

	var _AppLoadedAction2 = babelHelpers.interopRequireDefault(_AppLoadedAction);

	var _SayHelloAction = __webpack_require__(174);

	var _SayHelloAction2 = babelHelpers.interopRequireDefault(_SayHelloAction);

	/// <reference path="../../typings/tsd.d.ts" />

	var CommonStore = function (_BaseStore) {
	    babelHelpers.inherits(CommonStore, _BaseStore);

	    function CommonStore() {
	        babelHelpers.classCallCheck(this, CommonStore);

	        var _this = babelHelpers.possibleConstructorReturn(this, _BaseStore.call(this));

	        _this.sayHelloCount = 0;
	        _Dispatcher2.default.register(function (action) {
	            return _this.processActions(action);
	        });
	        return _this;
	    }

	    CommonStore.prototype.getBodyTitle = function getBodyTitle() {
	        if (this.bodyTitle) {
	            return this.bodyTitle.toUpperCase();
	        }
	        return "";
	    };

	    CommonStore.prototype.getBodySummary = function getBodySummary() {
	        return this.bodySummary;
	    };

	    CommonStore.prototype.getSayHelloCount = function getSayHelloCount() {
	        return this.sayHelloCount;
	    };

	    CommonStore.prototype.processActions = function processActions(action) {
	        if (action instanceof _AppLoadedAction2.default) {
	            this.bodyTitle = action.bodyTitle;
	            this.bodySummary = action.bodySummary;
	            this.emitChange();
	        } else if (action instanceof _SayHelloAction2.default) {
	            this.sayHelloCount++;
	            this.emitChange();
	        }
	    };

	    return CommonStore;
	}(_BaseStore3.default);

	exports.default = new CommonStore();

/***/ },

/***/ 167:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/// <reference path="../../typings/tsd.d.ts" />

	var BaseStore = function () {
	    function BaseStore() {
	        babelHelpers.classCallCheck(this, BaseStore);

	        this.listeners = null;
	        this.listeners = [];
	    }

	    BaseStore.prototype.addListener = function addListener(listener) {
	        this.listeners.push(listener);
	    };

	    BaseStore.prototype.removeListener = function removeListener(listener) {
	        var index = this.listeners.indexOf(listener);
	        if (index > -1) {
	            this.listeners.splice(index, 1);
	        }
	    };

	    BaseStore.prototype.emitChange = function emitChange() {
	        for (var i = 0; i < this.listeners.length; i++) {
	            this.listeners[i]();
	        }
	    };

	    return BaseStore;
	}();

	exports.default = BaseStore;

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _flux = __webpack_require__(169);

	var Flux = babelHelpers.interopRequireWildcard(_flux);
	exports.default = new Flux.Dispatcher(); /// <reference path="../../typings/tsd.d.ts" />

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _ActionLogEntry = __webpack_require__(173);

	var _ActionLogEntry2 = babelHelpers.interopRequireDefault(_ActionLogEntry);

	var AppLoadedAction = function () {
	    function AppLoadedAction(bodyTitle, bodySummary) {
	        babelHelpers.classCallCheck(this, AppLoadedAction);

	        this.bodyTitle = bodyTitle;
	        this.bodySummary = bodySummary;
	    }

	    AppLoadedAction.prototype.toLogEntry = function toLogEntry() {
	        return new _ActionLogEntry2.default("AppLoadedAction", {
	            "bodyTitle": this.bodyTitle
	        });
	    };

	    return AppLoadedAction;
	}();

	exports.default = AppLoadedAction;

/***/ },

/***/ 173:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var ActionLogEntry = function () {
	    function ActionLogEntry(name, logProperties) {
	        babelHelpers.classCallCheck(this, ActionLogEntry);

	        this.name = name;
	        this.logProperties = logProperties;
	    }

	    ActionLogEntry.prototype.toString = function toString() {
	        return this.name + " | " + JSON.stringify(this.logProperties);
	    };

	    return ActionLogEntry;
	}();

	exports.default = ActionLogEntry;

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _ActionLogEntry = __webpack_require__(173);

	var _ActionLogEntry2 = babelHelpers.interopRequireDefault(_ActionLogEntry);

	var SayHelloAction = function () {
	    function SayHelloAction() {
	        babelHelpers.classCallCheck(this, SayHelloAction);
	    }

	    SayHelloAction.prototype.toLogEntry = function toLogEntry() {
	        return new _ActionLogEntry2.default("SayHelloAction");
	    };

	    return SayHelloAction;
	}();

	exports.default = SayHelloAction;

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _Dispatcher = __webpack_require__(168);

	var _Dispatcher2 = babelHelpers.interopRequireDefault(_Dispatcher);

	var _AppLoadedAction = __webpack_require__(172);

	var _AppLoadedAction2 = babelHelpers.interopRequireDefault(_AppLoadedAction);

	var _SayHelloAction = __webpack_require__(174);

	var _SayHelloAction2 = babelHelpers.interopRequireDefault(_SayHelloAction);

	var CommonActionCreators = function () {
	    function CommonActionCreators() {
	        babelHelpers.classCallCheck(this, CommonActionCreators);
	    }

	    CommonActionCreators.prototype.loadApp = function loadApp() {
	        var bodyTitle = "The standard Lorem Ipsum passage, used since the 1500s";
	        var bodySummary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" + "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" + "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" + "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt" + "in culpa qui officia deserunt mollit anim id est laborum.";
	        _Dispatcher2.default.dispatch(new _AppLoadedAction2.default(bodyTitle, bodySummary));
	    };

	    CommonActionCreators.prototype.sayHello = function sayHello() {
	        _Dispatcher2.default.dispatch(new _SayHelloAction2.default());
	        window.location.href = "/authenticate";
	    };

	    return CommonActionCreators;
	}();

	exports.default = new CommonActionCreators();

/***/ },

/***/ 176:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"ContentPage-module__container___1COw_","hello":"ContentPage-module__hello___37EYk"};

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _Dispatcher = __webpack_require__(168);

	var _Dispatcher2 = babelHelpers.interopRequireDefault(_Dispatcher);

	/**
	 * Logger that logs all actions
	 */

	var ActionLogger = function () {
	    function ActionLogger() {
	        var _this = this;

	        babelHelpers.classCallCheck(this, ActionLogger);

	        this.processActions = function (action) {
	            _this.log(action);
	        };
	        _Dispatcher2.default.register(this.processActions);
	    }

	    ActionLogger.prototype.log = function log(action) {
	        var logEntry = action.toLogEntry();
	        if (logEntry != null) {
	            console.log("ActionLogger: " + logEntry.toString());
	        }
	    };

	    return ActionLogger;
	}(); /// <reference path="../../typings/tsd.d.ts" />


	exports.default = new ActionLogger();

/***/ }

});