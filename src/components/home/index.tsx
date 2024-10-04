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
    return components.flatMap((component) => component.colors);
  }, [components]);

  return (
    <div className="h-full w-full flex flex-col justify-start items-start px-2 py-3 gap-3">
      <h1 className="text-sm font-medium tracking-tight">
        <span className="text-basement-orange font-bold">Basement Normalizer</span>
        <span className="text-neutral-400 "> / </span>
        <span className="text-neutral-600 font-medium">Colors</span>
      </h1>

      <div className="flex flex-row justify-start items-start flex-wrap gap-2">
        {colors.map((color) => (
          <Color color={color} />
        ))}
      </div>
    </div>
  );
};
