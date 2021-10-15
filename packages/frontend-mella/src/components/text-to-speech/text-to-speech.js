export const TextToSpeech = message => {
  var msg = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(msg);
};
