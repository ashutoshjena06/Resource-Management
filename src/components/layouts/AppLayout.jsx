import { Outlet, useNavigation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Loader } from "./Loader";
import "./Loader.css";

const AppLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  console.log(navigation.state);
  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default AppLayout;
