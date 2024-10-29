import {
  ColorSchemeScript,
  Container,
  createTheme,
  Input,
  MantineProvider,
  rem,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import inputClasses from "~/styles/input.module.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./global.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: "480px",
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
};

const mantineTheme = createTheme({
  components: {
    Input: Input.extend({ classNames: inputClasses }),
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
  colors: {
    greenBrand: [
      "#e0fef4",
      "#b9f6e2",
      "#90efcf",
      "#66e8bc",
      "#3fe1aa",
      "#28c891",
      "#1c9c70",
      "#106f50",
      "#03432f",
      "#00180e",
    ],
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "d13d8de8-9879-4edd-8ba8-8b994a5809db",
      safari_web_id: "web.onesignal.auto.43666e9c-a8ad-4b1e-8de4-10291bcbdb86",
      notifyButton: {
        enable: true,
      },
    });
  });`,
          }}
        />
      </head>
      <body>
        <MantineProvider theme={mantineTheme}>
          <Notifications />
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
