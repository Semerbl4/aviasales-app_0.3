import { nanoid } from 'nanoid';

export const all = () => ({ type: 'ALL' });

export const none = () => ({ type: 'NONE' });

export const one = () => ({ type: 'ONE' });

export const two = () => ({ type: 'TWO' });

export const three = () => ({ type: 'THREE' });

export const cheap = () => ({ type: 'CHEAP' });

export const notCheap = () => ({ type: 'NOT_CHEAP' });

export const setSearchId = (payload) => ({ type: 'SEARCH_ID', payload });

export const setTickets = (payload) => ({ type: 'TICKETS', payload });

export const getSearchId = () => async (dispatch) => {
  let resp = await fetch(`https://front-test.beta.aviasales.ru/search`);
  resp = await resp.json();
  dispatch(setSearchId(resp.searchId));
  return resp.searchId;
};

export const getTickets = (srchId) => async (disppatch) => {
  let resp = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${srchId}`);
  resp = await resp.json();
  const respWithIds = resp.tickets.map((el) => {
    // eslint-disable-next-line no-param-reassign
    el.id = nanoid();
    return el;
  });
  disppatch(setTickets(respWithIds));
};
