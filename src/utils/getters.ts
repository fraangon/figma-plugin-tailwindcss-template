import { getColorKey } from "../components/home/utils";
import { ColorElement, ColorUse, ColorWithUses } from "../types/colors";
import { convertToRGBScale } from "./colors";

export async function getColors(node: SceneNode): Promise<Array<ColorUse>> {
  const nodesWithPaint = [node, ...findNodesWithPaint(node)];

  const componentColors = extractColorsFromNodes(nodesWithPaint);

  return componentColors;
}

export function colorsToColorsWithUses(
  colors: ColorUse[]
): Array<ColorWithUses> {
  return colors.reduce((acc, color) => {
    const existingColor = acc.find((c) => {
      return c.id === color.id;
    });

    if (existingColor) {
      console.log("EXISTING COLOR: ", existingColor);
      existingColor.uses.push({
        nodeId: color.nodeId,
        property: color.property,
      });
    } else {
      acc.push({
        ...color,
        uses: [{ nodeId: color.nodeId, property: color.property }],
      });
    }

    return acc;
  }, []);
}

function findNodesWithPaint(node: SceneNode): SceneNode[] {
  if (node.type === "FRAME" || node.type === "GROUP") {
    return (node as FrameNode | GroupNode).findAllWithCriteria({
      types: [
        "RECTANGLE",
        "ELLIPSE",
        "POLYGON",
        "STAR",
        "VECTOR",
        "TEXT",
        "FRAME",
        "COMPONENT",
        "INSTANCE",
      ],
    });
  }

  return [];
}

function extractColorsFromNodes(nodes: SceneNode[]): Array<ColorUse> {
  return nodes.flatMap((node) => [
    ...extractColorsFromProperty(node, "fills"),
    ...extractColorsFromProperty(node, "strokes"),
  ]);
}

function extractColorsFromProperty(
  node: SceneNode,
  property: "fills" | "strokes"
): Array<ColorUse> {
  if (!(property in node) || !Array.isArray(node[property])) return [];

  return node[property]
    .filter((paint) => paint.type === "SOLID")
    .map((paint) => ({
      ...convertToRGBScale(paint.color),
      variable: paint.boundVariables?.color,
      nodeId: node.id,
      property,
    }))
    .map((color) => ({
      ...color,
      id: getColorKey(color),
    }));
}

export function changeFillColor(node: SceneNode, newColor: ColorElement) {
  if ("fills" in node) {
    node.fills = [
      {
        type: "SOLID",
        color: {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        },
      },
    ];
  }
}

export function getVariables(collections: VariableCollection[]) {
  return collections.reduce((acc, collection) => {
    const collectionVariables = collection.variableIds
      .map((id) => {
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
      })
      .filter((variable) => variable !== null);

    return [...acc, ...collectionVariables];
  }, [] as any[]);
}
