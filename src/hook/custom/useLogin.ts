import { useEffect, useState } from 'react';
import * as datasets from 'Config/datasets'
import { SERVER } from 'Config/Server.config';
import { useMapDispatch } from 'hook/mapHook';
import { useProfileDispatch } from 'hook/profileHook';
import { useAppUserDispatch } from 'hook/useAppUser';

const useLogin = () => {
  const { replaceFilterCoordinates } = useMapDispatch();
  const { replaceAppUser } = useAppUserDispatch();
  const { saveUserInformation } = useProfileDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    datasets.getData(SERVER.ME, datasets.getToken())
      .then((res) => {
        if (res?.user_id) {
          saveUserInformation(res);
          if (res.polygon && res.polygon.length) {
            let bottomLongitude = res.polygon[0][0];
            let bottomLatitude = res.polygon[0][1];
            let topLongitude = res.polygon[0][0];
            let topLatitude = res.polygon[0][1];
            for (let index = 0; index < res.polygon.length; index++) {
              const element = res.polygon[index];
              if (bottomLongitude > element[0]) {
                bottomLongitude = element[0];
              }
              if (topLongitude < element[0]) {
                topLongitude = element[0];
              }
              if (bottomLatitude > element[1]) {
                bottomLatitude = element[1];
              }
              if (topLatitude < element[1]) {
                topLatitude = element[1];
              }
            }
            bottomLongitude -= 0.125;
            topLongitude += 0.125;
            const bounds = '' + bottomLongitude + ',' + bottomLatitude + ',' + topLongitude + ',' + topLatitude;
            replaceFilterCoordinates(bounds);
          }
          replaceAppUser(res);
        }
      }).catch((e) => {
        console.error('error', e);
      }).finally(() => {
        setLoading(false);
      });
  }, [replaceAppUser, replaceFilterCoordinates, saveUserInformation]);

  return {
    loading
  };
};

export default useLogin;
