import React from 'react';
import {  string, objectOf, any } from 'prop-types';
import Folder from './Folder';
import CollapsibleFolder from './CollapsibleFolder';
import { connect } from 'react-redux';
import * as folderSelectionModule from '../../redux/modules/folderSelectionDialog';

@connect(
  (state) => ({
    subFolderList: folderSelectionModule.subFolderList(state)
  }),
)


export default class FolderList extends React.Component {
  static propTypes = {
    listId: string,
    subFolderList: objectOf(any)
  };

  render() {
    const {subFolderList, listId} = this.props;
    let list  = subFolderList[listId];

    if(!list){
      return <div/>;
    }

    return (list).map((folder) => {
      let key  =  folder.treeObjectId;

      if (folder.childFolders && folder.childFolders.count > 0){
        return <CollapsibleFolder key={key} folder={folder}  />;
      } else {
        return <Folder  key={key} folder={folder}/>;
      }
    });
  }
}


  

  
