export default function ApplicationStatusBanner({ banner }) {
  if (!banner) return null;

  return (
    <div
      className={`flex h-[35px] w-full items-center justify-center rounded-full text-[16px] font-semibold ${banner.style}`}
    >
      {banner.text}
    </div>
  );
}
