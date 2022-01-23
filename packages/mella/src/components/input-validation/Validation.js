export default function Validation(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = 'First name required';
  }
  if (!values.lastname.trim()) {
    errors.lastname = 'Last name required';
  }
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm password is required';
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
}
