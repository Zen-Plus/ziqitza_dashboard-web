import React, { useContext } from 'react';
import NhmDashboardWrap from './NhmDashboardWrap';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import {
  NotificationContext,
  withNotificationProvider,
} from '../../providers/withNotificationProvider';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';

function NhmDashboard(props) {
  const notifications = useContext(NotificationContext);
  return (
    <div className="ZiqitzaEdsDashboard">
      <Notification
        components={{ Icon }}
        notifications={notifications.notifications}
        removeNotification={notifications.removeNotification}
      />
      <NhmDashboardWrap
        {...props}
      />
    </div>
  );
}

export default withUserConfigProvider(withIntlProvider(withNotificationProvider(NhmDashboard)));
