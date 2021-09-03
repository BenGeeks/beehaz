export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('state');
  
      if (serializedState === null) {
        return undefined;
      }
  
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };
  
export const saveState = (state) => {
try {
  if(state.user.user){
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  }else{
    sessionStorage.clear();
  }
   
} catch (error) {
    // Ignore write errors.
}
};
