import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { axiosInstance } from "../../services/axiosInstance";
import { useAuth } from "../../context/useAuth";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [reload, setReload] = useState(false);

  const { token } = useAuth();

  const getNotifications = () => {
    axiosInstance(token)
      .get(`/notifications/?status=all`)
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNotifications();
  }, [reload]);

  const handleRead = (id) => {
    console.log(id);
    axiosInstance(token).post(`/notifications/mark-read/${id}/`).then((res)=>{
      console.log(res);
      setReload(!reload);
    }).catch((err)=>console.log(err));
  }

  const handleReadAll = () => {
    axiosInstance(token).post(`/notifications/mark-all-read/`).then((res)=>{
      console.log(res);
      setReload(!reload);
    }).catch((err)=>console.log(err));
  }

  return (
    <>
      <div>Notifications</div>
      <div><button onClick={()=>handleReadAll()}>Mark All Read</button></div>
      <table>
        <thead>
          <tr>
            <td>Message</td>
            {/* <td>URL</td> */}
            <td>Viewed</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {notifications?.notifications?.map((e) => {
            return (
              <tr key={e?.pk}>
                <td>{e?.message}</td>
                {/* <td>{e?.url}</td> */}
                <td>{e?.is_viewed ? "True" : "False" }</td>
                <td>{! e?.is_viewed ? (<button onClick={()=>handleRead(e?.pk)}>Mark as read</button>) : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SideBar />
    </>
  );
};

export default Notifications;
