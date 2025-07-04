export function getUserProject(userInfo = {}) {
    return (userInfo.userProjectResources
      && userInfo.userProjectResources.length
      && userInfo.userProjectResources[0]) || undefined;
}
  
export function getProjectState(userInfo = {}) {
    return (userInfo.userProjectResources
        && userInfo.userProjectResources.length
        && userInfo.userProjectResources[0]
        && userInfo.userProjectResources[0].state
        && userInfo.userProjectResources[0].state.id
    ) ? userInfo.userProjectResources[0].state.id : null;
}
  
export default {
getProjectState,
getUserProject,
};
