import Pagination from "@/components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination visiblePageCount={5} totalPageCount={19} />
    </div>
  );
}
