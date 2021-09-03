import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import styles from './register.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import logo from '../../icons/logo.png';
import { registerUser } from '../../general_redux/user/actions';
import Loading from '../../components/loading';
import {currencies} from '../../config/data/currencies';
import ReactTooltip from 'react-tooltip';
import ContactUs from "../Home/Containers/ContactUs";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Register() {
  const [viewContactUs, setViewContactUs] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [numberOfUnits, setNumberOfUnits] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState({value:"USD",label:"USD"});
  const [country, setCountry] = useState('');
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [ratePerNight, setRatePerNight] = useState('');
  const [minimumStay, setMinimumStay] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const registerStatus = useSelector(({ user }) => user && user.registerAction);
  const dispatch = useDispatch();
  const options = useMemo(() => countryList().getData(), []);
  
  const customTheme = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid lightgrey',
      boxShadow: 1,
    }),
  };

  const propertyOptions = [
    { value: 'serviced_apartments', label: 'Serviced Apartments' },
    { value: 'bnb', label: 'B&B' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'other', label: 'Other' },
  ];

  function handleNextPage(e){
    e.preventDefault();
    setPageNumber(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: `${firstName} ${lastName}`,
      emailId: email,
      companyName: company,
      website: website,
      propertyType: propertyType,
      noOfUnits: Number(numberOfUnits),
      currency: (defaultCurrency)?defaultCurrency.label:"",
      country: country ? country.label : "",
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      dailyRate: ratePerNight,
      minimumStayRequirement: minimumStay,
    };
    //console.log(data)
    dispatch(registerUser(data));
  }

  if (pageNumber === 2) {
    return (
      <div>
        <Header/>
        <ContactUs
            show={viewContactUs}
            onHide={() => {
              setViewContactUs(false);
            }}
        />
        <div className="d-flex justify-content-center">
          <div className={`${styles.mainContainer} ${styles.register}`}>
            <div className={`${styles.register_wrapper} shadow`}>
              <div className="d-flex justify-content-center">
                <Link to="/">
                  <img src={logo} className={styles.register_image} />
                </Link>
              </div>

              <div className={`d-flex justify-content-center flex-column pb-3`}>
                <h4 className="text-center font-weight-bold">Account Set Up</h4>
                <h6 className="text-center text-secondary">Step 2/2</h6>
                <div className="d-flex justify-content-center">
                  <FiberManualRecordIcon color="action" fontSize="small"/> <FiberManualRecordIcon color="action" fontSize="small"/> 
                </div>
                <hr className={styles.hr}/>
                <div className={styles.reminderWrapper}>
                  <p className={styles.reminder}>We shall use these details to create your account. Don't worry: you will be able to change them later. Hover over the questions for more information.</p>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>

                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}> Number of units: </span>
                      <div className={styles.toolTipIconContainer}>
                          <InfoOutlinedIcon fontSize="small" color="inherit" data-tip data-for='noOfUnits' className={styles.toolTipIcon}/>
                          <ReactTooltip place="bottom" type="dark" id='noOfUnits' effect="solid" className={styles.toolTip}>
                            <span>Number of rental units: apartments, rooms, parking spaces, or any other type on rental space. The maximum allowed number of rentals in the free version is 10 units.</span>
                          </ReactTooltip>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setNumberOfUnits(e.target.value)}
                      type="number"
                      required
                      className={`form-control ${styles.form_control}`}
                      aria-label="numberOfUnits"
                      aria-describedby="numberOfUnits"
                      min={1}
                      max={10}
                      value={numberOfUnits}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <label className={`input-group-text ${styles.input_group_text}`}>Currency: </label>
                    </div>
                    <div className={`form-control ${styles.form_control} ${styles.selector}`}>
                      <Select
                          options={currencies}
                          value={defaultCurrency}
                          onChange={(val)=>setDefaultCurrency(val)}
                          styles={customTheme}
                      />
                    </div>
                  </div>

                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Default rate: </span>
                      <div className={styles.toolTipIconContainer}>
                          <InfoOutlinedIcon fontSize="small" color="inherit" data-tip data-for='defaultRate' className={styles.toolTipIcon}/>
                          <ReactTooltip place="top" type="dark" id='defaultRate' effect="solid" className={styles.toolTip}>
                            <span>Set a default nightly rate (per rental per night in the selected currency). The default rate is used when there is no specific rate for a given date. Don’t worry: you will be able to change the default for every rental later and add date-specific rates.</span>
                          </ReactTooltip>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setRatePerNight(e.target.value)}
                      type="number"
                      step="0.01"
                      required
                      value={ratePerNight}
                      className={`form-control ${styles.form_control}`}
                      min={1}
                    />
                  </div>

                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Minimum stay: </span>
                      <div className={styles.toolTipIconContainer}>
                          <InfoOutlinedIcon fontSize="small" color="inherit" data-tip data-for='minimumStay' className={styles.toolTipIcon}/>
                          <ReactTooltip place="top" type="dark" id='minimumStay' effect="solid" className={styles.toolTip}>
                            <span>Set the default minimum length-of-stay requirement. This is the minimum number of nights that a guest can book a rental unit. Don’t worry: you will be able to change the default for every rental later and add specific requirements for selected dates.</span>
                          </ReactTooltip>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setMinimumStay(e.target.value)}
                      type="number"
                      required
                      value={minimumStay}
                      className={`form-control ${styles.form_control}`}
                      min={1}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Check-in time: </span>
                    </div>
                    <input
                      onChange={(e) => setCheckInTime(e.target.value)}
                      type="time"
                      step="60"
                      required
                      value={checkInTime}
                      className={`form-control ${styles.form_control}`}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Check-out time: </span>
                    </div>
                    <input
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      type="time"
                      step="60"
                      required
                      value={checkOutTime}
                      className={`form-control ${styles.form_control}`}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button className={styles.register_submit} disabled={registerStatus.loading}>
                      {
                        (registerStatus.loading)?(
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                              style={{marginRight:'1em',height:'1.3em',width:'1.3em'}}
                            /><span>Submit and log in</span>
                          </>
                        ):(
                          <span>Submit and log in</span>
                        )
                      }
                    </button>
                  </div>
  
                </form>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/login" className={styles.back_to_home}>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer setViewContactUs={() => setViewContactUs(true)} />
      </div>
    );
  } else {
    return (
      <div>
        <Loading  loadingStatus={registerStatus.loading}/>
        <Header/>
        <ContactUs
            show={viewContactUs}
            onHide={() => {
              setViewContactUs(false);
            }}
        />
        <div className="d-flex justify-content-center">
          <div className={`${styles.mainContainer} ${styles.register}`}>
            <div className={`${styles.register_wrapper} shadow`}>
              <div className="d-flex justify-content-center">
                <Link to="/">
                  <img src={logo} className={styles.register_image} />
                </Link>
              </div>

              <div className={`d-flex justify-content-center flex-column pb-3`}>
                <h4 className="text-center font-weight-bold">Account Set Up</h4>
                <h6 className="text-center text-secondary">Step 1/2</h6>
                <div className="d-flex justify-content-center">
                  <FiberManualRecordIcon color="action" fontSize="small"/> <FiberManualRecordOutlinedIcon color="action" fontSize="small"/>
                </div>
              </div>
              
              <div className="d-flex justify-content-center">
                <form onSubmit={handleNextPage}>
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>First name: </span>
                    </div>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      required
                      className={`form-control ${styles.form_control}`}
                      aria-label="firstName"
                      aria-describedby="firstName"
                      value={firstName}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Last name: </span>
                    </div>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      required
                      className={`form-control ${styles.form_control}`}
                      aria-label="lastName"
                      aria-describedby="lastName"
                      value={lastName}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Email address:</span>
                    </div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      className={`form-control ${styles.form_control}`}
                      aria-label="emailAddress"
                      aria-describedby="emailAddress"
                      value={email}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Company name: </span>
                    </div>
                    <input
                      onChange={(e) => setCompanyName(e.target.value)}
                      type="text"
                      required
                      className={`form-control ${styles.form_control}`}
                      aria-label="companyName"
                      aria-describedby="companyName"
                      value={company}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <span className={`input-group-text ${styles.input_group_text}`}>Website: </span>
                    </div>
                    <input
                      onChange={(e) => setWebsite(e.target.value)}
                      type="text"
                      className={`form-control ${styles.form_control}`}
                      aria-label="website"
                      aria-describedby="website"
                      value={website}
                    />
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <label className={`input-group-text ${styles.input_group_text}`}>Property type: </label>
                    </div>
                      <select
                        className={`form-control ${styles.form_control}`}
                        aria-label="propertyType"
                        aria-describedby="propertyType"
                        required={true}
                        value={propertyType}
                        onChange={(e)=>setPropertyType(e.target.value)}
                      >
                        <option value={""} key={"selectProp"} disabled={true}>{"Select property"}</option>
                        {propertyOptions.map((opt)=>(
                            <option value={opt.value} key={opt.value}>{opt.label}</option>))}
                      </select>
                  </div>
  
                  <div className={`input-group mb-3 ${styles.input_group}`}>
                    <div className="input-group-prepend">
                      <label className={`input-group-text ${styles.input_group_text}`}>Select country: </label>
                    </div>
  
                    <div className={`form-control ${styles.form_control} ${styles.selector}`}>
                      <Select
                        options={options}
                        value={country}
                        onChange={(value) => setCountry(value)}
                        styles={customTheme}
                      />
                    </div>
                  </div>
  
                  <div className="d-flex justify-content-center">
                    <button className={styles.register_submit} type='submit' disabled={false}>Next</button>
                  </div>  
                </form>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/login" className={styles.back_to_home}>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer setViewContactUs={() => setViewContactUs(true)}/>
      </div>
    );
  }
}

export default Register;
