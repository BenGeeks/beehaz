import React, { useEffect, useState } from 'react';
import styles from './guest.module.css';
import { useSelector, useDispatch } from 'react-redux';
import SearchField from 'react-search-field';
import AddGuests from './components/AddGuests/AddGuests';
import ListGuest from './components/List/ListGuests';
import { addGuests, editGuest, loadGuests, deleteGuest } from '../../../../general_redux/guest/actions';
import { CSVLink } from 'react-csv';

function Guests() {
  const [addGuestModal, setAddGuestModal] = useState(false);
  const [edited, setEdited] = useState(undefined);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  let guestList = useSelector(({ guests }) => guests && guests.guestList);

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Company', key: 'company' },
    { label: 'Primary Email', key: 'emailId' },
    { label: 'Secondary Email', key: 'secondaryEmailId' },
    { label: 'Phone Number', key: 'phoneNo' },
    { label: 'Country', key: 'country' },
    { label: 'Address', key: 'address' },
    { label: 'Postal Code', key: 'postalCode' },
    { label: 'State/Province', key: 'state' },
    { label: 'Nationality', key: 'nationality' },
    { label: 'Language', key: 'language' },
    { label: 'Notes', key: 'notes' },
  ];

  useEffect(() => {
    dispatch(loadGuests());
  }, []);

  const handleSubmit = (data) => {
    if (edited) {
      dispatch(editGuest(data));
    } else {
      dispatch(addGuests(data));
    }
    setAddGuestModal(false);
    setEdited(null);
  };
  const handleEdit = (value) => {
    setEdited(value);
    setAddGuestModal(true);
  };

  const handleDelete = (row) => {
    dispatch(deleteGuest(row.id));
  };

  const findCSVData=()=>{
    const data=guestList.filter(
      (guest) =>
        guest.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        guest.emailId.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return data;
  }

  return (
    <>
      {addGuestModal ?(
          <AddGuests
              show={addGuestModal}
              onHide={(data) => {
                setAddGuestModal(false);
                setEdited(null);
              }}
              onSubmit={(data)=>handleSubmit(data)}
              value={edited}
          />
      ):(
          <>
            <div className={styles.guestHeader}>
              <div className={styles.searchContainer}>
                <SearchField
                    placeholder="Search Guests"
                    onChange={(val) => setSearch(val)}
                    searchText=""
                    classNames={styles.search_field}
                />
              </div>
              <div className={styles.flexEnd}>
                <CSVLink className={`w-25 ${styles.btn_csv} ${styles.btn}`} data={findCSVData()} headers={headers} filename={`BeeHaz_Guest_List_${Date.now()}.csv`}>
                  Download Excel
                </CSVLink>
                <button className={`${styles.btn_csv} ${styles.btn} w-25`} onClick={() => setAddGuestModal(true)}>
                  Add Guest
                </button>
              </div>
            </div>
            <ListGuest search={search} onDelete={handleDelete} onEdit={handleEdit}/>
          </>
      )}
    </>
  );
}

export default Guests;
