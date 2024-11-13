import { ColorWithUses } from "../../types/colors";
import { getColorKey } from "../../components/home/utils";
import Color from "../../components/ui/color";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import EmptyIlustration from "./components/empty-ilustration";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  return (
    <div className="max-h-[600px] w-full h-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50 ">
      <div className="flex flex-row items-center w-full h-[30px]">
        <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2">
          Colors
        </h1>
      </div>

      <div
        className="flex flex-col justify-start items-start gap-2 w-full h-full overflow-y-scroll max-h-full"
        ref={parent}
      >
        {colorsWithUses.length === 0 && (
          <div className="flex flex-col justify-center items-center w-full h-full gap-2 pb-20">
            <EmptyIlustration className="translate-x-[2px]" />
            <span className="text-gray-400 text-xs max-w-[100px] text-center">
              Start by selecting some elements.
            </span>
          </div>
        )}

        {colorsWithUses
          .sort((a, b) => {
            if (b.uses.length !== a.uses.length)
              return b.uses.length - a.uses.length;

            return b.variable ? 1 : a.variable ? -1 : 0;
          })
          .map((color) => (
            <div key={getColorKey(color) + "-container"} className="w-full">
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
            </div>
          ))}
      </div>
    </div>
  );
}
