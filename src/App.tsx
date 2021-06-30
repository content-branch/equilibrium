import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import  NavigationTabsProvider from "@amp-components/Layout/NavigationTabsProvider";
import { THEME_CONFIG } from './configs/AppConfig';
import { track, dispatch, init as initAnalytics } from "./util/analytics";
import * as reactHotkeys from "react-hotkeys";

const context = {
  source: "amplication-client",
};

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

export const enhance = track<keyof typeof context>(
  // app-level tracking data
  context,

  {
    dispatch,
  }
);

function App() {

  useEffect(() => {
    initAnalytics();
  }, []);

  //The default behavior across all <HotKeys> components
  reactHotkeys.configure({
    //Disable simulate keypress events for the keys that do not natively emit them
    //When Enabled - events are not captured after using Enter in <textarea/>
    simulateMissingKeyPressEvents: false,
    //Clear the ignoreTags array to includes events on textarea and input
    ignoreTags: [],
  });

  return (
    <div className="App">
      <Provider store={store}>
        <NavigationTabsProvider>
          <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
            <Router>
              <Switch>
                <Route path="/" component={Views}/>
              </Switch>
            </Router>
          </ThemeSwitcherProvider>
        </NavigationTabsProvider>
      </Provider>
    </div>
  );
}

export default enhance(App);
