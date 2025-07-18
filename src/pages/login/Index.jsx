import React, { useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { axiosInstanceWithoutToken } from "../../services/axiosInstance";
import { loginSchema } from "../../schema/loginAndRegisterSchema";

const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (values) => {
    console.log(values);
    axiosInstanceWithoutToken
      .post(`auth/login/`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {console.log(res.data); login(res.data.data);})
      .catch((err) => console.log(err));
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form>
        <label htmlFor="email">
          Email : <Field type="text" name="email" id="email" />
        </label>
        <ErrorMessage component="small" name="email" />
        <label htmlFor="password">
          Password : <Field type="password" name="password" id="password" />
        </label>
        <ErrorMessage component="small" name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login;
