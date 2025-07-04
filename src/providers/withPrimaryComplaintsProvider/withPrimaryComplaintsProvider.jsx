import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchPrimaryComplaints } from '../../api/primaryComplaints';
import { NotificationContext } from '../withNotificationProvider';

// initial context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const PrimaryComplaintsContext = React.createContext({ ...initialState });

// Hook
const usePrimaryComplaints = (
  initialStates = { ...initialState }
) => {
  const [primaryComplaints, setPrimaryComplaints] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchPrimaryComplaintsStart = () => {
    setPrimaryComplaints({ isFetching: true, isError: false });
  }

  const fetchPrimaryComplaintsSuccess = (states) => {
    setPrimaryComplaints({ isFetching: false, info: { data: states.data } });
  }

  const fetchPrimaryComplaintsError = (error) => {
    notifications.pushNotification(error);
    setPrimaryComplaints({ isFetching: false, isError: true });
  }

  const getPrimaryComplaintsList = (queryParams, userConfig) => {
    fetchPrimaryComplaintsStart();
    fetchPrimaryComplaints(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchPrimaryComplaintsSuccess(res.body);
      })
      .catch((err) => {
        fetchPrimaryComplaintsError(err);
      });
  }
  const fetchPrimaryComplaintsLoadMoreStart = () => {
    setPrimaryComplaints({ isFetching: true, isError: false });
  }
  const fetchPrimaryComplaintsLoadMoreSuccess = (states) => {
    setPrimaryComplaints({
      ...primaryComplaints,
      isFetching: false,
      info: {
        ...primaryComplaints.info,
        data: {
          ...primaryComplaints.info.data,
          content: [...primaryComplaints.info.data.content, ...states.data.content],
        },
      },
    });
  }

  const fetchPrimaryComplaintsLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setPrimaryComplaints({ isFetching: false, isError: true });
  }

  const getPrimaryComplaintsListLoadMore = (queryParams, userConfig) => {
    fetchPrimaryComplaintsLoadMoreStart();
    fetchPrimaryComplaints(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchPrimaryComplaintsLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchPrimaryComplaintsLoadMoreError(err);
      });
  }

  return {
    primaryComplaints,
    setPrimaryComplaints,
    getPrimaryComplaintsList,
    getPrimaryComplaintsListLoadMore
  };
};

// Provider
function withPrimaryComplaintsProvider(Component) {
  function PrimaryComplaintsProvider(props) {
    const primaryComplaints = usePrimaryComplaints();

    return (
      <PrimaryComplaintsContext.Provider value={primaryComplaints}>
        <Component
          {...props}
        />
      </PrimaryComplaintsContext.Provider>
    );
  }

  return PrimaryComplaintsProvider;
};

export { PrimaryComplaintsContext, withPrimaryComplaintsProvider };