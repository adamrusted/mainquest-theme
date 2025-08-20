// For Dropdown Menu
(function ($) {
  "use strict";
  function ghost_dropdown(options) {
    let defultOptions = {
      targetElement: "ul li",
      hasChildrenClasses: "menu-item-has-children",
      hasChildrenIcon:
        "<svg xmlns='http://www.w3.org/2000/svg' width='11' height='7' fill='currentColor' class='bi bi-caret-down' viewBox='0 0 11 7'><path d='M5.4999 6.20003L0.649902 1.35003L1.3499 0.650024L5.4999 4.80002L9.6499 0.650024L10.3499 1.35003L5.4999 6.20003Z'/></svg>",
      hasChildDetectText: "[has_child]",
      submenuUlClasses: "ghost-submenu",
      subitemDetectText: "[subitem]",
      subitemLiClasses: "subitem",
    };
    options = {
      ...defultOptions,
      ...options,
    };
    // Target Element
    let targetElement = options.targetElement;
    //Default value
    let hasChildrenClasses = options.hasChildrenClasses;
    let hasChildrenIcon = options.hasChildrenIcon;
    let hasChildDetectText = options.hasChildDetectText;
    let submenuUlClasses = options.submenuUlClasses;
    let subitemDetectText = options.subitemDetectText;
    let subitemLiClasses = options.subitemLiClasses;
    // Declare neccesary variable
    let parentEl = $(targetElement);
    let childEL = $(targetElement);
    let parentLen = 0;
    let domArrayElement = [];
    let indexPush = [];
    let elIndex = 0;
    let parentIndex = [];
    $(`${targetElement}`).parent().addClass("ghost-dropdown-menu");
    // Find Dropdown parent element
    parentEl.each(function (index, element) {
      if ($(this).text().indexOf(hasChildDetectText) >= 0) {
        parentIndex.push(index); // Make dropdown parent array index
        parentLen++;
        $(this).push(element);
        $(this).addClass(hasChildrenClasses); // Add class in dropdown element
        $(this).append(`<ul class='${submenuUlClasses}'></ul>`); // Append submenu element
        $(targetElement).css("opacity", "1");
      }
    });
    $(`.${hasChildrenClasses}`).append(hasChildrenIcon);
    // Using loop to reach dropdown parent element
    for (let i = 0; i < parentLen; i++) {
      elIndex = 0; // Initial element value
      // Find subitem element
      childEL.each(function (index, element) {
        let subitem = $(this).text().includes(subitemDetectText); // Find subitem element
        if (subitem) {
          if (elIndex >= parentIndex[i + 1]) {
            // Each loop will be break
            return false; //Stoped each loop
          }
          if (
            elIndex <= parentIndex[i + 1] ||
            elIndex >= parentIndex[parentIndex.length - 1]
          ) {
            if (!indexPush.includes(index)) {
              //Check if not index already insert
              $(this).addClass(subitemLiClasses); // Add class in subitem element
              let st = $(this).children().text(); // Find subitem inner text
              $(this).children().text(st.replaceAll(subitemDetectText, "")); // Replace subitem inner text
              domArrayElement.push(element); // Incert subitem element in dom array
              indexPush.push(index); // incert subitem index in indexPush array
            }
          }
        }
        elIndex++; // increase element index value
      });
      $(`.${hasChildrenClasses} ul.${submenuUlClasses}:eq(${i})`).append(
        domArrayElement
      ); // Append related subitem dom element into submenu
      // console.log(domArrayElement);
      domArrayElement = []; // Make dom array element empty.
    }
    const hasChildEl = $(`.${hasChildrenClasses}`);
    hasChildEl.each(function () {
      if ($(this).find("> a:first").text().includes(hasChildDetectText)) {
        // console.log($(this).find("> a").text());
        let hasChildText = $(this).find("> a:first").text(); // Find has child inner text
        $(this)
          .find("> a:first")
          .text(hasChildText.replaceAll(hasChildDetectText, ""));
      }
    });
  }
  $(document).ready(function () {
    ghost_dropdown();
  });
})(jQuery);
