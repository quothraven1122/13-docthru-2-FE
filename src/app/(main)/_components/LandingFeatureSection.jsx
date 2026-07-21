import Image from "next/image";

export default function LandingFeatureSection({ icon, title, description, imgSm, imgLg, imgSize, imgAlt }) {
  return (
    <section className="mx-auto flex max-w-93.75 flex-col gap-8 px-4 py-12 md:max-w-186 lg:max-w-300 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-0 lg:py-20">
      <div className="md:ml-[1.94rem] lg:ml-0 lg:w-72 lg:shrink-0">
        <Image src={icon} alt="" property width={28} height={28} aria-hidden="true" />
        <h2 className="mt-3 text-[1.5rem] font-bold whitespace-pre-line text-gray-900">{title}</h2>
        <p className="mt-3 text-sm whitespace-pre text-gray-500">{description}</p>
      </div>

      <Image
        src={imgLg}
        alt={imgAlt}
        width={imgSize.lg.width}
        height={imgSize.lg.height}
        className="hidden md:mx-auto md:block lg:mx-0 lg:block"
      />
      <Image
        src={imgSm}
        alt={imgAlt}
        width={imgSize.sm.width}
        height={imgSize.sm.height}
        className="h-auto w-full md:hidden lg:hidden"
      />
    </section>
  );
}
