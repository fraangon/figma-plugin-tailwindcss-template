import { useMemo, useState } from "react";
import { rgbToHex, rgbToHsl } from "../../utils/colors";
import cn from "classnames";
import Color from "../ui/color";

export const Home = () => {
  const [components, setComponents] = useState([]);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    if (pluginMessage.type === "selection-change") {
      const components = pluginMessage.selectedComponents;
      setComponents(components);
    }
  };

  const colors = useMemo(() => {
    return components
      .flatMap((component) => component.colors)
      .reduce((acc, color) => {
        const key = `${color.r}-${color.g}-${color.b}`;
        const existingColor = acc.find((c) => `${c.r}-${c.g}-${c.b}` === key);

        if (existingColor) existingColor.times++;
        else acc.push({ ...color, times: 1 });

        return acc;
      }, [])
      .sort((a, b) => b.times - a.times);
  }, [components]);

  return (
    <div className="h-fit min-h-screen w-full flex flex-col justify-start items-start px-2 py-3 gap-3 bg-black font-mono">
      <h1 className="font-medium text-gray-500 text-sm leading-none tracking-wide uppercase">
        <span>Normalizer</span>
        <span> / </span>
        <span className="text-gray-50">Colors</span>
      </h1>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {colors.map((color) => (
          <Color color={color} key={`${color.r}-${color.g}-${color.b}`} />
        ))}
      </div>
    </div>
  );
};
