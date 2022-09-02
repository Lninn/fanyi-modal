export function copyTextToClip(
  text?: string,
) {
  if (!text) return

  const input =
    document.createElement('textarea')
  input.innerHTML = text
  document.body.appendChild(input)
  input.select()
  const result =
    document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

export const playSound = (
  text?: string,
) => {
  if (!text) return

  const msg =
    new SpeechSynthesisUtterance()
  const voices =
    window.speechSynthesis.getVoices()
  msg.voice = voices[10]
  msg.volume = 1 // From 0 to 1
  msg.rate = 1 // From 0.1 to 10
  msg.pitch = 2 // From 0 to 2
  msg.text = text
  msg.lang = 'en'
  speechSynthesis.speak(msg)
}
