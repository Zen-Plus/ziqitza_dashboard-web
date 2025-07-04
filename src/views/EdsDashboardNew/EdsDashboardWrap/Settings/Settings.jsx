import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Menu from '../../../../components/Menu';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import useForm from '../../../../common/hooks/form';
import ToggleSelect from '../../../../components/ToggleSelect';
import Input from '../../../../components/Input';
import { validateNumber } from '../../../../common/helpers/validators';

const fieldNames = {
  AUTO_REFRESH: 'autoRefresh',
  REFRESH_INTERVAL: 'refreshInterval',
  CAROUSEL_SETTING: 'carouselSetting',
  CAROUSAL_SPEED: 'carousalSpeed',
};
const carouselLabels = [
  {
    id: 'AUTO',
    name: 'Auto',
  },
  {
    id: 'MANUAL',
    name: 'Manual',
  },
];
function getInitialValues(values = {}) {
  const _values = { ...values };
  return _values;
}
function handleChange(event, preValues) {
  const { name, value } = event.target || {};
  return { ...preValues, [name]: value };
}

function handleAutoRefreshToggle(event, preValues) {
  const { name, value } = event || {};
  const _preValues = { ...preValues };
  if (value.id === 'ON') {
    _preValues[fieldNames.REFRESH_INTERVAL] = this.defaultRefreshInterval;
  } else {
    delete _preValues[fieldNames.REFRESH_INTERVAL];
  }

  return { ..._preValues, [name]: value };
}

function handleCarousalSettingToggle(event, preValues) {
  const { name, value } = event || {};
  const _preValues = { ...preValues };
  if (value.id === 'AUTO') {
    _preValues[fieldNames.CAROUSAL_SPEED] = this.defaultCarousalSpeed;
  } else {
    delete _preValues[fieldNames.CAROUSAL_SPEED];
  }

  return { ..._preValues, [name]: value };
}

export const fields = {
  [fieldNames.REFRESH_INTERVAL]: {
    handleChange,
  },
  [fieldNames.CAROUSAL_SPEED]: {
    handleChange,
  },
};
function validate({ values = {} }) {
  const errors = {};
  if (values[fieldNames.AUTO_REFRESH] && values[fieldNames.AUTO_REFRESH].id === 'ON') {
    if (!validateNumber(values[fieldNames.REFRESH_INTERVAL])) {
      errors[fieldNames.REFRESH_INTERVAL] = 'validation.invalid.form.text.data';
    } else if (values[fieldNames.REFRESH_INTERVAL] < 5) {
      errors[fieldNames.REFRESH_INTERVAL] = 'validation.dashboardRefreshInterval.minimum.text.field';
    }
  }
  if (values[fieldNames.CAROUSEL_SETTING] && values[fieldNames.CAROUSEL_SETTING].id === 'AUTO') {
    if (!validateNumber(values[fieldNames.CAROUSAL_SPEED])) {
      errors[fieldNames.CAROUSAL_SPEED] = 'validation.invalid.form.text.data';
    } else if (values[fieldNames.CAROUSAL_SPEED] < 3) {
      errors[fieldNames.CAROUSAL_SPEED] = 'validation.dashboardCarousalSpeed.minimum.text.field';
    }
  }
  return errors;
}
function handleSubmit(values) {
  this.onSettingSubmit(values);
}

function EdsDashboardSetting({
  onClickCancel,
  onSettingSubmit,
  intl,
  pickListData,
  selectedSettings,
  defaultRefreshInterval,
  defaultCarousalSpeed,
  restProps,
}) {
  const {
    values, errors, events,
  } = useForm({
    initialValues: getInitialValues(selectedSettings),
    handleSubmit: handleSubmit.bind({ onSettingSubmit }),
    fields: {
      ...fields,
      [fieldNames.AUTO_REFRESH]: {
        handleToggle: handleAutoRefreshToggle.bind({ defaultRefreshInterval }),
      },
      [fieldNames.CAROUSEL_SETTING]: {
        handleToggle: handleCarousalSettingToggle.bind({ defaultCarousalSpeed }),
      },
    },
    validate: validate.bind(restProps),
  });
  const {
    onBlur, onKeyUp, onChange, onSubmit, onToggle,
  } = events;

  return (
    <Menu className="EdsDashboardSettingWrap">
      <div className="ZiqitzaEdsDashboard">
        <div className="EdsDashboardSetting EdsDashboardSetting__Setting">
          <span className="Arrow-Up" style={{ position: 'absolute', top: '-10px', right: '12px' }} />
          <div className="Flex" style={{ flexWrap: 'wrap' }}>
            <div>
              <ToggleSelect
                labelText={intl.formatMessage({ id: 'label.autoRefresh' })}
                values={pickListData.AutoRefreshStatus || []}
                selected={values[fieldNames.AUTO_REFRESH]}
                onSelect={onToggle(fieldNames.AUTO_REFRESH)}
              />
            </div>
            <div className="Ml-20" style={{ position: 'relative' }}>
              <Input
                name={fieldNames.REFRESH_INTERVAL}
                labelText={intl.formatMessage({ id: 'label.refreshIntervalSessionRestricted' })}
                value={values[fieldNames.REFRESH_INTERVAL]}
                errorText={errors[fieldNames.REFRESH_INTERVAL]
                  && intl.formatMessage({ id: errors[fieldNames.REFRESH_INTERVAL] })}
                maxLength={2}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                disabled={values[fieldNames.AUTO_REFRESH] && values[fieldNames.AUTO_REFRESH].id === 'OFF'}
              />
              <div style={{ position: 'absolute', right: '10px', top: '30px' }}>
                {intl.formatMessage({ id: 'label.minutes' })}
              </div>
            </div>
          </div>
          <div className="Flex Mt-20">
            <div>
              <ToggleSelect
                labelText={intl.formatMessage({ id: 'label.carouselSetting' })}
                values={carouselLabels}
                selected={values[fieldNames.CAROUSEL_SETTING]}
                onSelect={onToggle(fieldNames.CAROUSEL_SETTING)}
              />
            </div>
            <div className="Ml-20" style={{ position: 'relative' }}>
              <Input
                name={fieldNames.CAROUSAL_SPEED}
                labelText={intl.formatMessage({ id: 'label.carouselSpeed' })}
                value={values[fieldNames.CAROUSAL_SPEED]}
                errorText={errors[fieldNames.CAROUSAL_SPEED]
                  && intl.formatMessage({ id: errors[fieldNames.CAROUSAL_SPEED] }, { sec: 3 })}
                maxLength={3}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onChange={onChange}
                disabled={values[fieldNames.CAROUSEL_SETTING] && values[fieldNames.CAROUSEL_SETTING].id === 'MANUAL'}
              />
              <div style={{ position: 'absolute', right: '10px', top: '30px' }}>
                {intl.formatMessage({ id: 'label.seconds' })}
              </div>
            </div>
          </div>
          <div className="Flex" style={{ justifyContent: 'flex-end', marginTop: '40px' }}>
            <div className="Flex">
              <Button
                type="link"
                className="Button-Width Button-Label-Cancel"
                onClick={() => onClickCancel()}
              >
                <span style={{ verticalAlign: 'middle', marginRight: 9 }}>
                  <Icon name="cross-red" />
                </span>
                <span className="Font--WB Font--S16" style={{ letterSpacing: '0.2px' }}>
                  {intl.formatMessage({ id: 'label.cancel' })}
                </span>
              </Button>
              <Button
                type="plain"
                className="Ml-18 Button-Width"
                onClick={onSubmit}
              >
                <span style={{ verticalAlign: 'middle', marginRight: '9px' }}>
                  <Icon name="check" />
                </span>
                <span
                  className="Font--WB Font--S16 Matterhorn-Text"
                  style={{ letterSpacing: '0.2px' }}
                >
                  {intl.formatMessage({ id: 'label.apply' })}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

EdsDashboardSetting.defaultProps = {
  restProps: {},
  defaultRefreshInterval: '5',
};

EdsDashboardSetting.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onSettingSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  selectedSettings: PropTypes.object.isRequired,
  pickListData: PropTypes.object.isRequired,
  restProps: PropTypes.object,
  defaultRefreshInterval: PropTypes.string,
  defaultCarousalSpeed: PropTypes.number,
};

export default injectIntl(EdsDashboardSetting);
