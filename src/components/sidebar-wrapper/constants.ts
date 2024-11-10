import ColorsPage from "../pages/colors-page";
import CommingSoonPage from "../pages/comming-soon-page";
import Icon from "../ui/icon";

export const ITEMS = [
  {
    id: "colors",
    label: "Colors",
    icon: Icon.Colors,
    component: ColorsPage,
  },
  {
    id: "fonts",
    label: "Fonts",
    icon: Icon.Fonts,
    component: CommingSoonPage,
  },
  {
    id: "replace",
    label: "Replace for variables",
    icon: Icon.Replace,
    component: CommingSoonPage,
  },
];
