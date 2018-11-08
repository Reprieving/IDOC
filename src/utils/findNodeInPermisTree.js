export default (currentNode,dataTree,nodeName) => {
    findNodeInPermisTree(currentNode,dataTree,nodeName)
  }
  function findNodeInPermisTree(currentNode,dataTree,nodeName){
    dataTree.forEach(item=>{
      if(item.name==nodeName){
        currentNode.push(item)
      }
      if(item.children){
        findNodeInPermisTree(currentNode,item.children,nodeName)
      }
    })
  }