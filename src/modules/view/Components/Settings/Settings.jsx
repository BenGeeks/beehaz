import React, { useEffect, useState } from 'react';
import styles from './settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../../components/loading';
import { setSettings, LoadSettings } from '../../../../general_redux/general settings/actions';
import Select from 'react-select';
import {Row,Col} from 'react-bootstrap';
import { currencies } from '../../../../config/data/currencies';
import { Form } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReactTooltip from "react-tooltip";
import TimezoneSelect from 'react-timezone-select'

function Settings() {
  useEffect(() => {
    dispatch(LoadSettings());
  }, []);

  const findArray = (val)=>{
    const ar=countryList().getData().filter((row)=>row.label===val);
    if(ar.length!==0){
      return ar[0];
    }
  }
  const { setting, dateFormatArray, numberFormatArray, actionForSettings, actionForSettingsEdit } = useSelector(
    ({ generalSetting }) => generalSetting && generalSetting
  );
  const user = useSelector(({ user }) => user && user.user);

  const [defaultCurrency, setDefaultCurrency] = useState(setting.currency ? setting.currency : '');
  const [timeFormat, setTimeFormat] = useState(setting.timeDisplay ? setting.timeDisplay : '');
  const [dateFormat, setDateFormat] = useState(setting.dateDisplay ? setting.dateDisplay : '');
  const [numberFormat, setNumberFormat] = useState(setting.numberDisplay ? setting.numberDisplay : '');
  const [invoiceName, setInvoiceName] = useState(user.name ? user.name : '');
  const [invoiceAddress1, setInvoiceAddress1] = useState(setting.address1 ? setting.address1 : '');
  const [invoiceAddress2, setInvoiceAddress2] = useState(setting.address2 ? setting.address2 : '');
  const [invoiceAddress3, setInvoiceAddress3] = useState(setting.address3 ? setting.address3 : '');
  const [invoiceCountry, setInvoiceCountry] = useState(setting.country ? findArray(setting.country) : '');
  const [invoiceText, setInvoiceText] = useState(setting.invoiceText ? setting.invoiceText : '');
  const [invoiceFooter, setInvoiceFooter] = useState(setting.invoiceFooter ? setting.invoiceFooter : '');
  const [allowBooking,setAllowBooking]=useState(setting && setting.isFutureBooking);
  const [numberOf,setNumberOf]=useState(user && user.numberOf);
  const [allowBookingFor,setAllowBookingFor]=useState(user && user.allowBookingFor);
  const [timezone, setTimezone] = useState((setting && setting.timezone)?
      setting.timezone
      :Intl.DateTimeFormat().resolvedOptions().timeZone)
  const dispatch = useDispatch();

  function handleSave(e) {
    e.preventDefault();
    const payload = {
      emailId: user.emailId,
      name: invoiceName,
      currency: defaultCurrency ? defaultCurrency.label : 'USD',
      timeDisplay: timeFormat,
      dateDisplay: dateFormat,
      numberDisplay: findNumberFormat(numberFormat),
      numberOf:  Number(numberOf),
      allowBookingFor,
      allowBooking:allowBooking,
      address1: invoiceAddress1,
      address2: invoiceAddress2,
      address3: invoiceAddress3,
      country: invoiceCountry? invoiceCountry.label:"",
      invoiceText,
      invoiceFooter,
      timezone:timezone ? (timezone.value? timezone.value:timezone):"",
    };
    //console.log(timezone);
    dispatch(setSettings(payload));
  }

  const findDateFormat = (datef) => {
    const index = dateFormatArray.filter((row) => {
      if (row.val === datef) {
        return row;
      }
    });
    return index[0].id;
  };

  const findNumberFormat = (numf) => {
    const index = numberFormatArray.filter((row) => {
      if (row.val === numf) {
        return row;
      }
    });
    return index[0].id;
  };

  return (
    <div className={'p-3'}>
      <Loading loadingStatus={actionForSettings.loading || actionForSettingsEdit.loading} />
      <h2 className={styles.settings__header}>General Settings</h2>
      <div className={styles.settings_wrapper}>
        <div className={`input-group mb-3 ${styles.input_group}`}>
          <div className="input-group-prepend">
            <label className={`input-group-text ${styles.input_group_text}`} htmlFor="propertyType">
              Default currency:
            </label>
          </div>

          <Select
            options={currencies}
            value={defaultCurrency}
            onChange={(val) => setDefaultCurrency(val)}
            className={`custom-select ${styles.form_entry}`}
          />
        </div>

        <div className={`input-group mb-3 ${styles.input_group}`}>
          <div className="input-group-prepend">
            <label className={`input-group-text ${styles.input_group_text}`} htmlFor="timeFormat">
              Time display:
            </label>
          </div>
          <select
            onChange={(e) => setTimeFormat(e.target.value)}
            className={`custom-select ${styles.form_control}`}
            id="timeFormat"
            value={timeFormat}
            style={{ fontSize: 'inherit' }}
          >
            <option value="">Select time format</option>
            <option value="AM_PM">AM / PM</option>
            <option value="H">24 H</option>
          </select>
        </div>

        <div className={`input-group mb-3 ${styles.input_group}`}>
          <div className="input-group-prepend">
            <label className={`input-group-text ${styles.input_group_text}`} htmlFor="dateFormat">
              Date display:
            </label>
          </div>
          <select
            onChange={(e) => setDateFormat(e.target.value)}
            className={`custom-select ${styles.form_control}`}
            id="dateFormat"
            value={dateFormat}
            style={{ fontSize: 'inherit' }}
          >
            <option value="">Select date format</option>
            {dateFormatArray &&
              dateFormatArray.map((t) => (
                <option value={t.val} defaultValue={dateFormat} key={t.id}>
                  {t.val}
                </option>
              ))}
          </select>
        </div>

        <Row>
          <Col md={4} xs={5}>
            <div className="input-group-prepend ">
              <label
                  className={`input-group-text ${styles.input_group_text}`}
                  htmlFor="numberFormat"
              >
                Number format:
              </label>
            </div>
          </Col>
          <Col md={8} xs={4} className={'mb-2'}>
            <Row className={"p-2"}>
              <div className={"col-xs-3 col-md-auto"} >
                <input
                    type="radio"
                    value={"1'000.00"}
                    onChange={(e)=>setNumberFormat(e.target.value)}
                    name={"numberFormat"}
                    checked={numberFormat === "1'000.00"}
                    className={"pl-2"}
                />
                <label htmlFor="1">1'000.00</label>
              </div>
              <div className={"col-xs-3 col-md-auto"} >
                 <input
                     type="radio"
                     value={"1,000.00"}
                     onChange={(e)=>setNumberFormat(e.target.value)}
                     name={"numberFormat"}
                     checked={numberFormat === '1,000.00'}
                 />
                 <label htmlFor="2">1,000.00</label>
              </div>
              <div className={"col-xs-3 col-md-auto"}>
                <input
                    type="radio"
                    value={"1.000,00"}
                    onChange={(e)=>setNumberFormat(e.target.value)}
                    name={"numberFormat"}
                    checked={numberFormat === '1.000,00'}
                />
                <label htmlFor="3">1.000,00</label>
              </div>
            </Row>
          </Col>
        </Row>

        <div className={`input-group mb-3 ${styles.input_group}`}>
          <div className="input-group-prepend">
            <label className={`input-group-text ${styles.input_group_text}`} htmlFor="timeZone">
              Time zone:
            </label>
          </div>
          <div className={'w-100'}>
            <TimezoneSelect
                value={timezone}
                onChange={setTimezone}
            />
          </div>
        </div>
      </div>
      <hr />

      <div className="pb-2 d-flex flex-direction-column">
        <h2 className={styles.settings__header}>Calendar Settings</h2>
        <div className={styles.toolTipIconContainer}>
          <InfoOutlinedIcon
              fontSize="small"
              color="inherit"
              data-tip
              data-for="calendarIcon"
              className={styles.toolTipIcon}
          />
          <ReactTooltip place="bottom" type="dark" id="calendarIcon" effect="solid" className={styles.toolTip}>
          <span>
           You can block dates from being booked too far into the future. Select the time window you
           wish the calendar to be open for bookings.
          </span>
          </ReactTooltip>
        </div>
      </div>

      <div className={`input-group mb-3 ${styles.input_group}`}>
        <div className="input-group-prepend">
          <label className={`col-sm-12 col-xs-12 col-md-12 col-xl-12 col-form-label ${styles.input_group_text}`} htmlFor="futureBoooking">
            Future booking window:
          </label>
        </div>
        <div>
          <label className={styles.two_yrs_label}>2 Years&nbsp;</label>
          <input
              type="checkbox"
              className={styles.two_yrs_input}
              id="twoYearBookingWindow"
              name={'futureBookingWindow'}
              checked={allowBooking}
              onChange={(e)=>setAllowBooking(e.target.checked)}
          />
        </div>
      </div>
      <div className={`input-group mb-3 col-xs-2 ${styles.input_group}`}>
        <div className="input-group-prepend">
          <label className={`col-sm-12 col-xs-12 col-md-12 col-xl-12 col-form-label ${styles.input_group_text}`} htmlFor="futureBoooking">
            Allow booking for next:
          </label>
        </div>
        <div className={`ml-2`}>
          <input
              type="number"
              className={`form-control ${styles.numberOfField}`}
              id="numberOf"
              min="1"
              value={numberOf}
              onChange={(e)=>setNumberOf(e.target.value)}
          />
        </div>
        <div className={styles.form_control_radio}>
          <div className={'mx-3 pt-2'}>
            <input
                type="radio"
                value={"months"}
                checked={allowBookingFor === 'months'}
                onChange={(e) => setAllowBookingFor(e.target.value)}
                name={'allowBookingFor'}
            />
            <label htmlFor="months"> &nbsp;&nbsp;month(s)</label>
          </div>
          <div className={'mx-3 pt-2'}>
            <input
                type="radio"
                value={'years'}
                checked={allowBookingFor === 'years'}
                onChange={(e) => setAllowBookingFor(e.target.value)}
                name={'allowBookingFor'}
            />
            <label htmlFor="years"> &nbsp;&nbsp;year(s)</label>
          </div>
        </div>
      </div>
      <hr/>

      <h2 className={styles.settings__header}>Invoice Settings</h2>
      <Form onSubmit={handleSave} className={styles.settings_wrapper}>
        <Form.Row className="pb-2">
          <Form.Label className="col-sm-12 col-form-label pl-3 mb-2">
            <b>Sender: </b>
          </Form.Label>
          <Form.Label className={`col-4 col-form-label pl-3 ${styles.defaultFont}`}>Name: </Form.Label>
          <div className={`col-8 ${styles.defaultFont}`}>
            <Form.Control
              type="text"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
              style={{ fontSize: 'inherit' }}
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className={`col-4 col-form-label pl-3 ${styles.defaultFont}`}>Address 1: </Form.Label>
          <div className={`col-8 ${styles.defaultFont}`}>
            <Form.Control
              type="text"
              value={invoiceAddress1}
              onChange={(e) => setInvoiceAddress1(e.target.value)}
              style={{ fontSize: 'inherit' }}
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className={`col-4 col-form-label pl-3 ${styles.defaultFont}`}>Address 2: </Form.Label>
          <div className={`col-8 ${styles.defaultFont}`}>
            <Form.Control
              type="text"
              value={invoiceAddress2}
              onChange={(e) => setInvoiceAddress2(e.target.value)}
              style={{ fontSize: 'inherit' }}
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className={`col-4 col-form-label pl-3 ${styles.defaultFont}`}>Address 3: </Form.Label>
          <div className={`col-8 ${styles.defaultFont}`}>
            <Form.Control
              type="text"
              value={invoiceAddress3}
              onChange={(e) => setInvoiceAddress3(e.target.value)}
              style={{ fontSize: 'inherit' }}
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className={`col-4 col-form-label pl-3 ${styles.defaultFont}`}>Country: </Form.Label>
          <div className={`col-8 ${styles.defaultFont}`}>
            <Select
              options={countryList().getData()}
              onChange={(val) => setInvoiceCountry(val)}
              value={invoiceCountry}
              isClearable={true}
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className="col-sm-12 col-form-label pl-3">
            <b>Invoice text:</b>
          </Form.Label>
          <div className="col-sm-12">
            <Form.Control
              className={styles.defaultFont}
              as="textarea"
              value={invoiceText}
              onChange={(e) => setInvoiceText(e.target.value)}
              rows={4}
              name="invoiceText"
            />
          </div>
        </Form.Row>

        <Form.Row className="pb-2">
          <Form.Label className="col-sm-12 col-form-label pl-3">
            <b>Footer information: </b>
          </Form.Label>
          <div className="col-sm-12">
            <Form.Control
              className={styles.defaultFont}
              as="textarea"
              value={invoiceFooter}
              onChange={(e) => setInvoiceFooter(e.target.value)}
              rows={4}
              name="invoiceFooter"
            />
          </div>
        </Form.Row>

        { setting && (setting.accountType==="plus" || setting.accountType==="trial") && (
            <>
              <hr/>
              <div className="pb-2 d-flex flex-direction-column">
                <h2 className={styles.settings__header}>Stripe Payment Settings</h2>
                <div className={styles.toolTipIconContainer}>
                  <InfoOutlinedIcon
                      fontSize="small"
                      color="inherit"
                      data-tip
                      data-for="stripIcon"
                      className={styles.toolTipIcon}
                  />
                  <ReactTooltip place="bottom" type="dark" id="stripIcon" effect="solid" className={styles.toolTip}>
                  <span>
                    Accept credit card payments from your guests by connecting to the Stripe payment gateway.
                    Once your Stripe account is connected, you can enable the Stripe payment button on your invoices.
                    For more information about Stripe and their charges, please refer to Stripe.com .
                  </span>
                  </ReactTooltip>
                </div>
              </div>
              <div>
                <p style={{fontSize:'0.8em'}}>&nbsp;Make sure your Stripe account is live and ready to receive payments<br/>
                  &nbsp;Click the button bellow to connect to your Stripe account. You will be automatically forwarded to Stripe<br/>
                  &nbsp;Log into your Stripe account and fill the requested information.Don’t forget to “authorize this account”.</p>
              </div>
              <button
                  className={styles.settings_save}
                  style={{margin:'0px',padding:'10px',fontSize:'0.8rem',width:'fit-content'}}
              >Connect to stripe</button>
            </>
        )}

        <div className="d-flex justify-content-center">
          <button className={styles.settings_save} type="submit">
            Save changes
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Settings;
