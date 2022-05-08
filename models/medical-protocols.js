class MedicationProtocol {
    /**
     * 
     * @param {string} name 
     * @param {string} matcher 
     * @param {number} priority 
     * @param {string[]} medications 
     */
    constructor(name, matcher, priority, medications) {
        this.name = name;
        this.medications = medications;
        this.matcher = matcher;
        this.priority = priority;
    }
}
const protocols = [

    new MedicationProtocol('Daibetic Patent Covid Protocol', 'hasDiabetic', 1, [
        'vit C',
        'Ostriofort',
        'Calcium Tablet',
        'Dexomethzone Injection',
        'Oplex-Branshicuem',
        'Clexan',
        'Neubliar medication inhalation',
    ]),
    new MedicationProtocol('Hypertension Patent Covid Protocol', 'hasHypertension', 7, [
        'vit C',
        'vit B Complex',
        'vit E',
        'Coagulation medication (Clexan or Asprine Protect)',
        'ZiTfomicine 500mg',
        'Corthcostrioed',
    ]),
    new MedicationProtocol('Cancer Patent Covid Protocol', 'hasCancer', 9, [
        'ZiThrocon 250mg',
        'Seatraim Tablte 250mg',
        'PerFelgon 500mg',
    ]),
    new MedicationProtocol('Asthma Patent Covid Protocol', 'hasAsthma', 10, [
        'Neublar Inhalation medication',
        'avil',
        'NeuBlizar Medication',
        'Bronchospasm medication (3 times a day)',
        'Coorticosterored medication',
        'Bronchum - Oplex',
        'Ventoline'
    ]),
    new MedicationProtocol('Smoker Patent Covid Protocol', 'isSmoking', 2, [
        'vit E',
        'vit D',
        'Cogalatain medication tablet',
        'Inhalation Neublar with (gowa)',
    ]),
    new MedicationProtocol('Recurrent Patent Covid Protocol', 'isRecurrent', 0, [
        'Augmintie 1000mg',
        'I.v fluids',
        'vit C (triple a day)',
        'Inhalation medication',
        'Coagalation medication',
        'Aniemetic medication',
    ]),

]


module.exports.protocols = protocols;