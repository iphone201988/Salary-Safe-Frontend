import AppRouter from "./Router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux/store.tsx";
import UseNotification from "./hooks/useNotification.tsx";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <UseNotification/>
      <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AppRouter />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
