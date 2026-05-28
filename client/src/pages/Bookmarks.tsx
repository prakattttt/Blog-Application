import MainSection from "../components/MainSection";
import content from "../utils/SectionInfo";
import useAuth from "../hooks/useAuth";
import AskLogin from "../components/AskLogin";

const Bookmarks = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <MainSection {...content.bookmarks} /> : <AskLogin menu={"bookmarks"}/>;
};

export default Bookmarks;
