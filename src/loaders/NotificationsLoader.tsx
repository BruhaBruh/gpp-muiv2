import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import React from "react";
import { Notification } from "../graphql/graphql";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addNotifications } from "../redux/notifications/reducer";

const NotificationsLoader = () => {
  const server = useAppSelector((state) => state.userData.serverId);
  const profile = useAppSelector((state) => state.userData.profileId);
  const [getNotifications, { data }] = useLazyQuery<{
    notifications: Notification[];
  }>(gql`
    query notifications($server: ObjectID!) {
      notifications(server: $server) {
        __typename
        ... on SystemNotification {
          id
          message
          createdAt
        }
        ... on SubscriberNotification {
          id
          createdAt
          subscriber {
            id
            avatar
            nickname
            lastOnline
          }
        }
        ... on OrderNotification {
          id
          createdAt
          cost
          amount
          product {
            icon {
              name
              image
              category {
                color
              }
            }
            owner {
              id
              nickname
            }
          }
        }
      }
    }
  `);
  const { data: subData } = useSubscription<{
    newNotification: Notification;
  }>(
    gql`
      subscription newNotification($profile: ObjectID!) {
        newNotification(profile: $profile) {
          __typename
          ... on SystemNotification {
            id
            message
            createdAt
          }
          ... on SubscriberNotification {
            id
            createdAt
            subscriber {
              id
              avatar
              nickname
              lastOnline
            }
          }
          ... on OrderNotification {
            id
            createdAt
            cost
            amount
            product {
              icon {
                name
                image
              }
              owner {
                id
                avatar
                nickname
                lastOnline
              }
            }
          }
        }
      }
    `,
    { variables: { profile } }
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!server) return;
    getNotifications({ variables: { server } });
  }, [server, getNotifications]);

  React.useEffect(() => {
    if (!data) return;
    dispatch(addNotifications(data.notifications));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!subData) return;
    dispatch(addNotifications([subData.newNotification]));
  }, [subData, dispatch]);

  return <></>;
};

export default NotificationsLoader;
