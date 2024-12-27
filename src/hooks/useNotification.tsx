import { useEffect, useState } from "react";
import { messaging } from "../../firebase";
import { onMessage } from "firebase/messaging";

const UseNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationPayload, setNotificationPayload] = useState<any>({});

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Notification received: ", payload);

      setNotificationPayload(payload?.notification);
      setShowNotification(true);
      // setTimeout(() => {
      //   setShowNotification(false);
      // }, 5000);
    });
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded border border-black shadow-lg z-50 animate-slide-down flex items-center justify-between w-96">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              className="w-[65px] rounded-full"
              alt="notification-img"
            />
            <div>
              <h4 className="font-bold text-lg">{notificationPayload.title}</h4>
              <p className="text-sm">{notificationPayload.body}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 text-gray-700 hover:text-red-800 font-bold text-lg focus:outline-none"
          >
            &#10005; {/* Unicode for "X" */}
          </button>
        </div>
      )}
    </div>
  );
};

export default UseNotification;
