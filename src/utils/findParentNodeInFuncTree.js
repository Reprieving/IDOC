export default (parentNode,dataTree,nodeName) => {
  findParentNodeInFuncTree(parentNode,dataTree,nodeName)
}
function findParentNodeInFuncTree(parentNode,dataTree,nodeName){
  dataTree.forEach(item=>{
    if(item.name==nodeName){
      parentNode.push(item.id)
    }
    if(item.children){
      findParentNodeInFuncTree(parentNode,item.children,nodeName)
    }
  })
}
