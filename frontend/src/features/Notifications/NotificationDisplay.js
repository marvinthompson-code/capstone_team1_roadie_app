import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveArtistInfo } from '../Artist/artistInfoSlice'
import "../../css/NotificationContainer.css";
import { apiURL } from "../../util/apiURL";
import axios from 'axios'

import NotificationItem from "./NotificationItem";

const NotificationDisplay = () => {
  const notifications = useSelector((state) => state.notifications);

  const API = apiURL()
  const dispatch = useDispatch()

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
