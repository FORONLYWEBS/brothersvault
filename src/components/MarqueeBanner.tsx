const items = ["FREE SHIPPING", "COD AVAILABLE", "PREMIUM QUALITY", "BUILT BY BROTHERHOOD", "EXCLUSIVE DROPS"];

const MarqueeBanner = () => (
  <div className="bg-foreground text-primary-foreground py-3 overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xs tracking-[0.25em] font-oswald">
          🔥 {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
