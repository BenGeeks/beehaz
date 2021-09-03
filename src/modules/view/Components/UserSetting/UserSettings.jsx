import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ConfirmMessage from '../../../../components/Confirmation';
import styles from './usersetting.module.css';
import Loading from '../../../../components/loading';
import { addUserSettings, getUserInfo, deleteUser } from '../../../../general_redux/user/actions';
import { useDispatch, useSelector } from 'react-redux';

function UserSettings() {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const user = useSelector(({ user }) => user && user.user);
  const { useSettingUpdate, useSettingLoad, deleteUserAction } = useSelector(({ user }) => user);
  const rentals=useSelector(({rentals})=>rentals && rentals.rentals);

  const perMonth=()=>{
    if(rentals.length<=10){
      return 12.50;
    }else{
      return (12.50+[(rentals.length-10)*1.25])
    }
  }

  const perYear=()=>{
    if(rentals.length<=10){
      return 120;
    }else{
      return (120+(rentals.length-10)*12)
    }
  }

  const perMonthcost=perMonth();
  const perYearcost=perYear();
  const [radioSelection,setRadioSelection]=useState({
    perMonth:false,
    perYear:false
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userSettingsData = {
      name: e.target.name.value,
      emailId: e.target.emailId.value,
      language: e.target.language.value,
      permissions: e.target.permissions.value,
      accountType: e.target.accountType.value,
      planType: radioSelection.perYear? "yearly":"monthly",
      //billingName:e.target.billingName.value,
      //company:e.target.company.value,
      //address:e.target.address.value,
      //creditCard:e.target.credCard.value,
      //country:country? country.label:"",
      companyName:e.target.companyName.value,
    };
    dispatch(addUserSettings(userSettingsData));
  };
  const deleteUserAcc = () => {
    dispatch(deleteUser(user.id));
    setDeleteModal(false);
  };

  return (
      <div className={'p-3 h-100 overflow-auto'}>
        <ConfirmMessage
            show={deleteModal}
            onHide={() => {
              setDeleteModal(false);
            }}
            confirmHeader={`Are you sure you want to delete your account?`}
            confirmBody={`Deleting your account is permanent and will remove all content including bookings 
            and profile settings. This action cannot be undone. 
            Are you sure you want to delete your account?`}
            onConfirmAct={deleteUserAcc}
        />
        <Loading loadingStatus={useSettingUpdate.loading || useSettingLoad.loading || deleteUserAction.loading} />

        <div className={styles.usersettingHeader}>User Settings</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Name
            </label>
            <div className="col-md-4">
              <input type="text" className="form-control" id="name" style={{fontSize:'inherit'}} defaultValue={user.name} required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="emailId" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Email
            </label>
            <div className="col-md-4">
              <input type="email" className="form-control" id="emailId" style={{fontSize:'inherit'}} defaultValue={user.emailId} required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="language" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Language
            </label>
            <div className="col-md-4">
              <select id="language" className="form-control" disabled style={{fontSize:'inherit'}}>
                <option defaultValue>{user.language}</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="permissions" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              User permission
            </label>
            <div className="col-md-4">
              <input type="text" className="form-control" id="permissions" style={{fontSize:'inherit'}} defaultValue={'Admin'} disabled />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="permissions" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Company name
            </label>
            <div className="col-md-4">
              <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  style={{fontSize:'inherit'}} />
            </div>
          </div>

          <div className={styles.usersettingHeader}>Account Settings</div>

          <div className="form-group row">
            <label htmlFor="accountType" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Account type
            </label>
            <div className="col-md-4">
              <input
                  className={"form-control"}
                  id={"accountType"}
                  style={{ fontSize: 'inherit' }}
                  readOnly={true}
                  value={user.accountType}
              >
              </input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="numberOfRental" className="col-sm-2 col-md-3 col-xl-2 col-form-label">
              Number of rentals
            </label>
            <div className="col-md-4">
              <input
                  type="number"
                  className="form-control"
                  style={{fontSize:'inherit'}}
                  id="numberOfRentals"
                  value={rentals.length}
                  readOnly={true}
              />
              <span className={styles.notifyMessage}>{(rentals.length>10 && user && user.linkedlcal)?`Number of rentals: ${rentals.length}. You have linked channels.
                    Upgrade to the Plus Plan to continue using Beehaz successfully`: ((rentals.length>10 || (user && user.linkedlcal)))?`Number of 
                    rentals: ${rentals.length}. Upgrade to the Plus Plan to continue using Beehaz successfully`:""}</span>
            </div>
          </div>

          <div className="form-group row m-0 ">
            <label htmlFor="twoYearBookingWindow" className="col-sm-2 col-xs-2 col-md-3 col-xl-2 col-form-label pl-0">
              Upgrade to plus plan:
            </label>
          </div>
          <div className="form-group row m-0">
            <div className="col-sm-6">
              <div className={styles.form_check}>
                <input
                    type="radio"
                    className={styles.two_yrs_input}
                    id="pricePerMonth"
                    name={'priceSelect'}
                    value={radioSelection}
                    onChange={(e)=>setRadioSelection({
                      perYear:!e.target.checked,
                      perMonth:e.target.checked,
                    })}
                />
                <label className={`${styles.two_yrs_label} pl-1`}>{perMonthcost} USD per month</label>
              </div>
            </div>
          </div>
          <div className="form-group row pl-3">
            <div className="col-sm-6">
              <div className={styles.form_check}>
                <input
                    type="radio"
                    className={styles.two_yrs_input}
                    id="pricePerYear"
                    name={'priceSelect'}
                    value={radioSelection}
                    onChange={(e)=>setRadioSelection({
                      perYear:e.target.checked,
                      perMonth:!e.target.checked,
                    })}
                />
                <label  className={`${styles.two_yrs_label} pl-1`}>{perYearcost} USD per year</label>
              </div>
            </div>
          </div>
          <div>
            <button
                className={styles.savBtn}
                onClick={(e)=>e.preventDefault()}
                disabled={(!radioSelection.perMonth && !radioSelection.perYear)}
            >
              Subscribe to plus plan
            </button>
          </div>
          {/*<div className={styles.usersettingHeader}>Billing Information</div>*/}
          {/*<div className="form-group row">*/}
          {/*  <label htmlFor="billingName" className="col-sm-2 col-md-3 col-xl-2 col-form-label">*/}
          {/*    Name*/}
          {/*  </label>*/}
          {/*  <div className="col-md-4">*/}
          {/*    <input type="text" className="form-control" id="billingName" style={{fontSize:'inherit'}} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-group row">*/}
          {/*  <label htmlFor="company" className="col-sm-2 col-md-3 col-xl-2 col-form-label">*/}
          {/*    Company*/}
          {/*  </label>*/}
          {/*  <div className="col-md-4">*/}
          {/*    <input type="text" className="form-control" id="company" style={{fontSize:'inherit'}} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-group row">*/}
          {/*  <label htmlFor="address" className="col-sm-2 col-md-3 col-xl-2 col-form-label">*/}
          {/*    Address*/}
          {/*  </label>*/}
          {/*  <div className="col-md-4">*/}
          {/*    <input type="text" className="form-control" id="address" style={{fontSize:'inherit'}} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-group row">*/}
          {/*  <label htmlFor="country" className="col-sm-2 col-md-3 col-xl-2 col-form-label">*/}
          {/*    Country*/}
          {/*  </label>*/}
          {/*  <div className="col-md-4">*/}
          {/*    <Select*/}
          {/*        options={countryList().getData()}*/}
          {/*        onChange={(val) => setCountry(val)}*/}
          {/*        value={country}*/}
          {/*        isClearable={true}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-group row">*/}
          {/*  <label htmlFor="credCard" className="col-sm-2 col-md-3 col-xl-2 col-form-label">*/}
          {/*    Credit card*/}
          {/*  </label>*/}
          {/*  <div className="col-md-4">*/}
          {/*    <input type="number" className="form-control" id="credCard" style={{fontSize:'inherit'}} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={`mt-1`}>
            <a className={styles.linkText}>click here to see your invoices</a>
          </div>
          <br /><br/><br/>
          <button className={styles.savBtn} type="submit">
            Save changes
          </button>
          <Button className={styles.delBtn} onClick={handleShow}>
            Delete account
          </Button>
        </form>
      </div>
  );
}
export default UserSettings;
