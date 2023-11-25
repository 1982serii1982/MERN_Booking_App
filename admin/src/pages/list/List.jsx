import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

import "./list.scss";

const List = ({ source, type }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable source={source} type={type} />
      </div>
    </div>
  );
};

export default List;
