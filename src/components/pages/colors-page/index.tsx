import { ColorElement } from "../../../types/colors";
import Color from "../../ui/color";

export default function ColorsPage({ colors }: { colors: ColorElement[] }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50">
      <div className="flex flex-row items-center w-full h-[30px]">
        <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2">
          Colors
        </h1>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {colors.map((color) => (
          <Color color={color} key={`${color.r}-${color.g}-${color.b}`} />
        ))}
      </div>
    </div>
  );
}
