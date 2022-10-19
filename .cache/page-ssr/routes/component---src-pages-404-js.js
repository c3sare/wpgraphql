"use strict";
exports.id = "component---src-pages-404-js";
exports.ids = ["component---src-pages-404-js"];
exports.modules = {

/***/ "./src/components/Navigation.js":
/*!**************************************!*\
  !*** ./src/components/Navigation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_1500401916_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/1500401916.json */ "./public/page-data/sq/d/1500401916.json");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const flatListToHierarchical = (data = [], {
  idKey = 'key',
  parentKey = 'parentId',
  childrenKey = 'children'
} = {}) => {
  const tree = [];
  const childrenOf = {};
  data.forEach(item => {
    const newItem = {
      ...item
    };
    const {
      [idKey]: id,
      [parentKey]: parentId = 0
    } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};
function createMenu(nodes) {
  return nodes.map(({
    key,
    url,
    title,
    children
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("li", {
    key: key
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: url
  }, title), children.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("ul", null, createMenu(children))));
}
const Navigation = () => {
  const menuItems = flatListToHierarchical(_public_page_data_sq_d_1500401916_json__WEBPACK_IMPORTED_MODULE_0__.data.allWpMenuItem.nodes);
  console.log(menuItems);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("ul", null, createMenu(menuItems)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2753671558_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2753671558.json */ "./public/page-data/sq/d/2753671558.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Navigation */ "./src/components/Navigation.js");




const Layout = ({
  isHomePage,
  children
}) => {
  const {
    wp: {
      generalSettings: {
        title
      }
    }
  } = _public_page_data_sq_d_2753671558_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "global-wrapper",
    "data-is-root-path": isHomePage
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", {
    className: "global-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
    to: "/"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Navigation__WEBPACK_IMPORTED_MODULE_3__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", {
    style: {
      padding: '10px'
    }
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("footer", null, "\xA9 ", new Date().getFullYear(), ", Built with", ` `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://www.gatsbyjs.com"
  }, "Gatsby"), ` `, "And ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://wordpress.org/"
  }, "WordPress")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_848497233_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/848497233.json */ "./public/page-data/sq/d/848497233.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");

/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */




const Seo = ({
  description,
  lang,
  meta,
  title
}) => {
  var _wp$generalSettings, _wp$generalSettings2;
  const {
    wp,
    wpUser
  } = _public_page_data_sq_d_848497233_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || ((_wp$generalSettings = wp.generalSettings) === null || _wp$generalSettings === void 0 ? void 0 : _wp$generalSettings.description);
  const defaultTitle = (_wp$generalSettings2 = wp.generalSettings) === null || _wp$generalSettings2 === void 0 ? void 0 : _wp$generalSettings2.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: title,
    titleTemplate: defaultTitle ? `%s | ${defaultTitle}` : null,
    meta: [{
      name: `description`,
      content: metaDescription
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      name: `twitter:card`,
      content: `summary`
    }, {
      name: `twitter:creator`,
      content: (wpUser === null || wpUser === void 0 ? void 0 : wpUser.twitter) || ``
    }, {
      name: `twitter:title`,
      content: title
    }, {
      name: `twitter:description`,
      content: metaDescription
    }].concat(meta)
  });
};
Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};
Seo.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/pages/404.js?export=default":
/*!*****************************************!*\
  !*** ./src/pages/404.js?export=default ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");



const NotFoundPage = ({
  data,
  location
}) => {
  const siteTitle = data.site.siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    location: location,
    title: siteTitle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "404: Not Found"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "404: Not Found"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "You just hit a route that doesn't exist... the sadness."));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFoundPage);
const pageQuery = "3159585216";

/***/ }),

/***/ "./public/page-data/sq/d/1500401916.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/1500401916.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allWpMenuItem":{"nodes":[]}}}');

/***/ }),

/***/ "./public/page-data/sq/d/2753671558.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2753671558.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"wp":{"generalSettings":{"title":"Elementor Gatsby WP","description":"Just another WordPress site"}}}}');

/***/ }),

/***/ "./public/page-data/sq/d/848497233.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/848497233.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"wp":{"generalSettings":{"title":"Elementor Gatsby WP","description":"Just another WordPress site"}},"wpUser":{"twitter":"admin"}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-404-js.js.map