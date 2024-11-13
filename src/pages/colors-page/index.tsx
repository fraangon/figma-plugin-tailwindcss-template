import { ColorWithUses } from "../../types/colors";
import { getColorKey } from "../../components/home/utils";
import Color from "../../components/ui/color";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import EmptyIlustration from "./components/empty-ilustration";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

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
  const [parent] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        setIsAtTop(true);
        setIsAtBottom(true);
        return;
      }

      setIsAtTop(scrollTop === 0);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [colorsWithUses]);

  return (
    <div className="max-h-[600px] w-full h-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50 relative">
      <div className="flex flex-row items-center w-full min-h-[30px]">
        <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2">
          Colors
        </h1>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-col justify-start items-start gap-2 w-full h-full overflow-y-scroll max-h-full relative"
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

      <div
        className={cn(
          "absolute top-[38px] left-0 w-full h-[30px] bg-gradient-to-b from-gray-50 to-transparent transition-all duration-100 pointer-events-none",
          isAtTop ? "opacity-0" : "opacity-100"
        )}
        key="top-gradient"
      />

      <div
        className={cn(
          "absolute bottom-[8px] left-0 w-full h-[30px] bg-gradient-to-t from-gray-50 to-transparent transition-all duration-100 pointer-events-none",
          isAtBottom ? "opacity-0" : "opacity-100"
        )}
        key="bottom-gradient"
      />
    </div>
  );
}
