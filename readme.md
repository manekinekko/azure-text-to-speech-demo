## Azure AI Text-to-Speech (TTS)
This is a simple node.js example of how to use the Azure AI to convert text to speech.

https://github.com/user-attachments/assets/3ed3deb9-8f59-4934-ba02-f94e5f9cdf0b

### Prerequisites
- Node.js v20+
- Azure account. If you're new to Azure, get an Azure account for free at https://azure.com/free
- A ressource key from the [Azure Speech Portal](https://speech.microsoft.com/portal) (see https://learn.microsoft.com/azure/ai-services/speech-service/speech-studio-overview) 

### Ressource Key
Rename the `env.example` file to `.env` and fill in the required information. Use the ressource key from the Azure Speech Portal, and the region where your ressource is located:

```
SPEECH_KEY=
SPEECH_REGION=

# Optional
SPEECH_VOICE_NAME=
SPEECH_LANGUAGE=
```

#### Running the app
```bash
npm install
node index.js
```
