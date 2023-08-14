const colorsCodes = {
  YELLOW: 'rgb(255, 221, 0)', 
  RED: 'rgb(255, 90, 95)',
  BLUE: 'rgb(37, 24, 99)',
  GREEN: 'rgb(41, 196, 153)',
  SKY:  'rgb(102, 212, 255)',
}

export const createNoteWithElem = (note: any, createNote: Function, openNotification: Function) => {

  const contentTitle:any = document.getElementById('color-text');
  if(contentTitle != null) {
    const comment_id = contentTitle.getAttribute('current_id');
    if(comment_id && comment_id !== 'undefined') {
      note.color_id = comment_id;
    }
  }
  createNote(note, openNotification);
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

export const openMarkerOfNoteWithoutAdd = (
  note:any,
  markersNotes: any,
  // eventsOnClickNotes: Function
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
      // eventsOnClickNotes(filterMarker[0].note);
    },300);
  }
}

export const handleColor = (availableColors: any) => {
  let color = '';
  const colorable = document.getElementById('colorable');
  if (colorable != null) {
    if (colorable.style.color === colorsCodes.RED) {
        color = 'red';
    } else if (colorable.style.color === colorsCodes.BLUE) {
        color = 'blue';
    } else if (colorable.style.color === colorsCodes.GREEN) {
        color = 'green';
    } else if (colorable.style.color === colorsCodes.SKY) {
        color = 'sky';
    }
      else {
        color = 'red2';
    }
  }
  const currentColor = availableColors.find((element: any) => element.label === color);
  return currentColor ? currentColor.color_id : null;
}