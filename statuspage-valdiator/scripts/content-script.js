const incidentNameSelector = '#incident_name';
const createButtonSelector = '#AppView > div > div > div.css-h65kue-TabWrapper.e8bvney0 > div > div > div.css-zcp6ro-FormActions.e1j62ztw1 > button';

const interval = setInterval(() => {
  const createButton = document.querySelector(createButtonSelector);
  const incidentNameField = document.querySelector(incidentNameSelector);

  if (createButton && incidentNameField) {
    console.log("Found Create Button and Incident Name Field");
    console.log("Create Button:", createButton);
    console.log("Incident Name Field:", incidentNameField);

    clearInterval(interval);
    createButton.addEventListener('click', (event) => {
      console.log("clicked on create button");
      if (
        incidentNameField.value.includes("<>") ||
        incidentNameField.value.includes("<Subject_headline_here>") ||
        incidentNameField.value.isEmpty()
      ) {
        event.preventDefault();
        event.stopPropagation();
        alert("Please update the 'Incident Name' field before proceeding.");
      }
    });
  }
}, 500);
