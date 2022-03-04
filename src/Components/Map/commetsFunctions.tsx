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
      console.log("Circlex", listx);
      console.log("DIVCcC", divcolorsx);
    }  
  })
}

export const clickingOptions = (listOfElements: any) => {

  listOfElements.forEach((el:any, index:any) => {
    const optionsx = document.getElementById(`options${index}`);
    const divoptionsx = document.createElement('div');
    divoptionsx.style.display = 'none';
    divoptionsx.classList.add('divoptions');
    divoptionsx.setAttribute('id',`divoptions${index}`);
    let innerOptions = `
      <li id="editopt${index}">
        Edit
      </li>
      <li id="deleteopt${index}">
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
        }
        console.log("LISISIS", optx);
        console.log("DICCC", divoptionsx);
      })
    }

  });

}