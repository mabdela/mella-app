export default function UpdateValidation(values) {
  let errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Current Password is required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Your new password field is required';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Password needs to be 6 characters or more';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}
