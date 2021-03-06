import React from 'react';
import StyledButton from "../common/StyledButton";
import { reduxForm } from 'redux-form'
import {NavLink, Route, Switch} from 'react-router-dom';
import {
  getFormValues,
  isValid
} from 'redux-form'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

const getContactFormValues = getFormValues('contact')
const isContactFormValid = isValid('contact')

const Contacts = ({match}) => {
  return <div>
    <h2>Contactez-nous</h2>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/address`}>Adresse</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/form`}>Formulaire</NavLink>
      </li>
    </ul>
    <Switch>
      <Route path={`${match.url}/address`} component={Address}/>
      <Route path={`${match.url}/form`} component={ContactFormReduxConnected}/>
    </Switch>
  </div>
}

const Address = () => {
  return <div className="p-3">
    <h2>Adresse</h2>
    <h4>Québec</h4>
    725, boulevard Lebourgneuf, bureau 525
    <br/><br/>
    Québec (Québec) G2J 0C4
    <br/><br/>
    Tél. : 418 650-2866
  </div>
}

class ContactForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    if (this.props.isValid)
      alert("Envois du formulaire")
  }
  render () {
    const {pristine, submitting, isValid, dirty } = this.props
    return <div className="p-3">
      <h2>Formulaire de contact</h2>
      <div className="form">
        <label>Nom</label>
        <Field name="name" component={renderTextField}/>
        <label>Message</label>
        <Field name="message"  component={renderTextArea}/>
        <br/>
        <StyledButton buttonText="Envoyer" icon="icon-rocket" actionOnClick={this.handleSubmit} disabled={!isValid || pristine || submitting}/>
      </div>
    </div>
  }
}

const renderTextField = (field) => (
  <div>
    {field.meta.touched && field.meta.error &&
    <div className="text-danger">{field.meta.error}</div>}
    <input {...field.input} type="text"/>

  </div>
)

const renderTextArea = (field) => (
  <div>
    {field.meta.touched && field.meta.error &&
    <div className="text-danger">{field.meta.error}</div>}
    <textarea {...field.input} />

  </div>
)


const validateContact = contact => {
  const error = {}
  if(!contact.name || contact.name.length === 0) {
    error.name = 'Le nom est requis'
  }
  if(!contact.message || contact.message.length === 0) {
    error.message = 'Le message est requis'
  }
  return error
}

const ContactFormRedux = reduxForm({
  form: 'contact',
  validate: validateContact
})(ContactForm)

const mapStateToProps = (state) => {
  return {
    formValues: getContactFormValues(state),
    isValid: isContactFormValid(state)
  }
}
const ContactFormReduxConnected = connect(mapStateToProps, null)(ContactFormRedux)

export default Contacts