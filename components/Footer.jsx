import Link from "next/link";
import { Reveal } from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="footer-top">
        <p>Scents that linger long after you have left the room.</p>
        <nav>
          <Link href="/products" className="link-u">
            Collection
          </Link>
          <a href="mailto:websity@gmail.com" className="link-u">
            websity@gmail.com
          </a>
        </nav>
      </Reveal>
      <div className="footer-mark" aria-hidden>
        Yuki Glow
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Websity Ecommerce. All rights reserved.</span>
        <span>Instagram · Twitter</span>
      </div>
    </footer>
  );
}
