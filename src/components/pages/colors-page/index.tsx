import { ColorWithUses } from "../../../types/colors";
import { getColorKey } from "../../home/utils";
import Color from "../../ui/color";

export default function ColorsPage({
  colorsWithUses,
  variables,
  onColorReplace,
}: {
  colorsWithUses: ColorWithUses[];
  variables: Variable[];
  onColorReplace: (originalColor: any, newColor: any) => void;
}) {
  console.log("COLORS WITH USES: ", colorsWithUses);
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50">
      <div className="flex flex-row items-center w-full h-[30px]">
        <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2">
          Colors
        </h1>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {colorsWithUses.map((color) => {
          return (
            <Color
              key={getColorKey(color)}
              color={color}
              variables={variables}
              onColorReplace={onColorReplace}
            />
          );
        })}
      </div>
    </div>
  );
}
