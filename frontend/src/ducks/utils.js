import ErrorStackParser from 'error-stack-parser';
function getStackTrace(offset = 2) {
  try {
    return ErrorStackParser.parse(new Error())
      .slice(offset)
      .map(frame => {
        const location = [
          frame.fileName,
          frame.lineNumber,
          frame.columnNumber,
        ].join(':');
        return `${frame.functionName} (${location})`;
      });
  } catch (e) {}
}

const actionTypes = {};
export function actionCreator(type, commonMeta, error) {
  if (actionTypes[type]) throw new Error(`Duplicate action type: ${type}`);
  actionTypes[type] = true;
  return Object.assign(
    (payload, meta) => {
      const action = {
        type,
        payload,
        meta: Object.assign({}, commonMeta, meta, {
          stack: getStackTrace(),
        }),
      };
      if (error) action.error = error;
      return action;
    },
    { type },
  );
}
export function asyncActionCreators(type, commonMeta) {
  return {
    started: actionCreator(`${type}_STARTED`, commonMeta),
    done: actionCreator(`${type}_DONE`, commonMeta),
    failed: actionCreator(`${type}_FAILED`, commonMeta, true),
  };
}
