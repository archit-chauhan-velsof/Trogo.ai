import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import {
  axiosInstance,
  axiosInstanceWithoutBaseURL,
} from "../../services/axiosInstance";
import { useAuth } from "../../context/useAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { newRuleGroupSchema } from "../../schema/ruleGroupSchema";

const AiGroupRules = () => {
  const { token } = useAuth();
  const [groupRules, setGroupRules] = useState(null);
  const [url, setUrl] = useState(null);
  const [groupDetails, setGroupDetails] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(null);
  const getGroupRules = () => {
    axiosInstance(token)
      .get(`rule-group/list/?limit=1&offset=0`)
      .then((res) => {
        setGroupRules(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPaginatedGroupRules = () => {
    axiosInstanceWithoutBaseURL(token)
      .get(url)
      .then((res) => {
        setGroupRules(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = (id) => {
    axiosInstance(token)
      .get(`/rule-group/${id}/`)
      .then((res) => setGroupDetails(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleCreateNew = (values) => {
    axiosInstance(token)
      .post("/rule-group/add/", {
        name: values.groupName,
      })
      .then(() => {
        setAddNew(false);
        setReload(!reload);
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = (values) => {
    axiosInstance(token)
      .patch(`/rule-group/${values.id}/update/`, {
        name: values.groupName
      })
      .then((res) => {
        setReload(!reload);
        setUpdate(null);
      })
      .catch((err) => console.log(err));
  };

  const HandleDelete = (id) => {
    axiosInstance(token)
      .delete(`rule-group/${id}/delete/`)
      .then((res) => setReload(!reload))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!url) return;
    getPaginatedGroupRules();
  }, [url]);
  useEffect(() => {
    getGroupRules();
  }, [reload]);

  return (
    <>
      <div>AiGroupRules</div>
      <button onClick={() => setAddNew(!addNew)}>
        {addNew ? "Close" : "Add new"}
      </button>
      {addNew && (
        <Formik
          initialValues={{
            groupName: "",
          }}
          onSubmit={handleCreateNew}
          validationSchema={newRuleGroupSchema}
        >
          <Form>
            <Field name="groupName" />
            <ErrorMessage component="small" name="groupName" />
            <button type="submit">Create New</button>
          </Form>
        </Formik>
      )}
      {groupRules && (
        <>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {groupRules?.rule_groups?.map((e) => {
                return (
                  <tr key={e?.id}>
                    <td>{e?.name}</td>
                    <td>
                      <button onClick={() => getDetails(e?.id)}>
                        View Details
                      </button>
                      <button onClick={() => setUpdate(e)}>Update</button>
                      <button onClick={() => HandleDelete(e?.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={() => setUrl(groupRules?.previous)}
            disabled={!groupRules?.previous}
          >
            Prev
          </button>
          <button
            onClick={() => setUrl(groupRules?.next)}
            disabled={!groupRules?.next}
          >
            Next
          </button>
        </>
      )}
      {update && (
        <Formik
          initialValues={{
            groupName: update?.name,
            id: update?.id,
          }}
          onSubmit={handleUpdate}
          validationSchema={newRuleGroupSchema}
        >
          <Form>
            <Field name="groupName" />
            <ErrorMessage component="small" name="groupName" />
            <button type="submit">Update New</button>
          </Form>
        </Formik>
      )}
      {groupDetails && JSON.stringify(groupDetails)}
      <SideBar />
    </>
  );
};

export default AiGroupRules;
