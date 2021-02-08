import React from 'react';

import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import ticketListStyle from './TicketList.module.scss';

import Ticket from '../Ticket/Ticket';

const TicketList = ({ tickets }) => {
  const convertPrice = (price) => {
    let newPrice = price.toString();

    if (+newPrice >= 100000) {
      newPrice = newPrice.split('');
      const firstHalfNewPrice = newPrice.splice(0, 3);
      newPrice = [...firstHalfNewPrice, ' ', ...newPrice];
      return newPrice.join('');
    }

    if (+newPrice >= 10000) {
      newPrice = newPrice.split('');
      const firstHalfNewPrice = newPrice.splice(0, 2);
      newPrice = [...firstHalfNewPrice, ' ', ...newPrice];
      return newPrice.join('');
    }

    return price;
  };

  const createTickets = tickets.map((el) => {
    const ticketInfo = {
      carier: el.carier,
      id: el.id,
      price: convertPrice(el.price),
      ticketToData: {
        toAndFrom: `${el.segments[0].origin} - ${el.segments[0].destination}`,
        date: el.segments[0].date,
        timeToFly: el.segments[0].duration,
        transfers: el.segments[0].stops,
      },
      ticketFromData: {
        toAndFrom: `${el.segments[1].origin} - ${el.segments[1].destination}`,
        date: el.segments[0].date,
        timeToFly: el.segments[1].duration,
        transfers: el.segments[1].stops,
      },
    };

    return (
      <Ticket
        carier={ticketInfo.carier}
        ticketToData={ticketInfo.ticketToData}
        ticketFromData={ticketInfo.ticketFromData}
        key={ticketInfo.id}
        price={ticketInfo.price}
      />
    );
  });

  return (
    <ul className={ticketListStyle['ticket-list']} type="none">
      <li className={ticketListStyle['ticket-list__item']}>
        {/* <Ticket/> */}
        {createTickets}
      </li>
    </ul>
  );
};

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStatesToProps = (state) => ({
  tickets: state.tickets,
});

export default connect(mapStatesToProps)(TicketList);
