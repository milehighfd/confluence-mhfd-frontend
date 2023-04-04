import React from 'react';
export const clickingColorElement = (listOfElements: any, currentElement: any) => {
  listOfElements.forEach((_el:any, _index: any) => { 
    changeContentTitleClick(_el,_index, listOfElements);
  });
}
export const changeContentTitleClick = (_el: any, _index: any, listOfElements: any) => {
  const colorElem = document.getElementById(`color${_index}`);  
    if(colorElem != null) {
      colorElem.addEventListener('click', (e:any) => {
        const colorable = document.getElementById('colorable');
        if(colorable != null) {
          colorable.style.color = _el.color
        }
        const contentTitle:any = document.getElementById('color-text');
        if(contentTitle != null) {
          contentTitle.textContent = _el.label;
          contentTitle.setAttribute('current_id', _el.color_id);
        }
        listOfElements.forEach((elem:any, index_:any) => {
          const inputCheck = document.getElementById(`input${index_}`);
          if(inputCheck != null) {
            inputCheck.classList.remove('underlined');
          }   
          const circleCheck = document.getElementById(`circle${index_}`);
          if(circleCheck != null) {
            circleCheck.classList.remove('selected');
          }
        });
        const indexElem = listOfElements.findIndex((elem:any) => elem.color_id == _el.color_id );
        const inputCheck = document.getElementById(`input${indexElem}`);
        if(inputCheck != null) {
          inputCheck.classList.add('underlined');
        }  
        const circleCheck = document.getElementById(`circle${indexElem}`);
          if(circleCheck != null) {
            circleCheck.classList.add('selected');
          }    
      });
    }
}
export const changeContentTitle = (_el:any, _index:any, listOfElements: any) => {  
  const colorable = document.getElementById('colorable');
  if(colorable != null) {
    colorable.style.color = _el.color
  }
  const contentTitle:any = document.getElementById('color-text');
  if(contentTitle != null) {
    contentTitle.textContent = _el.label;
    contentTitle.setAttribute('current_id', _el.color_id);
  }
  listOfElements.forEach((elem:any, index_:any) => {
    const inputCheck = document.getElementById(`input${index_}`);
    if(inputCheck != null) {
      inputCheck.classList.remove('underlined');
    }
    const circleCheck = document.getElementById(`circle${index_}`);
    if(circleCheck != null) {
      circleCheck.classList.remove('selected');
    }   
  });
  const indexElem = listOfElements.findIndex((elem:any) => elem.color_id == _el.color_id );
  const inputCheck = document.getElementById(`input${indexElem}`);
  if(inputCheck != null) {
    inputCheck.classList.add('underlined');
  }      
  const circleCheck = document.getElementById(`circle${indexElem}`);
  if(circleCheck != null) {
    circleCheck.classList.add('selected');
  } 
}
export const clickingCircleColor = (listOfElements:any, updateColorList: Function, noteClicked?: any, openMarkerOfNote?: any, changeContentWithListUpdates?: any) => {  
  listOfElements.forEach((_el:any, index: any) => {   
    const circlex = document.getElementById(`circle${index}`);
    const divcolorsx = document.createElement('div');
          divcolorsx.style.display = 'none';
          divcolorsx.classList.add('divcolors');
          if(index == listOfElements.length - 1 && index >= 1) {
            divcolorsx.classList.add('divcolors-last');
          }
          divcolorsx.setAttribute('id',`divcolor${index}`);

    const listCircles = [
      {
        label: 'A',
        color: "#FFE120"
      },
      {
        label: 'B',
        color: "#E45360"
      },
      {
        label: 'C',
        color: "#282363"
      },
      {
        label: 'D',
        color: "#6FC699"
      },
      {
        label: 'E',
        color: "#66D4FF"
      },
    ];
    let innerColors = ``;    
    listCircles.forEach((el:any, _index:any) => {
      innerColors += `
      <li id="selectablecolor${el.label}${index}" value="${el.color}">
        <img id="circle${el.label}" class="img-circle ${el.color === _el.color ? 'selected':''}" style="background:${el.color}" />
      </li>`
    });
    divcolorsx.innerHTML = innerColors;
    if(circlex != null) {
      circlex.addEventListener('click', (e: any) => {
        e.stopPropagation();
        listOfElements.forEach((el:any, index_: any)=> {
          let divcolortohide = document.getElementById(`divcolor${index_}`);
          if(divcolortohide && index_ != index){
            divcolortohide.style.display = 'none';
          }
        }); 
        if(divcolorsx.style.display == 'none'){
          divcolorsx.style.display = 'flex';
        } else {
          divcolorsx.style.display = 'none';
        }
        
      }); 
      let listx = document.getElementById(`color${index}`);
      if(listx != null) {
        listx.appendChild(divcolorsx);
        listCircles.forEach((el:any) => {
          const colorsx:any = document.getElementById(`selectablecolor${el.label}${index}`);
          if(colorsx != null) {
            colorsx.addEventListener('click', (e:any) => {
              e.stopPropagation();
              const colorValue = colorsx.getAttribute('value');
              if(colorValue){
                updateColorList({..._el, color: colorValue});
                let timeCheck = noteClicked? 2500:0;
                let draftText = '';
                const textarea = (document.getElementById('textarea') as HTMLInputElement);
                  if (textarea != null) {
                      draftText = textarea.value;
                  }
                setTimeout(()=>{
                  if(noteClicked) {
                    let cctData = [
                      {..._el, color: colorValue},index, changeContentTitle
                    ]
                    openMarkerOfNote(noteClicked, draftText, cctData);
                    
                  } else {
                    setTimeout(()=>{
                      let cctData = [
                        {..._el, color: colorValue},index, changeContentTitle
                      ]
                      changeContentWithListUpdates(cctData);
                    },1500);
                    
                  }
                
                },timeCheck);
                
              }
              listCircles.forEach((crcl:any) => {
                const imgColor:any = document.getElementById(`circle${crcl.label}`);
                if(imgColor != null) {
                  imgColor.classList.remove('selected');
                }
              });
              const imgColor:any = document.getElementById(`circle${el.label}`);
              if(imgColor != null) {
                imgColor.classList.add('selected');
              }
              
            })
          }
        });
      }
    }  
  })
}

export const clickingUnFocusInput = (listOfElements: any, updateColorList: Function, noteClicked?: any, openMarkerOfNote?: any, changeContentWithListUpdates?:any) => {
  listOfElements.forEach((el:any, index:any) => {
    const inputX:any = document.getElementById(`input${index}`);
    if(inputX != null) {
      inputX.addEventListener('click', (e:any) => {
        if(!inputX.readOnly) {
          e.stopPropagation();
        }
      });
      inputX.addEventListener('keyup',(e:any)=>{
        if(!inputX.readOnly && e.keyCode == 32) {
          e.stopPropagation();
          e.preventDefault();
        }
        if(!inputX.readOnly && e.keyCode == 13) {
          e.stopPropagation();
          const newValue = inputX.value;
            updateColorList({...el, label: newValue});
            let timeCheck = noteClicked? 2200:0;
            let draftText = '';
            const textarea = (document.getElementById('textarea') as HTMLInputElement);
              if (textarea != null) {
                  draftText = textarea.value;
              }
            setTimeout(()=>{
              if(noteClicked) {
                let cctData = [
                  {...el, label: newValue},index, changeContentTitle
                ]
                openMarkerOfNote(noteClicked, draftText, cctData);
                
              } else {
                setTimeout(()=>{
                  let cctData = [
                    {...el, label: newValue},index, changeContentTitle
                  ];
                  changeContentWithListUpdates(cctData);
                },1500);
                
              }
              setTimeout(()=>{
                inputX.readOnly = true;
                // inputX.blur();
              },200);
            },timeCheck);
          
        }
      })
    }
  })
}

const removeEditOptAll = (listofelements: any) => {
  listofelements.forEach((element: any, index: any) => {
    const inputElem: any = document.getElementById(`input${index}`);
    if(inputElem != null){
      inputElem.readOnly = true;
    }  
    
    const saveOpt: any = document.getElementById(`saveopt${index}`);
    if(saveOpt != null){
      saveOpt.style.display = 'none';
    }
    const editButton = document.getElementById(`editopt${index}`);
    if(editButton != null){
      editButton.style.removeProperty('display');
    }
    const liElem: any = document.getElementById(`color${index}`);
    if(liElem != null) {
      liElem.classList.remove('editinglist');
    }
  });
}
export const clickingOptions = (listOfElements: any, deleteColorList: Function, noteClicked?: any, updateColorList?: Function, openMarkerOfNote?: any, changeContentWithListUpdates?:any) => {
  listOfElements.forEach((el:any, index:any) => {
    const optionsx = document.getElementById(`options${index}`);
    const divoptionsx = document.createElement('div');
    divoptionsx.style.display = 'none';
    divoptionsx.classList.add('divoptions');
    if(index == listOfElements.length - 1 && index >= 1) {
      divoptionsx.classList.add('divoptions-last');
    }
    divoptionsx.setAttribute('id',`divoptions${index}`);
    let innerOptions = `
      <li id="deleteopt${index}" value="${el._id}">
        <span ><img src="/Icons/icon-16.svg" alt="" width="10px" style="margin-top: -3px; margin-right: 5px;" /> Delete</span>
      </li>
    `;
    divoptionsx.innerHTML = innerOptions;
    if(optionsx != null) {
      optionsx.addEventListener('click', (e:any)=> {
        e.stopPropagation();
        listOfElements.forEach((el:any, index_:any) => {
          let divoptionstohide = document.getElementById(`divoptions${index_}`);
          if(divoptionstohide && index_ != index){
            divoptionstohide.style.display = 'none';
          }
        });
        if(divoptionsx.style.display == 'none'){
          divoptionsx.style.display = 'block';
        } else {
          divoptionsx.style.display = 'none';
        }
        let optx = document.getElementById(`color${index}`);
        if(optx != null) {
          optx.appendChild(divoptionsx);
          const deleteButton = document.getElementById(`deleteopt${index}`);
          // TO DO: Change Delete function to soft-delete 
          if(deleteButton != null){
            deleteButton.addEventListener('click', (e:any) => {
              e.stopPropagation();
              deleteColorList(el.color_id);
              let timeCheck = noteClicked? 2400:0;
              let draftText = '';
              const textarea = (document.getElementById('textarea') as HTMLInputElement);
                if (textarea != null) {
                    draftText = textarea.value;
                }
              setTimeout(()=>{
                if(noteClicked) {
                  openMarkerOfNote(noteClicked, draftText); 
                }
              },timeCheck);
            })
          }
      
        }
      })
    }
   
    const editButton = document.getElementById(`editopt${index}`);
    if(editButton != null){
      editButton.addEventListener('click', (e:any) => {
        e.stopPropagation();
        removeEditOptAll(listOfElements);
        const inputElem: any = document.getElementById(`input${index}`);
        if(inputElem != null){
          inputElem.readOnly = false;
          inputElem.focus();
          divoptionsx.style.display = 'none';
        }
        const liElem: any = document.getElementById(`color${index}`);
        if(liElem != null) {
          liElem.classList.add('editinglist');
        }
        editButton.style.display = 'none';
        const saveOpt: any = document.getElementById(`saveopt${index}`);
        if(saveOpt != null){
          saveOpt.style.display = 'unset';
          saveOpt.addEventListener('click', (e:any) => {
            e.stopPropagation();
            const inputX:any = document.getElementById(`input${index}`);
            const newValue = inputX.value;
            if(updateColorList){
              updateColorList({...el, label: newValue});
            }
            let timeCheck = noteClicked? 2400:400;
            let draftText = '';
            const textarea = (document.getElementById('textarea') as HTMLInputElement);
              if (textarea != null) {
                  draftText = textarea.value;
              }
            setTimeout(()=>{
              if(noteClicked) {
                let cctData = [
                  {...el, label: newValue},index, changeContentTitle
                ]
                openMarkerOfNote(noteClicked, draftText, cctData);
                
              } else {
                setTimeout(()=>{
                  let cctData = [
                    {...el, label: newValue},index, changeContentTitle
                  ]
                  changeContentWithListUpdates(cctData);
                },1500);
                
              }
              setTimeout(()=>{
                inputX.readOnly = true;
                editButton.style.removeProperty('display');
              },200);
            },timeCheck);

          })
        }
      });
    } 
  });

}
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
export const clickingAddLabelButton = (createColorList: Function, noteClicked?: any, openMarkerOfNote?: any, changeContentWithListUpdates?:any) => {
  const idButton = "addLabelButton-btn";
  const buttonAdd = document.getElementById(idButton);
  if(buttonAdd != null) {
    buttonAdd.addEventListener('click', (e:any) => {
      e.stopPropagation();
      createColorList();
      let timeCheck = 2000;
      let draftText = '';
      const textarea = (document.getElementById('textarea') as HTMLInputElement);
        if (textarea != null) {
            draftText = textarea.value;
        }
      setTimeout(()=>{
        if(noteClicked) {
          openMarkerOfNote(noteClicked, draftText);
        }
        counterWaiter = 0;
        setTimeout(() => {
          wait('toeditinput', (doc: any) => {
            if(doc != null){
              doc.readOnly = false;
              doc.focus();
              doc.select();
              setTimeout(()=>{
                doc.setSelectionRange(15,15);
              },20);
            }
          })
        }, 2000);
      },timeCheck);
    })
  }
}
export const rotateIcon = (direction: string) => {
  const iconDown = document.getElementById('icon-downlined');
  if(iconDown != null) { 
    if(direction == 'up') {
      iconDown.style.transform = 'rotate(180deg) translate(0px,2px)';
    } else { 
        iconDown.style.transform = 'rotate(0deg) translate(0px,0px)';
    }
  }
} 

export const divListOfelements = (listOfElements: any, changeValueOfElement: any) => {
  return  <div id='list-popup-comment'>
    <div className="listofelements" id="currentItemsinList">
            {listOfElements.map((el:any, index:any)=> 
              el && 
              <li key={index+"List"} id={index+"List"} value={el.isLatest} onClick={()=>changeValueOfElement(el.color_id)}>
                <img id={index+"circles"} className={"img-circle " + (el?.selected ? 'selected':'')} style={{background:el.color}}/> 
                <input id={`input${index}`} className="inputlabel" value={el.label} readOnly={true}  />
              </li>
            ) } 
    </div>
  </div>;
}

export const divDelete = () => {
  return <div className='divoptions'>
    <li id="deleteopt0" value={0}>
      <span ><img src="/Icons/icon-16.svg" alt="" width="10px" style={{marginTop: '-3px', marginRight: '5px'}} /> Delete</span>
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
      color: "#FFE120"
    },
    {
      label: 'B',
      color: "#E45360"
    },
    {
      label: 'C',
      color: "#282363"
    },
    {
      label: 'D',
      color: "#6FC699"
    },
    {
      label: 'E',
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
      listCircles.map((color) => <li value={color.color} onClick={() => handleClick(color)}>
        <img id={`circle${color.label}`} className='img-circle' style={{background:color.color}} />
      </li>)
    }
  </div>
}

