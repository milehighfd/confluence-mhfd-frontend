export const firstLetterUppercase = (text: string) => {
  if (text) {
    const formatedText = text[0].toUpperCase() + text.slice(1);
    return formatedText;
  }
  return '';
}

export const spacingCamelCase = (text: string) => {
  if (text) {
    const spacedText = text.replace(/([A-Z])/g, ' $1').trim();
    const formatedText = firstLetterUppercase(spacedText);
    return formatedText;
  }
  return '';
}
export const capitalLetter = (chain: string) => {
  return chain.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}

export const numberWithCommas = (x: number) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

export const capitalizeWords = (text: string) => {
  return text
    .toLowerCase()
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
}

export const getStatus = (value: any) => {
  let percentStatus = '';
  switch (value) {
    case '0':
      percentStatus = '0% - 25%';
      break;
    case '25':
      percentStatus = '25% - 50%';
      break;
    case '50':
      percentStatus = '50% - 75%';
      break;
    case '75':
      percentStatus = '75% - 100%';
      break;
  }
  return percentStatus;
}

export const secondWordOfCamelCase = (text: string) => {
  const spacedText = text.replace(/([A-Z])/g, ' $1').trim();
  const formatedText = spacedText.split(/\s+/).slice(1, 2);
  return formatedText[0];
}

export const elementCost = (min: number, max: number) => {
  let value = '';
  if (min >= 1000000) {
    value = '$' + Math.trunc(min / 100000) / 10 + 'M - ';
  } else {
    if (min >= 1000) {
      value = '$' + Math.trunc(min / 100) / 10 + 'K - ';
    } else {
      value = '$' + min + ' - ';
    }
  }
  if (max >= 1000000) {
    value = value + '$' + Math.trunc(max / 100000) / 10 + 'M';
  } else {
    if (max >= 1000) {
      value = value + '$' + Math.trunc(max / 100) / 10 + 'K';
    } else {
      value = value + '$' + max;
    }
  }
  return value;
}

export const elementCostLastPosition = (min: number, max: number, lastPosition: boolean) => {
  let value = '';
  if (lastPosition) {
    if (min >= 1000000) {
      value = '>$' + Math.trunc(min / 100000) / 10 + 'M';
    } else {
      if (min >= 1000) {
        value = '>$' + Math.trunc(min / 100) / 10 + 'K';
      } else {
        value = '$' + min
      }
    }
  } else {
    if (min >= 1000000) {
      value = '$' + Math.trunc(min / 100000) / 10 + 'M - ';
    } else {
      if (min >= 1000) {
        value = '$' + Math.trunc(min / 100) / 10 + 'K - ';
      } else {
        value = '$' + min + ' - ';
      }
    }
    if (max >= 1000000) {
      value = value + '$' + Math.trunc(max / 100000) / 10 + 'M';
    } else {
      if (max >= 1000) {
        value = value + '$' + Math.trunc(max / 100) / 10 + 'K';
      } else {
        value = value + '$' + max;
      }
    }
  }

  return value;
}

export const getUserBrowser = () => {
  let browser;
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    browser = 'Opera'
  }
  else if (navigator.userAgent.indexOf("Edg") != -1) {
    browser = 'Edge'
  }
  else if (navigator.userAgent.indexOf("Chrome") != -1) {
    browser = 'Chrome'
  }
  else if (navigator.userAgent.indexOf("Safari") != -1) {
    browser = 'Safari'
  }
  else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browser = 'Firefox'
  }
  else {
    browser = 'unknown'
  }
  return browser;
};


export const formatPhoneNumber = (value:any) => {
  if(!value) return value;
  const phoneNumber = value.replace(/[^\d]/g,'');
  const phoneNumberLength = phoneNumber.length;
  if(phoneNumberLength < 4) return phoneNumber
  if(phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0 , 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6 , 10)}`;
};

export const onRender = (id: any, phase: any, actualDuration: any, baseDuration: any, startTime: any, commitTime: any) => {
  console.log('id', id);
  console.log('phase', phase);
  console.log('actualDuration', actualDuration);
  console.log('baseDuration', baseDuration);
  console.log('startTime', startTime);
  console.log('commitTime', commitTime);
};

export const deletefirstnumbersmhfdcode = (value: any) => {
  const arrayValues = value.stream.stream.mhfd_code_stream.split('.');
  arrayValues.shift();
  return arrayValues.join('.');
}
export const getAlertNameAndIcon = (menu: any, popup: any) => {
  const alert_type = popup.station_type ?? '';
  let newMenuLabel = menu;
  let alertIconLocation;
  switch (alert_type) {
    case 'Precipitation':
      newMenuLabel = 'Alert Station - Precip';
      alertIconLocation = 'Icons/layer-alert-station-precip.png ';
      break;
    case 'Precipitation, Stage':
      newMenuLabel = 'Alert Station - Precip Stage';
      alertIconLocation = 'Icons/layer-alert-station-precip-stage.png ';
      break;
    case 'Stage':
      newMenuLabel = 'Alert Station - Stage';
      alertIconLocation = 'Icons/layer-alert-station-stage.png ';
      break;
    case 'Weather':
      newMenuLabel = 'Alert Station - Weather';
      alertIconLocation = 'Icons/layer-alert-station-weather.png ';
      break;
    case 'Weather, Stage':
      newMenuLabel = 'Alert Station - Weather Stage'; 
      alertIconLocation = 'Icons/layer-alert-station-weather-stage.png ';
      break;
    default:
      alertIconLocation = '';
      break;
  }
  return {newMenuLabel, alertIconLocation};
};