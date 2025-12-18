
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastRatio = (rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }) => {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export const generateRandomHex = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

export const getHarmonies = (hex: string) => {
  const rgb = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const toHex = (hue: number) => {
    const r = hslToRgb((hue + 360) % 360, s, l);
    return rgbToHex(r.r, r.g, r.b);
  };

  return {
    complementary: [hex, toHex(h + 180)],
    analogous: [toHex(h - 30), hex, toHex(h + 30)],
    triadic: [hex, toHex(h + 120), toHex(h + 240)],
    splitComplementary: [hex, toHex(h + 150), toHex(h + 210)],
    tetradic: [hex, toHex(h + 60), toHex(h + 180), toHex(h + 240)],
  };
};

export const getShadesAndTints = (hex: string) => {
  const rgb = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const shades = [];
  const tints = [];
  
  for (let i = 1; i <= 5; i++) {
    const tRgb = hslToRgb(h, s, Math.min(100, l + i * 10));
    const sRgb = hslToRgb(h, s, Math.max(0, l - i * 10));
    tints.push(rgbToHex(tRgb.r, tRgb.g, tRgb.b));
    shades.push(rgbToHex(sRgb.r, sRgb.g, sRgb.b));
  }
  
  return { shades, tints };
};
