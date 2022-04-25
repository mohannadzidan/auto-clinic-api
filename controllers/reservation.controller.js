const methods = require("../helpers/methods")
const { getReservation, makeReservation, reservations } = require('../db');

const WORKING_HOURS = Number.parseInt(process.env.END_HOUR) - Number.parseInt(process.env.START_HOUR);
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<void>}
 */
exports.reservation = (req, res) => {
    getReservation(req.params.id).then(reservation => {
        if (reservation)
            return res.status(200).send(methods.successResponse(reservation));
        return res.status(404).send(methods.failResponse('NOT_FOUND'));
    }).catch(err => {
        res.status(500).send(methods.failResponse('INTERNAL_ERROR'));
        throw err;
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.reservationPost = (req, res) => {
    makeReservation(req.body).then(d => res.status(201).send(methods.successResponse(d))).catch(err => {
        res.status(500).send(methods.failResponse('INTERNAL_ERROR'));
        throw err;
    })
}
