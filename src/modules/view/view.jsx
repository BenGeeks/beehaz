import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from './Components/Sidebar/SideBar';
import styles2 from './Components/Sidebar/sidebar.module.css';
import UserSettings from './Components/UserSetting/UserSettings';
import GeneralSettings from './Components/Settings/Settings';
import TopBar from './Components/TopBar/TopBar';
import ChannelManagement from './Components/Channel/ChannelManagement';
import Rates from './Components/Rates/Rates';
import Rentals from './Components/Rentals/Rentals';
import Calendar from './Components/Calendar/Calendar';
import Guest from './Components/Guest/Guests';
import Inquiry from './Components/Inquiry/Inquiry';
import Invoice from './Components/Invoice/Invoices';
import {useDispatch} from 'react-redux';
import { loadWorld } from '../../general_redux/actions';

const View = (props) =>  {
    const routes = [
      {path: 'calendar', component: Calendar},
      {path: 'userSetting', component: UserSettings},
      {path: 'rates', component: Rates},
      {path: 'rentals', component: Rentals},
      {path: 'guest', component: Guest},
      {path: 'inquiry', component: Inquiry},
      {path: 'invoice', component: Invoice},
      {path: 'settings', component: GeneralSettings},
      {path: 'channel', component:ChannelManagement}
    ]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadWorld());
    }, [dispatch])
    return (
      <div style={{height:'100vh'}}>
        <TopBar />
        <Container fluid>
          <Row >
            <div className={`${styles2.sidebar_wrapper} d-none d-md-none d-lg-block p-0`}>
              <Sidebar />
            </div>
            <Col
              className={`${styles2.page_content_wrapper} p-lg-0 p-lg-0`}
            >
              <Redirect to="/view/calendar" />
              {routes && routes.map((r) => <Route
                path={`${props.match.path}/${r.path}`}
                exact
                component={r.component}
              />)}
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default View;
