export const createNoteWithElem = (note: any, createNote: Function) => {

  const contentTitle:any = document.getElementById('color-text');
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
