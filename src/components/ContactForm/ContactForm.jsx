import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const contacts = useSelector((state) => state.contacts.items);
  console.log("Contacts in state:", contacts);

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
      options.resetForm();
    }
  };

  const initialValues = {
    name: "",
    number: "",
  };
  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min 3 chars")
      .max(50, "Max 50 chars")
      .trim()
      .required(),
    number: Yup.string()
      .min(6, "Min 6 chars")
      .max(50, "Max 50 chars")
      .trim()
      .required(),
  });
  return (
    <Formik
      validationSchema={ContactFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.formBlock}>
        <label className={css.label}>
          <span className={css.labelText}>Name</span>
          <Field className={css.field} name="name"></Field>
          <ErrorMessage className={css.error} name="name" component="div" />
        </label>
        <label className={css.label}>
          <span className={css.labelText}>Number</span>
          <Field className={css.field} name="number"></Field>
          <ErrorMessage className={css.error} name="number" component="div" />
        </label>
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
