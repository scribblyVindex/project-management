import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Calendar from "react-calendar";

import "../styles/DatePicker.css";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout";
import AppState from "context/AppState";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [value, setValue] = useState();

  return (
    <SessionProvider session={session}>
      <AppState>
        <Layout className="overscroll-none">
          <Component {...pageProps} />
          {/* <Calendar onChange={setValue} value={value} /> */}
        </Layout>
      </AppState>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
