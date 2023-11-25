import React from "react";
import { ref, deleteObject } from "firebase/storage";
import { md5 } from "js-md5";
import { imageDB } from "../../utils/configFireBase";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import axiosM from "./../../utils/axiosM";

import "./datatable.scss";

const Datatable = ({ source, type }) => {
  const [list, setList] = React.useState([]);
  const { data, loading, error } = useFetch(`/api/${type}`);

  const handleDelete = async (params) => {
    switch (type) {
      case "users":
        try {
          await axiosM.delete(`api/${type}/${params.row._id}`, {
            withCredentials: true,
          });
          setList(list.filter((item) => item._id !== params.row._id));
          const desertRef = ref(
            imageDB,
            `booking_app_images/users/${md5(params.row.email)}/${md5(
              params.row.email
            )}`
          );
          await deleteObject(desertRef);
        } catch (error) {}
        break;
      case "hotels":
        try {
          await axiosM.delete(`api/${type}/${params.row._id}`, {
            withCredentials: true,
          });
          setList(list.filter((item) => item._id !== params.row._id));
          await Promise.all(
            params.row.photos.map(async (img, i) => {
              const desertRef = ref(
                imageDB,
                `booking_app_images/hotels/${md5(params.row.address)}/${md5(
                  params.row.address.concat(i)
                )}`
              );
              return await deleteObject(desertRef);
            })
          );
        } catch (error) {}
        break;
      case "rooms":
        try {
          await axiosM.delete(`api/${type}/${params.row._id}`, {
            withCredentials: true,
          });
          setList(list.filter((item) => item._id !== params.row._id));
        } catch (error) {}
        break;
      default:
        console.log("Unexpected error");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${type}/test`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <p>
          Add New <span>{type.slice(0, -1)}</span>
        </p>
        <Link to={`/${type}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list.map((item, i) => ({ ...item, id: i + 1 }))}
        columns={source.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Datatable;
