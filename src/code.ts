import { convertToRGBScale } from "./utils/colors";
import { getColors } from "./utils/getters";

figma.showUI(__html__, { height: 600, width: 350 });

const onSelectionChange = async (): Promise<void> => {
  const selectedComponents: readonly SceneNode[] = figma.currentPage.selection;

  const componentsWithColors = await Promise.all(
    selectedComponents.map(async (component: SceneNode) => {
      const colors = await getColors(component);

      return {
        id: component.id,
        name: component.name,
        colors: colors,
      };
    })
  ).catch((error) => {
    console.error("Error fetching colors:", error);
    return [];
  });

  const collections = figma.variables.getLocalVariableCollections();

  const variables = collections.reduce((acc, collection) => {
    const collectionVariables = collection.variableIds.map(id => {
      const variable = figma.variables.getVariableById(id);
      if (variable) {
        const modeId = collection.defaultModeId;
        return {
          id: variable.id,
          name: variable.name,
          type: variable.resolvedType,
          value: convertToRGBScale(variable.valuesByMode[modeId] as RGBA),
        };
      }
      return null;
    }).filter(variable => variable !== null);
    
    return [...acc, ...collectionVariables];
  }, [] as any[]);

  figma.ui.postMessage({
    type: "selection-change",
    selectedComponents: componentsWithColors,
    variables,
  });
};

figma.on("selectionchange", onSelectionChange);
figma.on("run", onSelectionChange);
