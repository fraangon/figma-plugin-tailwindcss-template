import cn from "classnames";
import { rgbToHex } from "../../../utils/colors";
import { ColorWithUses } from "../../../types/colors";

const getColorName = (color: ColorWithUses, variables: Variable[]) => {
  const variable = variables.find((v) => v.id === color.variable?.id);
  return variable?.name || rgbToHex({ r: color.r, g: color.g, b: color.b });
};

export default function Color({
  color,
  variables,
}: {
  color: ColorWithUses;
  variables: Variable[];
}) {
  return (
    <div
      className={cn(
        "flex flex-row justify-start items-center p-2 gap-2 rounded-lg w-full transition-colors cursor-pointer bg-gray-100 border border-gray-200/50 hover:bg-gray-200"
      )}
    >
      <div className="w-full flex flex-row justify-start items-center gap-2">
        <div
          className="h-4 min-w-4 w-4 rounded-full border border-gray-200/50"
          style={{
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
        />
        <h3
          className={cn(
            "text-xs leading-none font-medium text-gray-950 tracking-tight",
            !color.variable && "uppercase"
          )}
        >
          {getColorName(color, variables)}
        </h3>
      </div>

      {color?.uses?.length > 0 && (
        <span className="text-[10px] leading-none uppercase min-w-fit py-0.5 px-1 border border-gray-400/20 rounded bg-gray-200 text-gray-700 tracking-tight">
          {color.uses.length} times
        </span>
      )}
    </div>
  );
}
