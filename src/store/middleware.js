const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // 여기서 원하는 액션 타입을 설정하여 저장할 수 있습니다.
  // 여기서는 모든 액션에 대해 저장하도록 설정하였습니다.
  if (action.type) {
    const state = store.getState();
    localStorage.setItem('tag', JSON.stringify(state.tag));
    localStorage.setItem('note', JSON.stringify(state.note));
  }

  return result;
};
export default localStorageMiddleware;
