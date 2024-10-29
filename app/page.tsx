import Image from "next/image";
import ShoppingPage from "./Shopping/Shopping";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section>
        <ShoppingPage/>
      </section>
    </div>
  );
}
