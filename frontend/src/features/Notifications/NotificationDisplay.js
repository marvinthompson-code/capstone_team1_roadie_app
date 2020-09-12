import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../css/NotificationContainer.css";

import NotificationItem from "./NotificationItem";

const NotificationDisplay = () => {
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userNotifications = notifications.map((notification) => {
    return (
      <li key={notification.id} className="resultItem">
        <NotificationItem notification={notification} />
      </li>
    );
  });

  return (
    <div className="container-fluid notificationParent">
    <div className="jumbotron notificationContainer text-center">
      <div className="row justify-content-center notificationGrandchild">
      <h1 className="display-4" id="notificationHeader">Notifications</h1>
      </div>
      <div className="row notificationSecondGrandchild">
      <ul className="notificationsUl">{userNotifications}</ul>
      </div>
    </div>
    </div>
  );
};

export default NotificationDisplay;
