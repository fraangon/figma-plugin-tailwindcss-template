import cn from "classnames";
import { rgbToHex } from "../../../utils/colors";
import { ColorElement } from "../../../types/colors";

export default function Color({ color }: { color: ColorElement }) {
  return (
    <div
      className={cn(
        "flex flex-row justify-start items-center p-2 gap-3 hover:bg-gray-950 bg-transparent rounded-lg w-full transition-colors cursor-pointer"
      )}
    >
      <div className="w-full flex flex-row justify-start items-center gap-3">
        <div
          className="h-6 min-w-6 w-6 rounded-full border border-gray-900"
          style={{
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
        />
        <h3 className="text-sm leading-none uppercase text-gray-50">
          {rgbToHex({ r: color.r, g: color.g, b: color.b })}
        </h3>
      </div>

      {color.times > 1 && (
        <span className="text-xs leading-none uppercase min-w-fit py-1 px-1.5 border border-gray-800 rounded bg-gray-950 text-gray-300">
          {color.times} times
        </span>
      )}
    </div>
  );
}
