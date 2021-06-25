import { AuditoriumSeat } from '../models/AuditoriumSeat';

export const formatToArray = (value) => {
  return Array.isArray(value) ? value : [value];
};

export const arrangeSeatsInNumericalOrder = (seats: AuditoriumSeat[]) => {
  return seats.sort(({ seatNumber: a }, { seatNumber: b }) => a - b);
};
