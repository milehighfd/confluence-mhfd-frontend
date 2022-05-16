import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom'
import { useClearCache } from 'react-clear-cache';
import { useEffect } from 'react';

const initGA = () => {
  ReactGA.initialize('UA-176723071-1');
};

const useInitializeApp = () => {
  const history = useHistory();
  // const { isLatestVersion, emptyCacheStorage } = useClearCache();

  // useEffect(() => {
  //   resetAppUser();
  //   resetProfile();
  //   resetMap();
  // }, []);

  useEffect(() => { initGA(); }, []);

  useEffect(() => {
    return history.listen((location) => {
      ReactGA.pageview(location.pathname);
    })
  }, [history]);

  // useEffect(() => {
  //   if (!isLatestVersion) {
  //     if (window.confirm("There is a new version available, update?") == true) {
  //       emptyCacheStorage();
  //     }
  //   }
  // }, [isLatestVersion])
};

export default useInitializeApp;
