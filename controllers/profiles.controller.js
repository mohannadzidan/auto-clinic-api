const methods = require("../helpers/methods")
const { getProfile, registerProfile } = require('../db');
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<void>}
 */
exports.profile = (req, res) => {
    getProfile(req.params.id).then(profile => {
        if (profile)
            return res.status(200).send(profile);
        return res.status(404).send({ error: 'NOT_FOUND' });
    }).catch(err => {
        res.status(500).send({ error: 'INTERNAL_ERROR' });
        throw err;
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.profilePost = (req, res) => {
    getProfile(req.body.patentId).then(profile => {
        if (profile)
            return res.status(409).send({ error: 'ALREADY_EXISTS' });
        return registerProfile(req.body).then(d => res.status(201).send(d))
    }).catch(err => {
        res.status(500).send({ error: 'INTERNAL_ERROR' });
        throw err;
    })
}
