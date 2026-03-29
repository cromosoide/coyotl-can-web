import { FEATURES } from "@/lib/constants";

export default function FeatureBar() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FEATURES.map((feature) => (
          <div
            key={feature.titulo}
            className="flex items-center gap-4 px-6 py-5 sm:justify-center"
          >
            <span className="text-2xl">{feature.icono}</span>
            <div>
              <p className="font-bold text-[#2d0057]">{feature.titulo}</p>
              <p className="text-sm text-[#555]">{feature.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
