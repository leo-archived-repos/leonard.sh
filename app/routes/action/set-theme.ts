import { createThemeAction } from "~/theme";
import { themeSessionResolver } from "../../sessions.server";

export const action = createThemeAction(themeSessionResolver);
