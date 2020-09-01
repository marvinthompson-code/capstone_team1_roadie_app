import React from "react";
import { useSelector } from "react-redux";

import NotificationItem from "./NotificationItem";

const NotificationDisplay = () => {
  const notifications = useSelector((state) => state.notifications);

  const userNotifications = notifications.map((notification) => {
    return (
      <li key={notification.id}>
        <NotificationItem notification={notification} />
      </li>
    );
  });

  return (
    <>
      <h1>Notifications</h1>
      <ul>{userNotifications}</ul>
    </>
  );
};

export default NotificationDisplay;
