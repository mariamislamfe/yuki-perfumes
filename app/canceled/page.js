import Link from "next/link";
import { SplitText } from "@/components/Reveal";

export const metadata = { title: "Payment canceled" };

export default function Canceled() {
  return (
    <section className="section page-top center-page">
      <SplitText as="h1" text="Payment canceled" className="display lg" italicWords={["canceled"]} immediate />
      <p className="lead">No charge was made. Your bag is still waiting for you.</p>
      <Link href="/products" className="btn">
        <span>Back to the collection</span>
      </Link>
    </section>
  );
}
