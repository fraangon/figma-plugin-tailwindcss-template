import { useMemo, useState } from "react";
import { SidebarWrapper } from "../sidebar-wrapper";
import { TooltipProvider } from "../ui/tooltip";
import { ColorElement } from "../../types/colors";
import { getColorKey } from "./utils";



export const Home = () => {
  const [components, setComponents] = useState([]);
  const [variables, setVariables] = useState([]);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;

    if (pluginMessage.type === "selection-change") {
      const components = pluginMessage.selectedComponents;
      const variables = pluginMessage.variables;
      setComponents(components || []);
      setVariables(variables || []);
    }
  };

  console.log("variables", variables);

  const colors = useMemo(() => {
    return components
      .flatMap((component) => component.colors)
      .reduce((acc, color) => {
        const variable = variables.find((v) => v.id === color.variable?.id);

        const existingColor = acc.find(
          (c) => getColorKey(c) === getColorKey(color)
        );

        if (existingColor) existingColor.times++;
        else acc.push({ ...color, times: 1, variable: variable?.name });

        return acc;
      }, [])
      .sort((a, b) => {
        if (b.times !== a.times) return b.times - a.times;
        return (b.variable ? 1 : 0) - (a.variable ? 1 : 0);
      });
  }, [components]);

  console.log("colors", colors);

  return (
    <TooltipProvider>
      <SidebarWrapper colors={colors} />
    </TooltipProvider>
  );
};
