"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../utils/reactQueryClient";
import { ToastProvider } from "../../contexts/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/k-link nepal.jpg" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
          {loading ? <Loader /> : children}
          </ToastProvider>
        </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
