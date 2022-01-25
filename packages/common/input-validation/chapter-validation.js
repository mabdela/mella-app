export default function Validation(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = 'Title field required';
  }
  if (!values.course_id.trim()) {
    errors.course_id = 'Course Id field required';
  }
  if (!values.articles_count.trim()) {
    errors.articles_count = 'Articles count field required';
  }

  return errors;
}
