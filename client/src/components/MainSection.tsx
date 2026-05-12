import type { Content } from "../types/content.types";

const MainSection = ({ header, description }: Content) => {
  return (
    <section className="m-10">
      <h1 className=" text-5xl font-semibold">{header}</h1>
      <p className=" text-xl text-gray-500 my-3">{description}</p>
    </section>
  );
};

export default MainSection;
