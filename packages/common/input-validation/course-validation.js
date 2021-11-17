export default function Validation(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = 'Title field required';
  }
  if (!values.translated_title.trim()) {
    errors.translated_title = 'Translated title field required';
  }
  if (!values.imgurl.trim()) {
    errors.imgurl = 'Image URL field required';
  }
  if (!values.article_count.trim()) {
    errors.article_count = 'Article Count field required';
  }

  return errors;
}
