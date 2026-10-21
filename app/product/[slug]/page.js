import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import { Reveal, SplitText } from "@/components/Reveal";
import { getProduct, getProducts } from "@/lib/catalog";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProduct(slug), getProducts()]);
  if (!product) notFound();

  const images = product.images;
  const cartItem = {
    _id: product._id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    image: images[0] ?? "",
  };
  const others = products.filter((p) => p._id !== product._id);

  return (
    <>
      <ProductDetail product={product} images={images} cartItem={cartItem} />
      <Marquee items={[product.name, "Eau de parfum", product.name, "Blossom"]} reverse />
      <section className="section">
        <div className="section-head">
          <SplitText text="You may also like" className="display lg" italicWords={["like"]} />
        </div>
        <div className="grid">
          {others.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
