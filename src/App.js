import React, { useState } from "react";

import useTraverseTree from "./hooks/useTraverseTree/useTraverseTree";
import explorer from "./data/data";
import Folder from "./folder/Folder";

import "./App.css";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = useTraverseTree();

  const handleUpdateFolder = (id, value, isFolder, isInsert) => {
    const data = isInsert
      ? insertNode(explorerData, id, value, isFolder)
      : deleteNode(explorerData, id);
    setExplorerData(data);
  };

  return (
    <div className="App">
      <Folder
        explorerData={explorerData}
        handleUpdateFolder={handleUpdateFolder}
      />
    </div>
  );
}

export default App;
