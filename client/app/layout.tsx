"use client";
import NavigationComponent from "@/components/others/NavigationComponent";
import "../public/styles/globals.scss";
import FooterComponent from "@/components/others/FooterComponent";
import reduxStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={reduxStore}>
        <ToastContainer position="top-left"  theme="dark"/>
            <NavigationComponent />
            {children}
            <FooterComponent />
         
        </Provider>
      </body>
    </html>
  );
}
