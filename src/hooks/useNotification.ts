import { useEffect } from "react";
import { messaging } from "../../firebase";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const useNotification = () => {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Notification received: ", payload);
      toast.success(payload.notification?.title)
    });
  }, []);
};

export default useNotification;
