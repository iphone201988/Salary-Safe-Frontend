import { useEffect } from "react";
import { messaging } from "../../firebase";
import { onMessage } from "firebase/messaging";

const useNotification = () => {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Notification received: ", payload);
      // Handle notifications here
    });
  }, []);
};

export default useNotification;
