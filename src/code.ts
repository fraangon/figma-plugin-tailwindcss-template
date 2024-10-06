import { getColors } from "./utils/getters";

figma.showUI(__html__, { height: 600, width: 350 });

const onSelectionChange = async () => {
  const selectedComponents = figma.currentPage.selection;

  const componentsWithColors = await Promise.all(
    selectedComponents.map(async (component) => {
      const colors = await getColors(component);

      return {
        id: component.id,
        name: component.name,
        colors: colors,
      };
    })
  );

  figma.ui.postMessage({
    type: "selection-change",
    selectedComponents: componentsWithColors,
  });
};

figma.on("selectionchange", onSelectionChange);
figma.on("run", onSelectionChange);
