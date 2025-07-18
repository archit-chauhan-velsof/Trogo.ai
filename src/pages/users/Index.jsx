import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { axiosInstance } from "../../services/axiosInstance";
import { useAuth } from "../../context/useAuth";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { userSchema } from "../../schema/userSchema";

const Users = () => {
  const [usersData, setUsersData] = useState(null);
  const { token } = useAuth();
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  useEffect(() => {
    axiosInstance(token)
      .get(`users/me/`)
      .then((res) => setUsersData(res.data.data))
      .catch((err) => console.log(err));
  }, [reload]);

  const handleUpdate = (values) => {
    axiosInstance(token)
      .patch("/users/me/update/", {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        company_name: values.companyName,
      })
      .then((res) => {
        setReload(!reload);
        setEdit(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>Users</div>

      {edit && (
        <Formik
          initialValues={{
            email: edit.email,
            firstName: edit.first_name,
            lastName: edit.last_name,
            companyName: edit.company_name,
          }}
          validationSchema={userSchema}
          onSubmit={handleUpdate}
        >
          <Form>
            <label>
              Email :
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="small" />
            </label>
            <label>
              First Name :
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="small" />
            </label>
            <label>
              Last Name :
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="small" />
            </label>
            <label>
              Company Name :
              <Field type="text" name="companyName" />
              <ErrorMessage name="companyName" component="small" />
            </label>
            <button type="submit">Update</button>
          </Form>
        </Formik>
      )}
      <br />
      <br />
      {
        changePassword && (
          <Formik
          initialValues={{
            current_password : "",
            password : "",
            confirm_password : "",
          }}
          
          >
            <Form>
              
            </Form>
          </Formik>
        )
      }
      <br />
      <br />
      {usersData && (
        <div>
          <h2>Users Data</h2>
          <button onClick={() => setChangePassword(!changePassword)}>
            {changePassword ? "close form" : "Change password here"}
          </button>

          {JSON.stringify(usersData)}

          <button onClick={() => setEdit(usersData)}>Update Data</button>
        </div>
      )}
      <SideBar />
    </>
  );
};

export default Users;
