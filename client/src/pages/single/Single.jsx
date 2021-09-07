import { Sidebar } from "../../components/sidebar/Sidebar";
import Singlepost from "../../components/singlepost/Singlepost";
import "./single.css";
import {Context} from "../../context/Context";
import {useContext} from "react";


const Single = () => {
      const {user}=useContext(Context);

  return (
    <div className="single">
      <Singlepost />
      {user && <Sidebar />}
    </div>
  );
};

export default Single;
