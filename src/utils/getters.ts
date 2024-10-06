export async function getColors(node: SceneNode): Promise<Array<{
  r: number;
  g: number;
  b: number;
  boundVariables?: any | undefined;
}>> {
  const nodesWithPaint = findNodesWithPaint(node);
  return extractColorsFromNodes(nodesWithPaint);
}

function findNodesWithPaint(node: SceneNode): SceneNode[] {
  return (node as FrameNode | GroupNode).findAllWithCriteria({
    types: [
      "RECTANGLE", "ELLIPSE", "POLYGON", "STAR", "VECTOR",
      "TEXT", "FRAME", "COMPONENT", "INSTANCE",
    ],
  });
}

function extractColorsFromNodes(nodes: SceneNode[]): Array<{
  r: number;
  g: number;
  b: number;
  boundVariables?: any | undefined;
}> {
  return nodes.flatMap(node => [
    ...extractColorsFromProperty(node, 'fills'),
    ...extractColorsFromProperty(node, 'strokes')
  ]);
}

function extractColorsFromProperty(node: SceneNode, property: 'fills' | 'strokes'): Array<{
  r: number;
  g: number;
  b: number;
  boundVariables?: any | undefined;
}> {
  if (!(property in node) || !Array.isArray(node[property])) return [];

  return node[property]
    .filter(paint => paint.type === "SOLID")
    .map(paint => {
      const { r, g, b } = paint.color;
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        boundVariables: property === 'fills' ? paint.boundVariables : undefined
      };
    });
}
