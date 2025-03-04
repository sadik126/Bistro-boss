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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Background এ Refetch হবে না
      retry: 1, // শুধুমাত্র একবার রিট্রাই করবে
      staleTime: 5 * 60 * 1000, // 5 মিনিট পরে Data আবার fetch করবে ekhane cache theke data show korbe 
    },
  },
})



createRoot(document.getElementById("root")).render(

  <StrictMode>

    <HelmetProvider>

      <Authprovider>

        <QueryClientProvider client={queryClient}>


          <div >
            <RouterProvider router={router} fallbackElement={<Loading />}></RouterProvider>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>

        </QueryClientProvider>

      </Authprovider>

    </HelmetProvider>






  </StrictMode>
);
