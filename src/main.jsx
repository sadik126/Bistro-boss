import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Routes/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import Authprovider from "./Pages/Authprovider/Authprovider.jsx";
import { Toaster } from "react-hot-toast";
import Loading from "./Pages/Loading/Loading.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()



createRoot(document.getElementById("root")).render(
  
  <StrictMode>

<Authprovider>

<QueryClientProvider client={queryClient}>

<HelmetProvider>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router}></RouterProvider>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
      </HelmetProvider>
</QueryClientProvider>
     
    </Authprovider>


    
       
    
   
  </StrictMode>
);
