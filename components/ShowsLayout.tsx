import React from "react";
import { ShowCard } from "./ShowsLayout/ShowCard";
import {
  StackContext,
  actions as stackActions,
} from "../contexts/StackContext";
import {
  NotificationContext,
  actions as notificationsActions,
  notificationNames,
} from "../contexts/NotificationsContext";
import { GET_STACK } from "../gql/getStack";
import { useQuery } from "@apollo/client";

export const ShowsLayout = () => {
  const [stackState, stackDispatch] = React.useContext(StackContext);
  const [NotificationsState, notificationsDispatch] = React.useContext(
    NotificationContext
  );
  const { error, data } = useQuery(GET_STACK, {
    variables: { pk: 2 },
  });

  React.useEffect(() => {
    if (!data) return;
    stackDispatch(stackActions.SET(data.stack_by_pk.shows));
    stackDispatch(stackActions.SET_ID(data.stack_by_pk.id));
  }, [data]);

  // todo : make less ugly
  React.useEffect(() => {
    if (stackState.littleLoad) {
      let canceled = false;
      setTimeout(() => {
        if (canceled) return;
        notificationsDispatch(
          notificationsActions.PUSH(
            notificationNames.SaveToSeverTakingLongerThanExpectedNotification,
            notificationNames.SaveToSeverTakingLongerThanExpectedNotification // using same as name to ensure uniqueness
          )
        );
      }, 2000);
      return () => {
        canceled = true;
      };
    } else {
      for (const index in NotificationsState) {
        if (
          NotificationsState[index] ===
          notificationNames.SaveToSeverTakingLongerThanExpectedNotification
        ) {
          notificationsDispatch(
            notificationsActions.REMOVE(Number.parseInt(index))
          );
          notificationsDispatch(
            notificationsActions.PUSH(
              notificationNames.SaveToServerCompleteAfterDelay,
              notificationNames.SaveToServerCompleteAfterDelay,
              5000
            )
          );
        }
      }
    }
  }, [stackState]);

  if (stackState.bigLoad) return null;
  // probably should show a spinner if this takes too long
  else
    return (
      <>
        <div className="grid grid-cols-1 gap-12 p-12 lg:grid-cols-2">
          {stackState.stack
            .map((show, index) => (
              <ShowCard index={index} key={index} show={show} />
            ))
            .reverse()}
        </div>
      </>
    );
};
