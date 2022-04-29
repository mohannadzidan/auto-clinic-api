
/**
* Template Name: Arsha - v4.7.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";
  const root = document.getElementById('root');

  const header = document.getElementById('header');
  const progressBarSection = document.getElementById('progress-bar-section');
  window.addEventListener('load', () => {
    progressBarSection.style.top = header.offsetHeight + 'px';
    const observer = new IntersectionObserver(
      ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
      { threshold: [1], rootMargin: -header.offsetHeight - 5 + 'px 0px 0px 0px' }
    );
    observer.observe(progressBarSection);
  });

  const progressBar = new StepsProgressBar(document.getElementById("progress-bar"));
  languageManager.addLanguageChangeListener((pack) => {
    progressBar.setDirection(pack.dir);
  });

  progressBar.goto(0);



  const ErrorCard = function (element) {

    const scrollTo = () => {
      let header = document.querySelector('#header');
      let offset = header.offsetHeight;
      let elementPos = element.offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }

    this.dismiss = () => {
      element.style.display = 'none'
    }

    this.show = (msg) => {
      if (!msg) return;
      element.querySelector('.card-text').innerText = msg;
      element.style.display = 'block';

      scrollTo();
    }

  }
  const error = new ErrorCard(document.getElementById('error-card'));
  Array.from(document.querySelectorAll("#registration-form input")).forEach(input => input.addEventListener('change', error.dismiss));
  // limit date/time picker
  const registrationFormElement = document.getElementById("registration-form");
  const reservationConfirmationContainerElement = document.getElementById("reservation-confirmation-container");
  const appointmentTimeElement = document.getElementById("appointment-time");
  const reservationCodeElement = document.getElementById("reservation-code");

  (function () {
    let today = new Date();
    const DD = today.getDate().toString().padStart(2, '0');
    const HH = today.getHours().toString().padStart(2, '0');
    const mm = today.getMinutes().toString().padStart(2, '0');
    const MM = (today.getMonth() + 1).toString().padStart(2, '0');
    const YYYY = today.getFullYear();
    today = YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + mm + ':' + '00';
    const datePicker = document.querySelector('#registration-form input[type="datetime-local"')
    datePicker.setAttribute("min", today)
  })();


  registrationFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {};
    const formData = new FormData(event.target);
    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }
    const [year, month, day] = data.birthDate.split('-');
    data.birthDate = new Date(year, month, day).toISOString();
    /**
     * GET: Retrieve data
     * POST: Send resource
     * 
    */
    fetch('/api/reservations', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json()
    }).then(json => {
      if (json.status) {
        progressBar.goto(1);
        console.log(json);
        var qrcode = new QRCode(document.getElementById("reservation-qrcode"), {
          text: json.payload._id,
          width: 180,
          height: 180,
          colorDark: "#37517e",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
        reservationCodeElement.innerText = json.payload._id;
        reservationConfirmationContainerElement.classList.remove('d-none');
        registrationFormElement.classList.add('d-none');
        const appointmentDate = new Date(json.payload.date)
          .toLocaleDateString(document.querySelector('html').lang, {
            hour12: true,
            minute: 'numeric',
            hour: 'numeric',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        appointmentTimeElement.innerText = appointmentDate;
        console.log(json);
      } else {
        const localeError = languageManager.getLocaleText(json.message);
        console.error(json);
        error.show(localeError ? localeError : json.message);
      }
    }).catch(console.error);

  });

})()