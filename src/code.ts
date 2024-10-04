figma.showUI(__html__, { height: 600, width: 350 });

figma.on("selectionchange", async () => {
  const selectedComponents = figma.currentPage.selection;
  
  const componentsWithColors = await Promise.all(selectedComponents.map(async (component) => {
    const colors = await getColors(component);
    
    return {
      id: component.id,
      name: component.name,
      colors: colors
    };
  }));

  figma.ui.postMessage({
    type: "selection-change",
    selectedComponents: componentsWithColors,
  });
});

// Función auxiliar para obtener colores de un componente y sus hijos
async function getColors(node: SceneNode): Promise<Array<{
  r: number,
  g: number,
  b: number,
  boundVariables?: any | undefined
}>> {
  const colors: Array<{
    r: number,
    g: number,
    b: number,
    boundVariables?: any | undefined
  }> = [];

  // Buscar todos los nodos con rellenos o trazos
  const nodesWithPaint = (node as FrameNode | GroupNode).findAllWithCriteria({
    types: ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'VECTOR', 'TEXT', 'FRAME', 'COMPONENT', 'INSTANCE']
  });

  for (const paintNode of nodesWithPaint) {
    // Procesar rellenos
    if ('fills' in paintNode && Array.isArray(paintNode.fills)) {
      for (const paint of paintNode.fills) {
        if (paint.type === 'SOLID') {
          const { r, g, b } = paint.color;
          colors.push({
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
            boundVariables: paint.boundVariables
          });
        }
      }
    }

    // Procesar trazos
    if ('strokes' in paintNode && paintNode.strokes) {
      for (const paint of paintNode.strokes) {
        if (paint.type === 'SOLID') {
          const { r, g, b } = paint.color;
          colors.push({
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
            // boundVariables: paint.boundVariables
          });
        }
      }
    }
  }

  return colors;
}
