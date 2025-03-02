"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { SnackbarProvider } from "notistack";
import "./globals.css";

import theme from "@/src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Layout } from "@/src/components/layout";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "@/src/components/error-boundary";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <title>Averroes AI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Your site description goes here." />
        {/* Add other meta tags as needed */}
      </head>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <ErrorBoundary>
                  <Layout>{children}</Layout>
                </ErrorBoundary>
              </SnackbarProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
