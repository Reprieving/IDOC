export default (tableArr, data) => {
  generaTableJson(tableArr, data);
};
function generaTableJson(tableArr, data) {

}

function isJsonString(str) {
  try {
    return typeof str == "object";
  } catch (e) {
    return false;
  }
}
