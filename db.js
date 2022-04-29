
const Datastore = require('nedb')
const reservations = process.env.TESTING ? new Datastore() : new Datastore({ filename: './.nedb/reservations.db' });
reservations.loadDatabase(function (err) {
    if (err) console.error('Failed to load profiles database!', err);
});

class PatientProfile {

    constructor(name, birthDate, gender, phoneNumber, address, hasHypertension, hasDiabetes, hasObesity, hasAllergies, hasCancer, isSmoker) {
        this._id = undefined;
        this.nationalId = nationalId;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.hasHypertension = hasHypertension;
        this.hasDiabetes = hasDiabetes;
        this.hasObesity = hasObesity;
        this.hasAllergies = hasAllergies;
        this.hasCancer = hasCancer;
        this.isSmoker = isSmoker;
    }

}


/**
 * 
 * @param {PatientProfile} reservation 
 */
function makeReservation(reservation) {
    return new Promise((resolve, reject) => {
        reservations.insert(reservation, (err, newDoc) => {
            if (err) return reject(err);
            resolve(newDoc);
        });
    });
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<PatientProfile>}
 */
function getReservation(id) {
    return new Promise((resolve, reject) => {
        reservations.findOne({ _id: id }, (err, doc) => {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
}


exports.reservations = reservations;
exports.makeReservation = makeReservation;
exports.getReservation = getReservation;

