import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "~/theme";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "color-mode",
    secure: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    path: "/",
    httpOnly: true,
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
