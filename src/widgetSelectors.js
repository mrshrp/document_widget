const wS = (function () {
  const getBlocks = ($blockName) => {
    let elements = document.querySelectorAll($blockName);

    return elements;
  };
  return {
    getBlocks: getBlocks,
  };
})();

module.exports = wS;
