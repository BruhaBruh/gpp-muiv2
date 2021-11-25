import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import React from "react";
import { Notification } from "../graphql/types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addNotifications, clearNotifications } from "../redux/cache/reducer";

const NotificationsLoader = () => {
  const isLoggedIn = useAppSelector((state) => state.userData.isLoggedIn);
  const dispatch = useAppDispatch();
  const [getNotifications, { data }] = useLazyQuery<{
    notifications: Notification[];
  }>(gql`
    query notifications {
      notifications {
        __typename
        ... on Billnotification {
          billnotificationId
          bill {
            billId
            amount
            status
            createdAt
            completedAt
          }
        }
        ... on Systemnotification {
          systemnotificationId
          createdAt
          message
        }
        ... on Friendnotification {
          friendnotificationId
          friendRs {
            friendNavigation {
              userId
              avatar
              discordId
              nickname
            }
          }
        }
        ... on Subscribernotification {
          subscribernotificationId
          subscriberRs {
            subscriberNavigation {
              userId
              avatar
              discordId
              nickname
            }
          }
        }
      }
    }
  `);
  const { data: newNotificationData } = useSubscription<{
    newNotification: Notification;
  }>(gql`
    subscription newNotifications {
      newNotification {
        __typename
        ... on Billnotification {
          billnotificationId
          bill {
            billId
            amount
            status
            createdAt
            completedAt
          }
        }
        ... on Systemnotification {
          systemnotificationId
          createdAt
          message
        }
        ... on Friendnotification {
          friendnotificationId
          friendRs {
            friendNavigation {
              userId
              avatar
              discordId
              nickname
            }
          }
        }
        ... on Subscribernotification {
          subscribernotificationId
          subscriberRs {
            subscriberNavigation {
              userId
              avatar
              discordId
              nickname
            }
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    clearNotifications();
    getNotifications();
  }, [isLoggedIn, getNotifications]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(addNotifications(data.notifications));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!newNotificationData) return;
    dispatch(addNotifications([newNotificationData.newNotification]));
  }, [newNotificationData, dispatch]);

  return <></>;
};

export default NotificationsLoader;
