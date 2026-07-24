import GnbWrapper from "./_components/GnbWrapper";

export default function MainLayout({ children }) {
  return (
    <>
      <GnbWrapper />
      {children}
    </>
  );
}
