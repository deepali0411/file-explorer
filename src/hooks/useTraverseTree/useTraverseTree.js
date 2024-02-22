const useTraverseTree = () => {
   function insertNode (tree, folderId, item, isFolder){
        if(folderId === tree.id && tree.isFolder) {
            tree.items.unshift({
                id: new Date(),
                items:[],
                name:item,
                isFolder
            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map(obj => {
         return insertNode(obj, folderId, item, isFolder)
       })
       return {...tree, item: latestNode};
   }

   function deleteNode (tree, folderId) {
    if(folderId === tree.id){
        return {};
    }
    function deleteItem (tree) {
       if(tree.items.some(item=> item.id === folderId)){
        let latestData = tree.items.filter(item => item.id!==folderId)
        return {...tree, items: latestData}
       }
       let latestData = tree.items.map(obj => {
        return deleteItem(obj);
       })
       return {...tree, items: latestData}
    }
    return deleteItem(tree);
   } 

   return {insertNode, deleteNode}
}

export default useTraverseTree;