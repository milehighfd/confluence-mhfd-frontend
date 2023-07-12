import React from 'react';


let counterWaiter = 0;
const wait = (idDoc:any, cb: any) => {  
  const doc = document.getElementsByClassName(idDoc)[0];
  counterWaiter++;
  if(counterWaiter > 200) {
    return;
  }
  if (doc != null) {
    cb(doc);
  } else {
    setTimeout(()=>{
      wait(idDoc, cb);
    },200)
  }
};

export const divDelete = (handleDelete: any) => {
  return <div className='divoptions'>
    <li id="deleteopt0 delete-comment-safe" value={0} onClick={handleDelete}>
      <span ><img src="/Icons/icon-16.svg" alt="" width="10px" /> Delete</span>
    </li>
  </div>
}
export const divListOfColors = (handleClick: any) => {

  // const circlex = document.getElementById(`circle${index}`);
  // const divcolorsx = document.createElement('div');
  //       divcolorsx.style.display = 'none';
  //       divcolorsx.classList.add('divcolors');
  //       if(index == listOfElements.length - 1 && index >= 1) {
  //         divcolorsx.classList.add('divcolors-last');
  //       }
  //       divcolorsx.setAttribute('id',`divcolor${index}`);

  const listCircles = [
    {
      label: 'A',
      labelDB: 'red2',
      color: "#FFDD00"
    },
    {
      label: 'B',
      labelDB: 'red',
      color: "#FF5A5F"
    },
    {
      label: 'C',
      labelDB: 'blue',
      color: "#251863"
    },
    {
      label: 'D',
      labelDB: 'green',
      color: "#29C499"
    },
    {
      label: 'E',
      labelDB: 'sky',
      color: "#66D4FF"
    },
  ];
  // let innerColors = ``;    
  // listCircles.forEach((el:any, _index:any) => {
  //   innerColors += `
  // });
  // divcolorsx.innerHTML = innerColors;

  return <div className='divcolors'>
    {
      listCircles.map((color) => <li value={color.color} onClick={() => handleClick(color)} key={color.labelDB}>
        <img id={`circle${color.label}`} className='img-circle' style={{background:color.color}} alt=''/>
      </li>)
    }
  </div>
}

