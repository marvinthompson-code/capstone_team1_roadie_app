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
      <li key={notification.id}>
        <NotificationItem notification={notification} />
      </li>
    );
  });

  return (
    <div class="jumbotron-fluid notificationContainer text-center">
      <h1 class="display-4">Notifications</h1>
      <ul>{userNotifications}</ul>
    </div>
  );
};

export default NotificationDisplay;
