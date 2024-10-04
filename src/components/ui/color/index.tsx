import cn from "classnames";
import { rgbToHex, rgbToHsl } from "../../../utils/colors";

export default function Color({ color }: { color: RGB }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-end items-start border border-neutral-500/20 rounded p-2 h-20 w-20",
        rgbToHsl(color).l > 50 ? "text-neutral-950" : "text-neutral-50"
      )}
      key={`${color.r}-${color.g}-${color.b}`}
      style={{
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div className="flex flex-col justify-end items-center">
        <h3 className="text-xs uppercase">
          {rgbToHex({ r: color.r, g: color.g, b: color.b })}
        </h3>
      </div>
    </div>
  );
}
