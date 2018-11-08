export default (routers,data) => {
  generaMenu(routers,data)
}
function generaMenu(routers,data){
  data.forEach((item)=>{
    let menu = Object.assign({},item)
    menu.component = () => import('@/components/Login.vue');
    if(item.children){
      menu.children = []
      generaMenu(menu.children,item.children)
    }
    routers.push(menu)
  })
}