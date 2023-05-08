import React, { useState, useEffect } from "react";
import { Drawer, Button, Menu, Dropdown } from 'antd';
import { useNoteDispatch, useNotesState } from "../../hook/notesHook";
import { useColorListDispatch, useColorListState } from "../../hook/colorListHook";
import { Tree } from '../Tree/Tree';
import { divListOfelements } from './../Map/commetsFunctions';

const SideBarComment = ({visible, setVisible, flyTo, openEditNote, addToMap, changeFilter, setSwSave}:
  {visible: boolean, setVisible: Function, flyTo: Function, openEditNote: Function, addToMap: Function, changeFilter: Function, setSwSave:Function }) => {
    
  const DEFAULT_COLOR = '#FFE121';
  const { notes, groups, availableColors, isnewnote } = useNotesState();
  const { colorsList } = useColorListState();
  const { deleteNote, getGroups, getNotes, createGroup, editNote, getAvailableColors, editGroup, setIsnewNote } = useNoteDispatch();
  const { setIdsFilter } = useColorListDispatch();
  const [tree, setTree] = useState([] as any);
  const [currentSelected, setCurrentSelected] = useState([] as any);

  const [counterFilters, setCounterFilters ]= useState(0);
  const countFilterColors = () => {
    const counterArray = currentSelected.filter((item:any)=>{
      return item.selected;
    }).length;
    setCounterFilters(counterArray);
  }
  useEffect(() => {
    if(isnewnote) {
      resetFilters();
      setIsnewNote(false);
    }
  }, [isnewnote]);
  useEffect(() => {
    getGroups();
    getNotes();
    getAvailableColors();
  }, []);
  useEffect(()=>{
    countFilterColors();
  },[currentSelected]);
  useEffect(()=>{
    setIdsFilter('');
    let auxColorList = [{
      color_id: null,
      label: 'Map Note',
      color: DEFAULT_COLOR,
      opacity: 1,
    },...colorsList];
    
    auxColorList = auxColorList.filter((color: any)=> {
      const findColor = availableColors.find((availableColor: any) => availableColor?.color_id === color?.color_id);
      return findColor;
    })
    auxColorList.forEach((color: any) => {
      const findColor = currentSelected?.find((selected: any) => selected?.color_id === color?.color_id);
      
      if (findColor) {
        color.selected = findColor.selected;
      } else {
        color.selected = false;
      }
      // if (value.color_id === color.color_id) {
      //   color.isLatest = true;
      // } else {
      //   color.isLatest = false;
      // }
    }); 
    setCurrentSelected(auxColorList);
  },[colorsList, availableColors]);

  useEffect(() => {    
    let newTree = groups?.map((group: any) => {
      return {
        id: group.groupnotes_id,
        data: group,
        label: group.group_notes_name,
        children: []
      } as any;
    });
    if (notes) {
      notes?.forEach((note: any) => {
        const index = newTree.findIndex((item: any) => item.id === note.groupnotes_id);
        if (index !== -1 && newTree[index].children) {
          newTree[index]?.children?.push({
            id: note.newnotes_id,
            label: note.note_text,
            data: note
          })
        } else {
          newTree?.push({
            id: note.newnotes_id,
            label: note.note_text,
            data: note
          });
        }
      });
    }
    
    newTree.sort((a: any, b: any) => {
      return a.data.position - b.data.position;
    });
    newTree.forEach((element: any) => {
      if (element.children) {
        element.children.sort((a: any, b: any) => {
          return a.data.position - b.data.position;
        });
      }
    });
    if(counterFilters > 0) {
      newTree = newTree.filter(((element: any) => element.children? element.children.length != 0 :true))
    }    
    setTree(newTree);
  }, [notes, groups]);

  useEffect(()=>{
    changeFilter('all');
  },[changeFilter]);
  const resetFilters = () => {
    const newValues = currentSelected.map((elem:any) => {
      elem.selected = false;
      return elem;
    });
    setCurrentSelected(newValues);
    setIdsFilter('');
    getNotes();
  }
  const changeValueOfElement = (_id:any) => {
    const newValues = currentSelected.map((elem:any) => {
      if(elem._id == _id) {
        elem.selected = !elem.selected;
      }
      return elem;
    });
    let idstoParse:any = [];
    newValues.forEach((el:any) => {
      if(el.selected) {
        idstoParse.push(el._id);
      }
    });
    setCurrentSelected(newValues);
    if (idstoParse.includes(null)) {
      idstoParse = idstoParse.filter((id:any) => id !== null);
      idstoParse.push('&hasNull=true');
    }
    setIdsFilter(idstoParse.toString());
    getNotes();
  }

  const swapPositions = (id:any, id2:any, isGroup: boolean, isGroup2: boolean) => {   
    const index = tree.findIndex((item:any) => item.id === +id && isGroup === !!item.children);
    const index2 = tree.findIndex((item:any) => item.id === +id2 && isGroup2 === !!item.children);
    if (index === -1 || index2 === -1) {
      return;
    }
    const newTree = [...tree];
    if (index2 + 1 < newTree.length) {
      newTree[index].data.position = ~~((newTree[index2 + 1].data.position + newTree[index2].data.position) / 2);
    } else {
      newTree[index].data.position = newTree[index2].data.position + 15000;
    }
    editGroup({...newTree[index].data});
    setTree([...newTree]);
  }

  const onSelectCreateOption = (key: any) => {
    if (key.key === 'create-folder') {
      createGroup('Untitled Folder');
      resetFilters();
    } else {
      addToMap();
      setSwSave(true);
    }
  }
  const items = [
    { label: 'New Folder', key: 'create-folder' },
    { label: 'New Map Note', key: 'create-note' },
  ];

  const createOptions = (
    <Menu onClick={onSelectCreateOption} items={items} />
  );

  const mapFunctions = {
    openEditNote: openEditNote,
    flyTo: flyTo,
    deleteNote: deleteNote,
  };

  const onDragAndDrop = (element: any, destination: any, below: any, isGroup: boolean, isGroup2: boolean) => {
    let selectedNote = tree.find((note: any) => note.id === +element && isGroup === !!note.children);
    if (!selectedNote) {
      tree.forEach((note: any) => {
        if (note.children) {
          const selectedChild = note.children.find((child: any) =>{
            return child.id === +element && isGroup === !!child.children;
          } )
          if (selectedChild) {
            selectedNote = selectedChild;
          }
        }
      });
    }
    if (!selectedNote) return;
    const newTree = tree.filter((item: any) => {
      if (item.children) {
        item.children = item.children.filter((child: any) => {
          return child.id !== element;
        });
      }
      return item.id !== element;
    });
    const newDestination = tree.find((note: any) => note.id === destination && isGroup2 === !!note.children);   
    const index = newTree.indexOf(newDestination);
    if (index !== -1) {
      const indexOfBelow = newTree[index].children.findIndex((note: any) => note.id === below);
      if (indexOfBelow !== -1) {
        if (indexOfBelow + 1 < newTree[index].children.length) {
          selectedNote.data['position'] = ~~((newTree[index].children[indexOfBelow].data['position'] 
          + newTree[index].children[indexOfBelow + 1].data['position']) / 2);
        } else {
          selectedNote.data['position'] = newTree[index].children[indexOfBelow].data['position'] + 15000;
        }
        newTree[index].children.splice(indexOfBelow + 1, 0, selectedNote);
      } else {
        let position = 0;
        for (const note of newTree[index].children) {
          position = Math.max(position, note.data['position']);
        }        
        selectedNote.data['position'] = position + 15000;
        newTree[index].children.push(selectedNote);
      }
    } else {
      const indexOfBelow = newTree.findIndex((note: any) => note.id === below);
      if (indexOfBelow !== -1) {
        if (indexOfBelow + 1 < newTree.length) {
          selectedNote.data['position'] = ~~((newTree[indexOfBelow].data['position'] + newTree[indexOfBelow + 1].data['position']) / 2);
        } else {
          selectedNote.data['position'] = newTree[indexOfBelow].data['position'] + 15000;
        }
        newTree.splice(indexOfBelow + 1, 0, selectedNote);
      } else {
        let position = 0;
        for (const note of newTree) {
          position = Math.max(position, note.data['position']);
        }
        selectedNote.data['position'] = position + 15000;
        newTree.push(selectedNote);
      }
    }   
    editNote({
      ...selectedNote.data,
      groupnotes_id: destination,
    });
  }

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
    <Drawer
      title={<div className="comment-title">
              <h5>MAP NOTES</h5>
              <Button onClick={onClose}>
                <span className="arrow-left"></span>
              </Button>
            </div>}
      placement="left"
      maskClosable={false}
      mask={false}
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="comment-drawer"
      style={{ marginLeft: '58px', width: '0px'}}
    >
      <h3>
      </h3>
      <div className="a-layers">
        <span className="title">Feature Layers</span>  
        <span className="filterCounter">{counterFilters > 0 ? "("+counterFilters+")": ''}</span>
        <Dropdown overlay={createOptions} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}><span className="op-plus">+</span></a>
        </Dropdown>
      </div>
      <Tree
        data={tree}
        onDragAndDrop={onDragAndDrop}  
        setTree={setTree}
        mapFunctions={mapFunctions}
        swapPositions={swapPositions}
      />            
      </Drawer>
  </>
  )

}

export default SideBarComment;
