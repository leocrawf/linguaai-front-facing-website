var RECAPTCHA_SITE_KEY = '6LdZYL4sAAAAAPjYYkjU3W5v4h1ZeL_mURCwB_Of';
var CONVEX_DELETE_URL = 'https://adventurous-mouse-422.convex.site/delete-account';

document.getElementById('delete-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var email = document.getElementById('email').value.trim().toLowerCase();
  var submitBtn = document.getElementById('submit-btn');
  var messageEl = document.getElementById('form-message');

  if (!email) {
    messageEl.textContent = 'Please enter a valid email address.';
    messageEl.className = 'form-message error';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting\u2026';
  messageEl.textContent = '';
  messageEl.className = 'form-message';

  grecaptcha.ready(function () {
    grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'delete_account' }).then(function (token) {
      return fetch(CONVEX_DELETE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, recaptchaToken: token }),
      });
    }).then(function (response) {
      if (response.ok) {
        messageEl.textContent = 'Your deletion request has been received. Your account and all associated data will be permanently deleted within 30 days.';
        messageEl.className = 'form-message success';
        submitBtn.textContent = 'Request Submitted';
        document.getElementById('email').value = '';
      } else {
        return response.json().then(function (data) {
          throw new Error(data.message || 'Something went wrong. Please try again.');
        });
      }
    }).catch(function (err) {
      messageEl.textContent = err.message || 'Something went wrong. Please try again.';
      messageEl.className = 'form-message error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Account Deletion';
    });
  });
});
