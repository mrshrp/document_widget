window.documetnWidget = (function () {
  var config = {
    URL: '/test.json',
    mainBlockClass: '.document-widget_block',
    wrapperItemsClass: '.document-widget_wrapper',
    itemBlockClass: '.document-widget_item',
    linkItemClass: ['hellp'],
    const: {
      dataType: 'data-documetn_type',
    },
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

  const generateItemLink = (itemValue, itemLink) => {
    let linkElement = document.createElement('a');
    linkElement.innerText = itemValue;
    linkElement.href = itemLink;
    if (Array.isArray(config.linkItemClass)) {
      for (let itemClass of config.linkItemClass) {
        linkElement.classList.add(itemClass);
      }
    } else {
      linkElement.classList.add(config.linkItemClass);
    }
    return linkElement;
  };

  const load = () => {
    loadJsonData().then((data) => {
      let nodeElement = document.querySelectorAll(config.mainBlockClass);

      for (let elem of nodeElement) {
        let wrapperNode = elem.querySelectorAll(config.wrapperItemsClass);
        for (let wrappElem of wrapperNode) {
          let type = wrappElem.getAttribute(config.const.dataType);
          let items = wrappElem.querySelectorAll(config.itemBlockClass);
          let mainItem = items[0].cloneNode(true);
          console.log(mainItem);
          items.forEach((e) => {
            wrappElem.removeChild(e);
          });
          data.forEach((dataItem) => {
            if (dataItem.TYPE == type) {
              let i = mainItem.cloneNode(true);

              i.appendChild(generateItemLink(dataItem.NAME, dataItem.LINK));
              wrappElem.appendChild(i);
            }
          });
        }
      }
    });
  };
  return {
    load: load,
  };
})();
