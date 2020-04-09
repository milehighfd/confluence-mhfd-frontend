import { useEffect, useCallback } from 'react'

export default (useFunctionChildren : EffectCallback, dependencies : DependencyList) => {

  /* eslint-disable react-hooks/exhaustive-deps */
  const initCallbackFunction = useCallback(() => {
    useFunctionChildren();
  }, dependencies);

  useEffect(() => {
    initCallbackFunction();
  }, [initCallbackFunction]);
}

type EffectCallback = () => (void | (() => void | undefined));

type DependencyList = ReadonlyArray<any>;

/* Types Reference */
/* https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c */