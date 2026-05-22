import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="black"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
