window.documetnWidget = (function () {
  'use strict';
  var config = {
    URL: '/test.json',
    wrapperItemsClass: '.document-widget_wrapper',
    itemBlockClass: '.document-widget_item',
    linkItemClass: ['hellp'],
    dataType: 'data-documetn_type',
    onBeforeItemAdd: null,
    onAfterItemAdd: null,
    onStart: null,
    onEnd: null,
  };

  const loadParams = (mainConfig, params) => {
    for (var p in params) {
      try {
        // Property in destination object set; update its value.
        if (params[p].constructor == Object) {
          mainConfig[p] = MergeRecursive(mainConfig[p], params[p]);
        } else {
          mainConfig[p] = params[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        mainConfig[p] = params[p];
      }
    }

    return mainConfig;
  };

  const loadJsonData = (options) => {
    return new Promise((resolve, reject) => {
      var status = function (response) {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
      };
      var json = function (response) {
        return response.json();
      };
      fetch(config.URL, options)
        .then(status)
        .then(json)
        .then(function (data) {
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  const addClassNames = (element, classNames) => {
    if (Array.isArray(classNames)) {
      for (let itemClass of classNames) {
        element.classList.add(itemClass);
      }
    } else {
      element.classList.add(classNames);
    }
  };

  const generateItemLink = (element, row) => {
    let linkElement;
    let linkElements = element.getElementsByTagName('a');
    if (linkElements.length == 0) {
      linkElement = document.createElement('a');
      linkElement.innerText = row.NAME;
      linkElement.href = row.LINK;
    } else {
      linkElement = linkElements[0];
      linkElement.href = row.LINK;
      Object.keys(row).forEach((key) => {
        foreachElement(
          '[data-param_name="' + key + '"]',
          (paramElement) => {
            paramElement.innerText = row[key];
          },
          linkElement
        );
      });
    }
    addClassNames(linkElement, config.linkItemClass);
    element.appendChild(linkElement);
    return element;
  };

  const createDocumentElement = (wrappElem) => {
    let items = wrappElem.querySelectorAll(config.itemBlockClass);
    let mainItem = items[0].cloneNode(true);
    items.forEach((e) => {
      wrappElem.removeChild(e);
    });
    return mainItem;
  };

  const foreachElement = (queryElement, callback, mainElement = document) => {
    let nodeElement = mainElement.querySelectorAll(queryElement);
    for (let elem of nodeElement) {
      callback(elem);
    }
  };

  const loadByType = (elementBlock, jsonData) => {
    let type = elementBlock.getAttribute(config.dataType);
    let documentBlock = createDocumentElement(elementBlock).cloneNode(true);
    jsonData
      .filter((e) => e.TYPE === type)
      .forEach((data, i) => {
        if (typeof config.onBeforeItemAdd === 'function') {
          config.onBeforeItemAdd(i, type, data);
        }
        let elem = generateItemLink(documentBlock.cloneNode(true), data);
        elem.setAttribute('data-key', i);
        elementBlock.appendChild(elem);
        if (typeof config.onAfterItemAdd === 'function') {
          config.onAfterItemAdd(elem, elementBlock, i, type, data);
        }
      });
  };

  const load = (params) => {
    config = loadParams(config, params);
    if (typeof config.onStart === 'function') {
      config.onStart();
    }
    loadJsonData().then((data) => {
      foreachElement(config.wrapperItemsClass, (mainBlockElement) => {
        loadByType(mainBlockElement, data);
      });
    });
    if (typeof config.onEnd === 'function') {
      config.onEnd();
    }
  };
  return {
    load: load,
  };
})();
