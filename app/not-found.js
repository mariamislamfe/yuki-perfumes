import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-top center-page">
      <h1 className="display xl">Scent <em>not found</em></h1>
      <Link href="/products" className="btn">
        <span>Browse the collection</span>
      </Link>
    </section>
  );
}
