import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { axiosInstance } from "../../services/axiosInstance";
import SideBar from "../../components/SideBar";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { catalogSchema } from "../../schema/catalogSchema";
const Catalog = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [createNew, setCreateNew] = useState(false);
  const { token } = useAuth();
  const [reload, setReload] = useState(false);

  const getCatalogs = () => {
    axiosInstance(token)
      .get(`catalogs/?limit=100&offset=0`)
      .then((res) => {
        setCatalogs(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCatalogs();
  }, [reload]);

  const getDetails = (id) => {
    axiosInstance(token)
      .get(`catalogs/${id}`)
      .then((res) => {
        setCatalogs(res.data);
        setShowDetails(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axiosInstance(token)
      .delete(`catalogs/${id}/`)
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNew = (values) => {
    console.log(values);
    axiosInstance(token)
      .post("catalogs/", {
        name: values.catalogName,
      })
      .then((res) => {
        console.log(res);
        setCreateNew(false);
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (values) => {
    console.log(values);
    axiosInstance(token)
      .put(`catalogs/${values.id}/`, {
        name: values.catalogName,
      })
      .then((res) => {
        console.log(res);
        setEdit(null);
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>Catalog</div>
      <button onClick={() => setCreateNew(!createNew)}>
        {createNew ? "close " : "create new catalog"}
      </button>
      {!showDetails && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Product Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {catalogs?.catalogs?.map((e) => {
              return (
                <tr key={e?.id}>
                  <td>{e?.name}</td>
                  <td>{e?.product_count}</td>
                  <td>
                    <button onClick={() => setEdit(e)}>Edit</button>
                    <button
                      onClick={() => {
                        getDetails(e?.id);
                      }}
                    >
                      Get Details
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(e?.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div>
        {createNew && (
          <Formik
            initialValues={{ catalogName: "" }}
            validationSchema={catalogSchema}
            onSubmit={handleCreateNew}
          >
            <Form>
              <label htmlFor="catalogName">
                Catalog Name<Field type="text" name="catalogName"></Field>
              </label>
              <ErrorMessage name="catalogName" component="small" />
              <button type="submit">Create new Catalog</button>
            </Form>
          </Formik>
        )}

        {showDetails && (
          <>
            <button
              onClick={() => {
                setShowDetails(false);
                setReload(!reload);
              }}
            >
              Close
            </button>
            <div>
              id: {showDetails?.id} name: {showDetails?.name}, connected_stores:{" "}
              {showDetails?.connected_stores?.map((e) => {
                <span>{e}</span>;
              }) || "No conntected stores"}
              , ai_rule_group: {showDetails?.ai_rule_group}, product_count:{" "}
              {showDetails?.product_count},
              <br />
              statistics:
              <div>
                enhancedProducts: {showDetails?.statistics?.enhancedProducts},
                enhancedPercentage:{" "}
                {showDetails?.statistics?.enhancedPercentages},
                pendingEnhancements:
                {showDetails?.statistics?.pendingEnhancements}
              </div>
            </div>
          </>
        )}
      </div>
      {edit && (
        <Formik
          initialValues={{ catalogName: edit.name, id: edit.id }}
          validationSchema={catalogSchema}
          onSubmit={handleEdit}
        >
          <Form>
            <label htmlFor="catalogName">
              Catalog Name<Field type="text" name="catalogName"></Field>
            </label>
            <ErrorMessage name="catalogName" component="small" />
            <button type="submit">Create new Catalog</button>
          </Form>
        </Formik>
      )}
      <SideBar />
    </>
  );
};

export default Catalog;
