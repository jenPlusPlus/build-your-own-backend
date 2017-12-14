/* eslint-disable */
// /* eslint no-plusplus: 0 */
// /* eslint no-console: 0 */

const displayToken = (token) => {
  $('#token-container').append(`<p>Your token is <span id='token'>${token}</span></p>`);
};

const displayError = (inputValue) => {
  $('#error-message-container')
    .append('<div id="error-message">' +
      '<div id="close-button">x</div>' +
      '<p id="error-text">' +
      `The ${inputValue} is missing. Please enter it and submit the form again.` +
      '</p></div>');
  $('#close-button').on('click', () => {
    $('#error-message').remove();
  });
};

const validateInput = (inputValues) => {
  const inputs = Object.keys(inputValues);

  for (let iter = 0; iter < inputs.length; iter++) {
    if (inputValues[inputs[iter]] === '') {
      displayError(inputs[iter]);
      return false;
    }
  }
  return true;
};

const requestToken = (event) => {
  event.preventDefault();
  const email = $('#email').val();
  const name = $('#app-name').val();
  const valid = validateInput({ email, name });

  if (valid) {
    fetch('/api/v1/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line
      body: { email: email, appName: name },
    }).then(response => response.json())
      .then(parsedResponse => displayToken(parsedResponse.token))
      .catch(error => console.error({ error }));
  }

  $('#email').val('');
  $('#app-name').val('');
};

$('#submit-button').on('click', (event) => {
  $('#error-message').remove();
  requestToken(event);
});
