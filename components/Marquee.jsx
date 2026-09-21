export default function Marquee({ items, reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`} aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-group" key={k}>
            {row.map((t, i) => (
              <span key={i}>
                {t} <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
