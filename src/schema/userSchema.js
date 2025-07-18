import * as Yup from "yup";
import {
  companyName_required,
  email_required,
  email_valid,
  firstName_required,
  lastName_required,
} from "../messages/messages";

export const userSchema = Yup.object({
  email: Yup.string().email(email_valid).required(email_required),
  firstName: Yup.string().required(firstName_required),
  lastName: Yup.string().required(lastName_required),
  companyName: Yup.string().required(companyName_required),
});
