export const createNoteWithElem = (note: any, createNote: Function) => {

  const contentTitle:any = document.getElementById('color-text');
  console.log('content title', contentTitle);
  if(contentTitle != null) {
    const comment_id = contentTitle.getAttribute('current_id');
    if(comment_id && comment_id !== 'undefined') {
      note.color_id = comment_id;
    }
  }
  createNote(note);
}

export const editNoteWithElem = (note: any, editNote: Function) => {
  
  const contentTitle:any = document.getElementById('color-text');
  if(contentTitle != null) {
    const comment_id = contentTitle.getAttribute('current_id');
    if(comment_id) {
      note.color_id = comment_id;
    }
  }
  editNote(note);
}

export const clickoutsideList = (listOfElements: any, rotateIcon: Function) => {
  const ignoreElementClick = document.getElementById('id-list-popup');
  const div = document.getElementById('color-list');
  if(ignoreElementClick != null && div != null){ 
    document.addEventListener('click', (event: any) => {
      const isClickInsideElement = ignoreElementClick.contains(event.target);
      const isClickingInsideParentElem = div.contains(event.target);  
      if (!isClickInsideElement) {
          if (!isClickingInsideParentElem && ignoreElementClick.style.display != 'none') {
            ignoreElementClick.style.display = 'none';
            rotateIcon('down');
          }
          
      }
    });
  }
  listOfElements.forEach((el:any, index_:any) => { 
    let divoptionstohide = document.getElementById(`divoptions${index_}`);
    if(divoptionstohide != null){
      divoptionstohide.style.display = 'none';
    }
    let divcolorstohide = document.getElementById(`divcolor${index_}`);
    if(divcolorstohide != null){
      divcolorstohide.style.display = 'none';
    }
    
    const inputElem: any = document.getElementById(`input${index_}`);
    if(inputElem != null){
      inputElem.readOnly = true;
    }  
    
    const saveOpt: any = document.getElementById(`saveopt${index_}`);
    if(saveOpt != null){
      saveOpt.style.display = 'none';
    }
    const editButton = document.getElementById(`editopt${index_}`);
    if(editButton != null){
      editButton.style.removeProperty('display');
    }
    const liElem: any = document.getElementById(`color${index_}`);
    if(liElem != null) {
      liElem.classList.remove('editinglist');
    }
  });
}

export  const addListonPopupNotes = (
  e: any,
  listOfElements: any,
  colors:any,
  colorsCodes: any,
  createNote: any,
  rotateIcon: Function, 
  addListToPopupNotes: Function,
  popup: any,
  canAdd: any, // watch out is value not reference  
  setSwSave: Function,
  marker: any,
  markerNote: any
) => {
  const div = document.getElementById('color-list');
            if (div != null) {
              const checker = Array.from(document.getElementsByClassName('list-popup-comment'));
              checker.forEach((check:any) => {
                check.remove();
              });
                const ul = document.createElement('div');
                ul.style.display = 'none';
                ul.classList.add("list-popup-comment");
                ul.classList.add("legend");
                ul.setAttribute('id','id-list-popup');
                div.addEventListener('click', () => {
                    if (ul.style.display === 'none') {
                        ul.style.display = 'block';
                        rotateIcon('up');
                        clickoutsideList(listOfElements, rotateIcon);
                    } else {
                        ul.style.display = 'none';
                        rotateIcon('down');
                    }
                });
                addListToPopupNotes(ul, div)
                // div.appendChild(ul);
                const colorable = document.getElementById('colorable');
                const red = document.getElementById('red');
              if (red != null) {
                  red.addEventListener('click', () => {
                      if (colorable != null) {
                          colorable.style.color = colors.RED;
                      }
                  });
              }
              const orange = document.getElementById('orange');
              if (orange != null) {
                  orange.addEventListener('click', () => {
                      if (colorable != null) {
                          colorable.style.color = colors.ORANGE;
                      }
                  });
              }
              const grey = document.getElementById('grey');
              if (grey != null) {
                  grey.addEventListener('click', () => {
                      if (colorable != null) {
                          colorable.style.color = colors.GREY;
                      }
                  });
              }
              const yellow = document.getElementById('yellow');
              if (yellow != null) {
                  yellow.addEventListener('click', () => {
                      if (colorable != null) {
                          colorable.style.color = colors.YELLOW;
                      }
                  });
              }
              const save = document.getElementById('save-comment');
              if (save != null) {
                  save.addEventListener('click', () => {
                    setSwSave(false);
                      const textarea = (document.getElementById('textarea') as HTMLInputElement);
                      if (textarea != null) {
                          let color = '';
                          if (colorable != null) {
                              if (colorable.style.color === colorsCodes.RED) {
                                  color = 'red';
                              } else if (colorable.style.color === colorsCodes.ORANGE) {
                                  color = 'orange';
                              } else if (colorable.style.color === colorsCodes.GREY) {
                                  color = 'grey';
                              } else {
                                  color = 'yellow';
                              }
                          }
                          let note: any = {
                              color: color,
                              note_text: textarea.value,
                              latitude: e.lngLat.lat,
                              longitude: e.lngLat.lng
                          };
                          createNoteWithElem(note, createNote);
                          popup.remove();
                          canAdd.value = false;
                          marker.remove();
                          markerNote.remove();
                      }
                    });
                }
                const edit = document.getElementById('edit-comment');
                  if (edit != null) {
                      edit.addEventListener('click', () => {
                        setSwSave(false);
                      });
                  }
                const del = document.getElementById('delete-comment');
                if (del != null) {
                  del.addEventListener('click', () => {
                    setSwSave(false);
                    markerNote.remove();
                    canAdd = false;
                  });
                }
            }
}

export const openMarkerOfNoteWithoutAdd = (
  note:any,
  markersNotes: any,
  eventsOnClickNotes: Function
) => {
  markersNotes.forEach((marker:any) => {
    let popupC = marker.marker.getPopup();
    popupC.remove();
  });
  const noteid = note.id ? note.id : note.newnotes_id; 
  const filterMarker: any = markersNotes.filter((marker:any) => marker.note.newnotes_id == noteid  );
  if(filterMarker.length > 0) {
    filterMarker[0].marker.togglePopup();
    setTimeout(()=>{
      eventsOnClickNotes(filterMarker[0].note);
    },300);
  }
}
