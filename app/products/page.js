import ProductCard from "@/components/ProductCard";
import { SplitText, Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/sanity";

export const metadata = { title: "The Collection" };

export default async function Products() {
  const products = await getProducts();
  return (
    <section className="section page-top">
      <div className="section-head">
        <SplitText as="h1" text="The full collection" className="display xl" italicWords={["collection"]} immediate />
        <Reveal delay={0.2}>
          <p className="lead">{products.length} fragrances. Find the one that tells your story.</p>
        </Reveal>
      </div>
      <div className="grid">
        {products.map((p, i) => (
          <ProductCard key={p._id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
