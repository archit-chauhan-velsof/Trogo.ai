import * as Yup from 'yup';
import { companyName_required, email_required, email_valid, firstName_required, lastName_required, password_minLength, password_required } from '../messages/messages';

export const loginSchema = Yup.object({
  email : Yup.string().email(email_valid).required(email_required),
  password: Yup.string().required(password_required).min(5,password_minLength)
})

export const registerSchema = Yup.object({
    email : Yup.string().email(email_valid).required(email_required),
    password : Yup.string().required(password_required).min(5,password_minLength),
    firstName : Yup.string().required(firstName_required),
    lastName : Yup.string().required(lastName_required),
    companyName : Yup.string().required(companyName_required)
})