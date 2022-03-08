export const clickingCircleColor = (listOfElements:any) => {
  listOfElements.forEach((el:any, index: any) => {
    const circlex = document.getElementById(`circle${index}`);
    const divcolorsx = document.createElement('div');
          divcolorsx.style.display = 'none';
          divcolorsx.classList.add('divcolors');
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
    listCircles.forEach((el:any, index:any) => {
      innerColors += `
      <li id="selectablecolor${el.label}">
        <img id="circle${el.label}" class="img-circle" style="background:${el.color}" />
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
      }
      // console.log("Circlex", listx);
      // console.log("DIVCcC", divcolorsx);
    }  
  })
}

export const clickingUnFocusInput = (listOfElements: any, updateColorList: Function) => {
  listOfElements.forEach((el:any, index:any) => {
    const inputX:any = document.getElementById(`input${index}`);
    if(inputX != null) {
      inputX.addEventListener('focusout', (e:any) => {
        const newValue = inputX.value;
        updateColorList({...el, label: newValue});
      });
      inputX.addEventListener('click', (e:any) => {
        console.log("INPUTX", inputX.readOnly);
        if(!inputX.readOnly) {
          e.stopPropagation();
        }
      })
    }
  })
}

export const clickingOptions = (listOfElements: any, deleteColorList: Function) => {

  listOfElements.forEach((el:any, index:any) => {
    const optionsx = document.getElementById(`options${index}`);
    const divoptionsx = document.createElement('div');
    divoptionsx.style.display = 'none';
    divoptionsx.classList.add('divoptions');
    divoptionsx.setAttribute('id',`divoptions${index}`);
    let innerOptions = `
      <li id="editopt${index}" value="${el._id}">
        Edit
      </li>
      <li id="deleteopt${index}" value="${el._id}">
        Delete
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
          const editButton = document.getElementById(`editopt${index}`);
          const deleteButton = document.getElementById(`deleteopt${index}`);
          console.log("EDIT BUTTON", editButton, "EDLEETE BUTTON", deleteButton);
          if(editButton != null){
            editButton.addEventListener('click', (e:any) => {
              e.stopPropagation();
              const inputElem: any = document.getElementById(`input${index}`);
              if(inputElem != null){
                inputElem.readOnly = false;
                inputElem.focus();
                divoptionsx.style.display = 'none';
              }
            });
          } 
          if(deleteButton != null){
            deleteButton.addEventListener('click', (e:any) => {
              e.stopPropagation();
              deleteColorList(el._id);
            })
          }
      
        }
        // console.log("LISISIS", optx);
        // console.log("DICCC", divoptionsx);
      })
    }
   
  });

}

export const clickingAddLabelButton = (createColorList: Function) => {
  const idButton = "addLabelButton-btn";
  const buttonAdd = document.getElementById(idButton);
  if(buttonAdd != null) {
    buttonAdd.addEventListener('click', (e:any) => {
      e.stopPropagation();
      createColorList();
    })
  }
}
