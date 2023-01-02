export const getName = (id: string | number, arrayList: any, idField: string, nameField: string) => {
  console.log(id, arrayList, idField);
  console.log(arrayList.filter((element: any) => {
    return element[idField] === +id;
  }));
  return arrayList.filter((element: any) => {
    return element[idField] === +id;
  })[0][nameField] || 'None';
}