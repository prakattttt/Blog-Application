import CreateForm from "./CreateForm";
import useWrite from "../hooks/useWrite";
import useAuth from "../hooks/useAuth";
import AskLoginPopup from "./AskLoginPopup";

const Create = () => {
  const { toggle } = useWrite();

  const { isLoggedIn } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center md:items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease]">
        <div className="p-6 md:p-8">
          {isLoggedIn ? (
            <>
              <div className="mb-5">
                <h2 className="text-2xl md:text-4xl font-extrabold text-black">
                  Create New Blog Post
                </h2>

                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Share your thoughts, ideas, and stories with the world.
                </p>
              </div>

              <hr className="border-gray-200 mb-5" />

              <CreateForm handleClick={toggle} />
            </>
          ) : (
          <AskLoginPopup toggle={toggle}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
