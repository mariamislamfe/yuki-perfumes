import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import EditorialBanner from "@/components/EditorialBanner";
import { Reveal, SplitText } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { getBanner, getProducts, img } from "@/lib/sanity";

export default async function Home() {
  const [products, banner] = await Promise.all([getProducts(), getBanner()]);
  const imageUrl = banner ? img(banner.image, 1000) : "";

  return (
    <>
      {banner && <Hero banner={banner} imageUrl={imageUrl} />}
      <Marquee items={["Best selling", "Eau de parfum", "Long lasting", "Made to be remembered"]} />

      <section className="section">
        <div className="section-head">
          <SplitText text="Best selling scents" className="display lg" italicWords={["scents"]} />
          <Reveal delay={0.15}>
            <p className="lead">Four signatures, each a different version of her.</p>
          </Reveal>
        </div>
        <div className="grid">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
        <Reveal className="center">
          <Magnetic className="inline">
            <Link href="/products" className="btn ghost">
              <span>View all products</span>
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      {banner && <EditorialBanner banner={banner} imageUrl={imageUrl} />}
    </>
  );
}
