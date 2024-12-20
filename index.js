import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import { SpeechConfig, AudioConfig, SpeechSynthesizer } from "microsoft-cognitiveservices-speech-sdk";

const SPEECH_VOICE_NAME = process.env.SPEECH_VOICE_NAME ?? "en-US-BrandonMultilingualNeural";
const SPEECH_LANGUAGE = process.env.SPEECH_LANGUAGE ?? "en-US";
const __dirname = path.resolve();
function ingestVideoScriptFiles() {
  const directoryPath = path.join(__dirname, 'data');
  const files = fs.readdirSync(directoryPath);
  const txtFiles = files.filter(file => file.endsWith('.txt'));


  // return a map of file names, and their contents
  return txtFiles.map(filename => {
    const filePath = path.join(directoryPath,
      filename
    );
    const text = fs.readFileSync(filePath, 'utf8');
    return {
      filename,
      text
    }
  });
}

function processVideoScript({ filename, text }) {
  filename = filename.replace('.txt', '');
  console.log(`Processing: ${filename}`);

  const audioFile = `audio/${filename}.wav`;
  const speechConfig = SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
  const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);
  speechConfig.speechSynthesisVoiceName = SPEECH_VOICE_NAME;
  let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  const ssml = `
  <speak xml:lang="en-us" version="1.0" xmlns:mstts="https://www.w3.org/2001/mstts">
  <voice name="${SPEECH_VOICE_NAME}">
    <lang xml:lang="${SPEECH_LANGUAGE}">
      <p>${text}</p>
    </lang>
  </voice>
</speak>`;

  synthesizer.speakSsmlAsync(ssml,
    (result) => {
      if (result.privAudioData && result.privAudioDuration > 0) {
        console.log("Saving: " + audioFile);
      }
      else {
        console.log(result.privErrorDetails);
      }

      synthesizer.close();
      synthesizer = null;
    },
    (err) => {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    });
}


ingestVideoScriptFiles().forEach(processVideoScript);
