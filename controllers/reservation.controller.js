const methods = require("../helpers/methods")
const { getReservation, makeReservation, reservations } = require('../db');
const { protocols } = require("../models/medical-protocols");

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
            return res.status(200).json(methods.successResponse(reservation));
        return res.status(404).json(methods.failResponse('NOT_FOUND'));
    }).catch(err => {
        res.status(500).json(methods.failResponse('INTERNAL_ERROR'));
        throw err;
    })
}
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<void>}
 */
exports.findReservationsByNationalID = (req, res) => {
    const { nationalId } = req.params;
    reservations.find({ nationalId: nationalId }, (err, documents) => {
        if (err) {
            return res.status(500).json(methods.failResponse('INTERNAL_ERROR'));
        }
        documents.forEach((doc) => {
            let matched = protocols[0];
            protocols.forEach(protocol => {
                if (doc[protocol.matcher] === undefined) console.error("couldn't match with " + protocol.matcher, protocol);
                if (doc[protocol.matcher] && protocol.priority > matched.priority){
                    matched = protocol;
                }
            });
            doc.protocol = {
                medications: matched.medications, 
                name: matched.name
            };
        });
        return res.status(200).json(methods.successResponse(documents));
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.reservationPost = (req, res) => {
    makeReservation(req.body)
        .then(d => res.status(201).json(methods.successResponse(d)))
        .catch(err => {
            res.status(500).json(methods.failResponse('INTERNAL_ERROR'));
        })
}
