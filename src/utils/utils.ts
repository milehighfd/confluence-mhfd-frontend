export const firstLetterUppercase = (text : string) => {
  if (text) {
    const formatedText = text[0].toUpperCase() + text.slice(1);
    return formatedText;
  }
  return '';
}

export const spacingCamelCase = (text : string) => {
  if (text) {
    const spacedText = text.replace(/([A-Z])/g, ' $1').trim();
    const formatedText = firstLetterUppercase(spacedText);
    return formatedText;
  }
  return '';
}

export const numberWithCommas = (x: number) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

export const secondWordOfCamelCase = (text : string) => {
  const spacedText = text.replace(/([A-Z])/g, ' $1').trim();
  const formatedText = spacedText.split(/\s+/).slice(1,2);
  return formatedText[0];
}