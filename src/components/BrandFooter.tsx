import logo from "@/assets/logo.jpg";

const BrandFooter = () => (
  <footer className="bg-foreground text-primary-foreground py-16 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center gap-6">
        <img src={logo} alt="Brothers Vault" className="h-14 w-auto invert" />
        <p className="text-xs tracking-[0.35em] font-oswald text-primary-foreground/50">
          BUILT BY BROTHERHOOD • EST. 2025
        </p>
        <p className="text-xs tracking-wider font-oswald text-primary-foreground/40">
          LOYALTY • RESPECT • TRUST
        </p>
        <div className="w-16 h-px bg-primary-foreground/20 my-2" />
        <p className="text-[11px] text-primary-foreground/30 font-oswald tracking-wider">
          © {new Date().getFullYear()} BROTHERS VAULT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
);

export default BrandFooter;
