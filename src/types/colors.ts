export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorElement extends RGB {
  times: number;
  variable?: string;
}

export interface ComponentWithColors {
  id: string;
  name: string;
  colors: ColorElement[];
}
