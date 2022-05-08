
(function () {
    "use strict";
    const enqueryFormElement = document.getElementById("enquery-form");
    const createElementFromHTML = function (htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstElementChild;
    }

    enqueryFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {};
        for (var [key, value] of new FormData(event.target).entries()) {
            formData[key] = value;
        }
        console.log(formData)
        fetch('/api/reservations:lookup/' + formData.nationalId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            return res.json()
        }).then(json => {
            if (json.status) {
                /**
                 * @type {[]}
                 */
                const reservations = json.payload;
                if(reservations.length == 0 ){
                    document.getElementById('no-reservations-card').classList.remove('d-none')
                    return;
                }
                enqueryFormElement.classList.add('d-none');
                document.getElementById('logs-section').classList.remove('d-none');
                const medListElement = document.getElementById('medications-list');
                const noteElement = document.getElementById('note');
                const reservationTimesContainer = document.getElementById('reservation-times');
                reservationTimesContainer.innerHTML = '';
                const timeCards = [];
                reservations.forEach(reservation => {
                    const {protocol} = reservation;
                   
                    const card = createElementFromHTML(`<div class="p-3 reservation-time"></div>`);
                    timeCards.push(card);
                    languageManager.addLanguageChangeListener(() => {
                        const date = new Date(reservation.date).toLocaleDateString(document.querySelector('html').lang, {
                            hour12: true,
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        card.innerText = date;
                    });
                    card.selectCard = () =>{
                        timeCards.forEach(c => c.classList.remove('active'))
                        card.classList.add('active');
                        const note = reservation.protocol.note;
                        if(typeof note === 'string' && note.trim().length > 0){
                            noteElement.innerText =note;
                        }else{
                            noteElement.innerText = languageManager.getLocaleText('no-notes-paragraph');
                        }
                        medListElement.innerHTML = '';
                        protocol.medications.forEach(med => {
                            medListElement.appendChild(createElementFromHTML(`<li>${med}</li>`))
                        });
                        document.getElementById('protocol-name').innerText = protocol.name;
                        
                    }
                    card.addEventListener('click', card.selectCard);
                    reservationTimesContainer.appendChild(card);

                });
                timeCards[0].selectCard();

            } else {

                const localeError = languageManager.getLocaleText(json.message);
                console.error(json);
                error.show(localeError ? localeError : json.message);
            }
        }).catch(console.error);

    });

})()