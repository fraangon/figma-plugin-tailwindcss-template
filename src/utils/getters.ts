import { convertToRGBScale } from "./colors";

export async function getColors(node: SceneNode): Promise<
  Array<{
    r: number;
    g: number;
    b: number;
    variable?: any | undefined;
  }>
> {
  const nodesWithPaint = [node, ...findNodesWithPaint(node)];

  return extractColorsFromNodes(nodesWithPaint);
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

function extractColorsFromNodes(nodes: SceneNode[]): Array<{
  r: number;
  g: number;
  b: number;
  boundVariables?: any | undefined;
}> {
  return nodes.flatMap((node) => [
    ...extractColorsFromProperty(node, "fills"),
    ...extractColorsFromProperty(node, "strokes"),
  ]);
}

function extractColorsFromProperty(
  node: SceneNode,
  property: "fills" | "strokes"
): Array<{
  r: number;
  g: number;
  b: number;
  boundVariables?: any | undefined;
}> {
  if (!(property in node) || !Array.isArray(node[property])) return [];

  return node[property]
    .filter((paint) => paint.type === "SOLID")
    .map((paint) => {
      return {
        ...convertToRGBScale(paint.color),
        variable: paint.boundVariables?.color,
      };
    });
}
