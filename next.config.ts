import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 solo sirve las calidades listadas acá: cualquier otro `quality`
       se redondea a la más cercana. Sin esta lista, todo caía a 75. */
    qualities: [60, 75, 82, 85],
  },
};

export default nextConfig;
