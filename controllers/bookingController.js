import db from '../models/index.js';
const Booking = db.Booking;

export const createBooking = async (req, res) => {
  try {
    console.log(req.body); // ✅ Move this line inside the function

    const { userId, serviceId, date } = req.body;
    const newBooking = await Booking.create({ userId, serviceId, date });
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: db.User, attributes: ['id', 'name', 'email'] },
        { model: db.Service, attributes: ['id', 'name', 'category', 'price'] }
      ]
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
