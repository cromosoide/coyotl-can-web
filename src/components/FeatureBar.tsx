"use client";

import { FEATURES } from "@/lib/constants";
import FadeIn from "./animations/FadeIn";

export default function FeatureBar() {
  return (
    <section className="border-b border-[#ff006b]/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[#ff006b]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FEATURES.map((feature, i) => (
          <FadeIn key={feature.titulo} delay={i * 0.1}>
            <div className="flex items-center gap-4 px-6 py-6 sm:justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff006b]/10 text-2xl">
                {feature.icono}
              </span>
              <div>
                <p className="font-bold text-[#2d0057]">{feature.titulo}</p>
                <p className="text-sm text-[#555]">{feature.descripcion}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
