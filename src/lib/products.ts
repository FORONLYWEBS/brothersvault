import tshirtBrotherhood from "@/assets/tshirt-brotherhood.png";
import tshirtBarcelona from "@/assets/tshirt-barcelona.png";
import tshirt1 from "@/assets/tshirt-1.jpg";
import tshirt2 from "@/assets/tshirt-2.jpg";
import tshirt3 from "@/assets/tshirt-3.jpg";
import tshirt4 from "@/assets/tshirt-4.jpg";
import tshirt5 from "@/assets/tshirt-5.jpg";
import tshirt6 from "@/assets/tshirt-6.jpg";
import tshirt7 from "@/assets/tshirt-7.jpg";
import type { Product } from "./store";

export const products: Product[] = [
  { id: "1", name: "Brotherhood Classic Tee", price: 699, image: tshirtBrotherhood, tag: "BESTSELLER" },
  { id: "2", name: "Barcelona Legacy Tee", price: 799, image: tshirtBarcelona, tag: "NEW" },
  { id: "3", name: "Vault Oversized Black", price: 599, image: tshirt1 },
  { id: "4", name: "Vault Minimal Green", price: 649, image: tshirt2 },
  { id: "5", name: "Y2K Graphic Streetwear", price: 749, image: tshirt3, tag: "HOT" },
  { id: "6", name: "Photo Print Vault Tee", price: 699, image: tshirt4 },
  { id: "7", name: "Planet Slogan Tee", price: 599, image: tshirt5 },
  { id: "8", name: "Casual Vault Fit", price: 649, image: tshirt6 },
  { id: "9", name: "Acid Wash Vault Tee", price: 799, image: tshirt7, tag: "LIMITED" },
];
