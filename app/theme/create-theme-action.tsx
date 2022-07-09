import { type ActionFunction, json } from "@remix-run/server-runtime";
import { type ThemeSessionResolver } from "./theme-server";
import { isTheme } from "./theme-provider";

const createThemeAction = (
  themeSessionResolver: ThemeSessionResolver
): ActionFunction => {
  const action: ActionFunction = async ({ request }) => {
    const session = await themeSessionResolver(request);
    const { theme } = await request.json();

    if (!isTheme(theme))
      return json({
        success: false,
        message: `theme value of ${theme} is not a valid theme.`,
      });

    session.setTheme(theme);
    return json(
      { success: true },
      {
        headers: { "Set-Cookie": await session.commit() },
      }
    );
  };
  return action;
};

export { createThemeAction };
