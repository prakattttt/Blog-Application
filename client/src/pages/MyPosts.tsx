import MainSection from "../components/MainSection";
import useAuth from "../hooks/useAuth";
import content from "../utils/SectionInfo";
import AskLogin from "../components/AskLogin";

const MyPosts = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <MainSection {...content.myPosts} /> : <AskLogin menu={"posts"}/>;
};

export default MyPosts;
