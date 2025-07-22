import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./src/routing";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { ToastProvider } from "./src/context/ToastContext";

const App = () => {
  console.log("re render");

  return (
    <div className="bg-white ">
      <Provider store={store}>
        <ToastProvider>
          <RouterProvider
            router={routers}
            fallbackElement={<div>Loading...</div>}
          />
        </ToastProvider>
      </Provider>
    </div>
  );
};

export default App;
