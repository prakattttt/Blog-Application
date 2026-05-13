import type { Content } from "../types/content.types";
import Cards from "./Cards";

const MainSection = ({ header, description }: Content) => {
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight">{header}</h1>

        <p className="text-lg text-gray-500 mt-3">{description}</p>
      </div>

      <Cards />
    </section>
  );
};

export default MainSection;
