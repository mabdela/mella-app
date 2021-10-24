export default function Validation(values) {
  let errors = {};

  if (!values.choiceA) {
    errors.choiceA = 'Choice A field required';
  }
  if (!values.choiceB) {
    errors.choiceB = 'Choice B field required';
  }
  if (!values.choiceC) {
    errors.choiceC = 'Choice C field required';
  }
  if (!values.choiceD) {
    errors.choiceD = 'Choice D field required';
  }
  if (!values.explanation) {
    errors.explanation = 'Explanation field required';
  }

  return errors;
}
