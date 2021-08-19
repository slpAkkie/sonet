import ApiReq from '../modules/apiReq.js'
import FieldRow from '../modules/field-row.js'
import Token from '../modules/token.js'
import q from '../modules/queryLight.js'

q('.auth__form').on('submit', tryLogin)

const loginLoader = q('#login-loader')



function tryLogin(evt) {
  evt.preventDefault()
  FieldRow.clearAllErrors()

  loginLoader.dataset.shown = true
  ApiReq.send('login', 'post', <BodyInit>q(this).formData()).then(handleResponse)
}

function handleResponse(response) {
  delete loginLoader.dataset.shown

  if (response.error) loginFailed(response.error)
  else loginSuccess(response.data)
}

function loginFailed(error) {
  error.code === 422 && Object.keys(error.errors).forEach(key => FieldRow.setError(key, error.errors[key]))
}

function loginSuccess(data) {
  Token.set(data.token)
  location.href = '/home.html'
}
