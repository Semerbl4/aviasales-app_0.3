import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import appStyle from './App.module.scss';

import * as actions from '../../actions';

import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';
import Filters from '../Filters/Filters';

import logo from '../../img/Logo.svg';

const App = ({ getSearchId, getTickets }) => {
  useEffect(() => {
    getSearchId().then((res) => {
      getTickets(res);
    });
  }, [getSearchId, getTickets]);

  return (
    <div className={appStyle.container}>
      <header>
        <img className="logo" src={logo} alt="Авиасэйлс лого" />
      </header>
      <main>
        <Filters />
        <section className={appStyle['tickets-info']}>
          <Tabs />
          <TicketList />
          <TicketList />
        </section>
      </main>
    </div>
  );
};

App.propTypes = {
  getSearchId: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const { getSearchId, getTickets } = bindActionCreators(actions, dispatch);
  return { getSearchId, getTickets };
};

export default connect(null, mapDispatchToProps)(App);
