import React, { useState } from "react";
import _isEmpty from 'lodash/isEmpty';

import styles from "./folder.module.scss";

const Folder = ({ explorerData, handleUpdateFolder }) => {
  console.log("explorerData: ", explorerData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleClick = (e, isFolder) => {
    e.stopPropagation();
    setIsExpanded(true);
    setShowInput({ visible: true, isFolder });
  };

  const handleDeleteClick = (e) => {
      console.log('explorerData?.id: ', explorerData?.id);
    e.stopPropagation();
    var result = window.confirm(`Do you want to delete ${explorerData.name}`);
    if (result) {
        handleUpdateFolder(explorerData?.id, explorerData?.name, showInput.isFolder, false);
    }
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateFolder(explorerData?.id, e.target.value, showInput.isFolder, true);
      setShowInput({
        visible: false,
        isFolder: null,
      });
    }
  };

  return (
    <div className={styles.container}>
      {explorerData?.isFolder ? (
        <div className={styles.folder}>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.folderName}
          >
            <span>📁 {explorerData?.name}</span>
            <button
              onClick={(e) => handleClick(e, true)}
              className={styles.button}
            >
              Folder +
            </button>
            <button
              onClick={(e) => handleClick(e, false)}
              className={styles.button}
            >
              File +
            </button>
            <button
              onClick={handleDeleteClick}
              className={styles.button}
            >
              Delete
            </button>
          </div>
          {isExpanded && (
            <div className={styles.innerFiles}>
              {showInput.visible && (
                <input
                  type="text"
                  autoFocus
                  className={styles.inputBox}
                  onBlur={() =>
                    setShowInput({ visible: false, isFolder: null })
                  }
                  onKeyDown={onAddFolder}
                />
              )}
              {explorerData?.items.map((item) => {
                return (
                  <Folder
                    explorerData={item}
                    key={item.id}
                    handleUpdateFolder={handleUpdateFolder}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.file}  style={{display: !_isEmpty(explorerData) ? 'block': 'none'}}>📄 {explorerData?.name}  <button
        onClick={handleDeleteClick}
        className={styles.deleteButton}
      >
        Delete
      </button></div>
      )}
    </div>
  );
};

export default Folder;
