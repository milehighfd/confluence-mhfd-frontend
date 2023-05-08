import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom'
import { useClearCache } from 'react-clear-cache';
import { useEffect } from 'react';

const useInitializeApp = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  const history = useHistory();

  useEffect(() => {
    function suppressNestingWarnings() {
      type SilenceableConsole = typeof console & { warningsSilenced?: boolean };

      // if (process.env.REACT_APP_NODE_ENV === 'production') { return; } // Uncomment this line to suppress warnings in production

      if ((console as SilenceableConsole).warningsSilenced) {
        return;
      }

      const origConsoleError = console.error;
      console.error = (...args: unknown[]) => {
        const [formatString, child, parent] = args;
        const isNestingWarning = (arg: unknown) => typeof arg === "string" && arg.includes("Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s");
        const concernsOurElements = (arg: unknown) => typeof arg === "string" && arg.includes("");

        if (isNestingWarning(formatString) && (concernsOurElements(child) || concernsOurElements(parent))) {
          return;
        }
        origConsoleError(...args);
      };

      (console as SilenceableConsole).warningsSilenced = true;
    }
    suppressNestingWarnings();
    ReactGA.initialize('UA-176723071-1');
  }, []);

  useEffect(() => {
    return history.listen((location: any) => {
      ReactGA.pageview(location.pathname);
    })
  }, [history]);

  useEffect(() => {
    if (!isLatestVersion) {
      if (window.confirm("There is a new version available, update?") == true) {
        emptyCacheStorage();
      }
    }
  }, [emptyCacheStorage, isLatestVersion]);
};

export default useInitializeApp;
