import React from 'react';
import DashboardWrap from './EdsDashboardWrap';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import { NotificationContext, withNotificationProvider } from '../../providers/withNotificationProvider';

function EdsDashboard(props) {
  const notifications = React.useContext(NotificationContext);
  return (
    <>
    <div className="View-Bg-Eds-Dashboard" />
    <div className="Width-Full ZiqitzaEdsDashboard" style={{ zIndex: 1 }}>
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <DashboardWrap {...props}/>
    </div>
    </>
  );
}

export default withUserConfigProvider(
  withIntlProvider(
    withNotificationProvider(
        EdsDashboard
    )
  )
);
