export default (res, msgType) => {
  generaMsgType(res, msgType);
};
function generaMsgType(res, msgType) {
  switch (res.stateCode) {
    case 0:
      msgType.push("success");
      break;

    case -1:
      msgType.push("error");
      break;

    case 1:
      msgType.push("info");
      break;
  }
}
