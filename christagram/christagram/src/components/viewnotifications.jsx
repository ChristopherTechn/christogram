import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notifications", {
        withCredentials: true,
      });
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationsClick = () => {
    fetchNotifications();
  };

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <button onClick={handleNotificationsClick}>Show Notifications</button>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.notification_id}>
              <p>## {notification.notification_message}</p>
              {/* <p># {notification.related_id}</p> */}
              <p>@ {notification.NotificationTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications to display</p>
      )}
    </div>
  );
};

export default Notifications;
