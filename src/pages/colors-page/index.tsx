import { ColorWithUses } from "../../types/colors";
import { getColorKey } from "../../components/home/utils";
import Color from "../../components/ui/color";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function ColorsPage({
  colorsWithUses,
  variables,
  onColorReplace,
}: {
  colorsWithUses: ColorWithUses[];
  variables: Variable[];
  onColorReplace: (
    originalColor: ColorWithUses,
    newColor: ColorWithUses
  ) => void;
}) {
  return (
    <div className="max-h-[600px] w-full h-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50 overflow-y-scroll">
      <div className="flex flex-row items-center w-full h-[30px]">
        <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2">
          Colors
        </h1>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {colorsWithUses
          .sort((a, b) => {
            if (b.uses.length !== a.uses.length)
              return b.uses.length - a.uses.length;

            return b.variable ? 1 : a.variable ? -1 : 0;
          })
          .map((color) => (
            <DropdownMenu.Root key={getColorKey(color) + "-dropdown"}>
              <DropdownMenu.Trigger className="w-full outline-none">
                <Color
                  key={getColorKey(color)}
                  color={color}
                  variables={variables}
                />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                className="w-60 max-h-40 flex flex-col justify-start items-start gap-1 overflow-y-scroll bg-neutral-50 rounded-sm p-1 border border-neutral-200/50"
                sideOffset={2}
              >
                {colorsWithUses
                  .filter((c) => c.id !== color.id)
                  .map((colorReplacer) => (
                    <DropdownMenu.Item
                      key={getColorKey(colorReplacer) + "-item"}
                      className="w-full outline-none"
                      onClick={() => onColorReplace(color, colorReplacer)}
                    >
                      <Color
                        key={getColorKey(colorReplacer)}
                        color={colorReplacer}
                        variables={variables}
                      />
                    </DropdownMenu.Item>
                  ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ))}
      </div>
    </div>
  );
}
