import React, { useEffect, useState } from 'react';
import home from '../../../../icons/icon_house.svg';
import group from '../../../../icons/icon_houses.svg';
import homeInActive from '../../../../icons/icon_house_inActive.svg';
import groupInActive from '../../../../icons/icon_houses_inActive.svg';
import styles from './rentals.module.css';
import AddRental from './components/AddEditRental/AddRental';
import AddGroup from './components/AddEditGroup/AddGroup';
import ViewGroups from './components/view-groups';
import ViewRentals from './components/view-rentals';
import { useSelector, useDispatch } from 'react-redux';
import {
  addGroup,
  addRental,
  updateGroup,
  updateRental,
  loadRental,
  loadGroup,
  clearRental,
} from '../../../../general_redux/rentals/actions';

function Rentals(props) {
  const [addRentaleModal, setAddRentalModal] = useState(false);
  const [activeTab, setActiveTab] = useState('rentals');
  const [addGroupModal, setAddGroupModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const rentalStatus = useSelector(({ rentals }) => rentals && rentals.actionAddRental);
  const rentalID = useSelector(({ rentals }) => rentals && rentals.lastAddedRentalID);

  const dispatch = useDispatch();

  const closeModal = (type, data, isNew) => {
    if (type === 'rentals') {
      setAddRentalModal(false);
    } else {
      setAddGroupModal(false);
    }
    setModalData({ data, type, isNew });
  };
  useEffect(() => {
    dispatch(loadGroup());
    dispatch(loadRental());
  }, [dispatch]);

  useEffect(() => {
    if (rentalStatus.success) {
      if (rentalID) {
        dispatch(clearRental());
      }
    }
  }, [dispatch, rentalID]);

  useEffect(() => {
    if (modalData && modalData.data) {
      if (modalData.isNew) {
        let payload = [];
        if (modalData.type === 'rentals') {
          dispatch(addRental(modalData.data));
        } else {
          dispatch(addGroup(modalData.data));
        }
      } else {
        if (modalData.type === 'rentals') {
          dispatch(updateRental(modalData.data));
        } else {
          const payload={
            id:modalData.data.id,
            groupName:modalData.data.groupName,
            color:modalData.data.color
          }
          dispatch(updateGroup(payload));
        }
      }
      setModalData(null);
    }
  }, [dispatch, modalData]);

  const editGroupData = (value) => {
    setAddGroupModal({ show: true, value });
  };

  const editRentalData = (value) => {
    setAddRentalModal({ show: true, value });
  };
  return (
    <>
      <AddRental
        show={addRentaleModal.show}
        value={addRentaleModal.value}
        onHide={(data) => closeModal('rentals', data, true)}
        onEdit={(data) => closeModal('rentals', data, false)}
      />
      <AddGroup
        show={addGroupModal.show}
        value={addGroupModal.value}
        onHide={(data) => closeModal('groups', data, true)}
        onEdit={(data) => closeModal('groups', data, false)}
      />
      <div className={styles.rentalHeader}>
        <div className={styles.icons}>
          <img
            src={(activeTab==="rentals")?home:homeInActive}
            className={`${styles.iconstyle} ${activeTab === 'rentals' ? styles.selectedIcon : ''}`}
            onClick={() => setActiveTab('rentals')}
          />
          <img
            src={(activeTab==="groups")?group:groupInActive}
            className={`${styles.iconstyle} ${activeTab !== 'rentals' ? styles.selectedIcon : ''}`}
            onClick={() => setActiveTab('groups')}
          />
        </div>
        <div className={styles.flexEnd}>
          <button className={`${styles.allBtn} w-25 mr-1`} onClick={() => setAddGroupModal({ show: true, data: null })}>
            Add Group
          </button>
          <button className={`${styles.allBtn} w-25`} onClick={() => setAddRentalModal({ show: true, data: null })}>
            Add Rental
          </button>
        </div>
      </div>
      {activeTab === 'rentals' ?
          <ViewRentals editRental={editRentalData} />
          : <ViewGroups editGroup={editGroupData} />}
    </>
  );
}
export default Rentals;
