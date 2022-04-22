
const Datastore = require('nedb')
const profiles = process.env.TESTING ? new Datastore() : new Datastore({ filename: './.nedb/profiles.db' });
const symptomsForms = process.env.TESTING ? new Datastore() : new Datastore({ filename: './.nedb/symptoms.db' });
profiles.loadDatabase(function (err) {
    if (err) console.error('Failed to load profiles database!', err);
});

symptomsForms.loadDatabase(function (err) {
    if (err) console.error('Failed to load symptoms forms database!', err);
});

class PatientProfile {

    static GENDER = {
        MALE: 1,
        FEMALE: 0
    }

    constructor(patentId, name, birthDate, gender, phoneNumber, address, hasHypertension, hasDiabetes, hasObesity, hasAllergies, hasCancer, isSmoker) {
        this._id = undefined;
        this.patentId = patentId;
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


class SymptomsForm {
    constructor(patentId, hasCough, hasFever, hasDiarrhea) {
        this._id = undefined;
        this.patentId = patentId;
        this.hasCough = hasCough;
        this.hasFever = hasFever;
        this.hasDiarrhea = hasDiarrhea;
    }
}

/**
 * 
 * @param {PatientProfile} profile 
 */
function registerProfile(profile) {
    return new Promise((resolve, reject) => {
        profiles.insert(profile, (err, newDoc) => {
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
function getProfile(id) {
    return new Promise((resolve, reject) => {
        profiles.findOne({ patentId: id }, (err, doc) => {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
}

/**
 * 
 * @param {SymptomsForm} symptomsForm  
 * @returns {Promise<SymptomsForm>}
 */
function registerSymptomsForm(symptomsForm) {
    return getProfile(symptomsForm.patentId) // make sure that the profile exist
        .then(doc => {
            return new Promise((resolve, reject) => {
                symptomsForms.insert(symptomsForm, (err, newDoc) => {
                    if (err) return reject(err);
                    resolve(newDoc);
                });
            });
        });
}

/**
 * 
 * @param {string} formId 
 * @returns {Promise<SymptomsForm>}
 */
function getSymptomsForm(formId) {
    return new Promise((resolve, reject) => {
        symptomsForms.findOne({ id: formId }, (err, doc) => {
            if (err) return reject(err);
            return resolve(doc);
        });
    });
}

exports.registerProfile = registerProfile;
exports.getProfile = getProfile;
exports.registerSymptomsForm = registerSymptomsForm;
exports.getSymptomsForm = getSymptomsForm;

