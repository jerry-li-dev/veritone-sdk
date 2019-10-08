/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { bool, func, shape, arrayOf, string } from "prop-types";
import _ from 'lodash';

import Folder from "./Folder";

export const getAllChildId = (item, foldersData) => {
  if (_.isNil(item)) {
    return []
  }
  if (_.isNil(item.childs) || _.isEmpty(item.childs)) {
    return [item.id]
  }
  else {
    return [item.id, ...item.childs.map(subitem =>
      getAllChildId(foldersData.byId[subitem], foldersData)
    )]
  }
}

export const getAllParentId = (item, folderDataFlatten) => {
  if (_.isNil(item) || _.isNil(item.parentId)) {
    return []
  }
  else {
    return [
      item.parentId,
      ...getAllParentId(folderDataFlatten.byId[item.parentId], folderDataFlatten)
    ]
  }
}

function FolderTree({
  selectable,
  inSearching,
  processingFolder,
  isEnableShowContent,
  foldersData,
  onChange,
  onExpand,
  selected,
  folderAction,
  onMenuClick
}) {
  const [opening, setopening] = useState([]);
  const handleOpenFolder = folderId => event => {
    event.stopPropagation();
    const newOpening = _.includes(opening, folderId) ? opening.filter(item => item !== folderId) : [...opening, folderId];
    setopening(newOpening);
    onExpand(folderId);
  }
  const onChangeSelectedFolder = folder => {
    if (!selectable) {
      onChange({
        [folder.id]: true
      })
    } else {
      const folderId = folder.id;
      const allChildId = _.flattenDeep(getAllChildId(folder, foldersData));
      const allParentId = _.flattenDeep(getAllParentId(folder, foldersData));
      const parentFolder = foldersData.byId[folder.parentId] || {};
      const childs = parentFolder.childs || [];

      if (selected[folderId]) {
        const childsRemove = allChildId.reduce((acum, currentValue) => {
          return {
            ...acum,
            [currentValue]: undefined
          }
        }, {});
        const parentRemove = allParentId.reduce((acum, currentValue) => {
          return {
            ...acum,
            [currentValue]: undefined
          }
        }, {});
        const selectedFolder = {
          ...selected,
          ...childsRemove,
          ...parentRemove,
          [folderId]: undefined
        }
        const newSelected = _.pickBy(selectedFolder, _.identity);
        onChange({ ...newSelected } || {});
      } else {
        const newSelected = allChildId.reduce((acum, currentValue) => {
          return {
            ...acum,
            [currentValue]: true
          }
        }, {});
        const selectedIds = Object.keys({ ...selected, ...newSelected });
        const diff = _.difference(childs, selectedIds);
        if (diff.length === 0 && childs.length !== 0) {
          return onChangeSelectedFolder(parentFolder);
        }
        onChange({ ...selected, ...newSelected } || {});
      }
    }
  }

  const dataForMapping = !inSearching ? foldersData.rootIds : foldersData.allId;
  return (
    <div>
      {dataForMapping.map(folderId => {
        const childs = foldersData.byId[folderId].childs || [];
        return (
          <Folder
            key={folderId}
            folderAction={folderAction}
            onMenuClick={onMenuClick}
            isRootFolder={!inSearching}
            selectable={selectable}
            selected={selected}
            isEnableShowingContent={isEnableShowContent}
            onChange={onChangeSelectedFolder}
            opening={opening}
            onExpand={handleOpenFolder}
            rootIds={foldersData.rootIds}
            folder={foldersData.byId[folderId]}
            childs={childs.map(childId =>
              foldersData.byId[childId] || {})}
            folders={foldersData}
            inSearching={inSearching}
            processingFolder={processingFolder}
          />
        );
      })}
    </div>
  )
}

FolderTree.propTypes = {
  selectable: bool,
  foldersData: shape(Object),
  selected: shape(Object),
  onChange: func,
  onExpand: func,
  folderAction: arrayOf(Object),
  onMenuClick: func,
  isEnableShowContent: bool,
  inSearching: bool,
  processingFolder: arrayOf(string)
};

export default FolderTree;
