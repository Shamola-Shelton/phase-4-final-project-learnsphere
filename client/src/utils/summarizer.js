// Simple summarizer utility (Option 2 - smarter than plain cut)
export default function summarizeText(text) {
  if (!text) return "";

  // Split into sentences
  const sentences = text.split(".").map((s) => s.trim()).filter(Boolean);

  if (sentences.length <= 2) {
    return text; // short notes, just return as is
  }

  // Pick first, middle, and last sentence
  const first = sentences[0];
  const middle = sentences[Math.floor(sentences.length / 2)];
  const last = sentences[sentences.length - 1];

  return `${first}. ${middle}. ${last}.`;
}
