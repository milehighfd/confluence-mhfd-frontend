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

export const getStatus = (value: any) => {
  let percentStatus = '';
  switch(value) {
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
  //console.log('status', value + ' ' + percentStatus);
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