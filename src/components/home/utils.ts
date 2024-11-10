export const getColorKey = (color) => {
  return color.variable
    ? `${color.variable?.id}-${color.r}-${color.g}-${color.b}`
    : `${color.r}-${color.g}-${color.b}`;
};
