import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchProjectVehicles } from '../../api/projectTypeVehicles';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ProjectVehiclesContext = React.createContext({ ...initialState });

// Hook
const useProjectVehicles = (
  initialStates = { ...initialState }
) => {
  const [projectVehicles, setProjectVehicles] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchProjectVehiclesStart = () => {
    setProjectVehicles({ isFetching: true, isError: false });
  }

  const fetchProjectVehiclesSuccess = (states) => {
    setProjectVehicles({ isFetching: false, info: { ...states, data: { content: states.data } } });
  }

  const fetchProjectVehiclesError = (error) => {
    notifications.pushNotification(error);
    setProjectVehicles({ isFetching: false, isError: true });
  }

  const getProjectVehiclesList = (queryParams, userConfig) => {
    fetchProjectVehiclesStart();
    fetchProjectVehicles(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchProjectVehiclesSuccess(res.body);
      })
      .catch((err) => {
        fetchProjectVehiclesError(err);
      });
  }

  const fetchProjectVehiclesLoadMoreStart = () => {
    setProjectVehicles({ isFetching: true, isError: false });
  }
  const fetchProjectVehiclesLoadMoreSuccess = (states) => {
    setProjectVehicles({
      ...projectVehicles,
      isFetching: false,
      info: {
        ...projectVehicles.info,
        data: {
          ...projectVehicles.info.data,
          content: [...projectVehicles.info.data.content, ...states.data],
        },
      },
    });
  }

  const fetchProjectVehiclesLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setProjectVehicles({ isFetching: false, isError: true });
  }

  const getProjectVehiclesListLoadMore = (queryParams, userConfig) => {
    fetchProjectVehiclesLoadMoreStart();
    fetchProjectVehicles(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchProjectVehiclesLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchProjectVehiclesLoadMoreError(err);
      });
  }

  return {
    projectVehicles,
    setProjectVehicles,
    getProjectVehiclesList,
    getProjectVehiclesListLoadMore,
  };
};

// Provider
function withProjectVehiclesProvider(Component) {
  function ProjectVehiclesProvider(props) {
    const projectVehicles = useProjectVehicles();

    return (
      <ProjectVehiclesContext.Provider value={projectVehicles}>
        <Component
          {...props}
        />
      </ProjectVehiclesContext.Provider>
    );
  }

  return ProjectVehiclesProvider;
};

export { ProjectVehiclesContext, withProjectVehiclesProvider };