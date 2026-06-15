<p align="center">
  <img src="assets/Images/icon.png" alt="NemoAI Logo" width="120" height="120" />
</p>

<h1 align="center">NemoAI</h1>

<p align="center">
  <strong>On-device AI chat — private, offline, always available.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue" />
  <img src="https://img.shields.io/badge/model-LFM2--700M-green" />
  <img src="https://img.shields.io/badge/size-425MB_Q4__0-orange" />
  <img src="https://img.shields.io/badge/licence-MIT-lightgrey" />
</p>

<p align="center">
  <img src="" alt="NemoAI Chat Demo" width="300" />
  <img src="" alt="NemoAI Settings Panel" width="300" />
</p>

---

## Why NemoAI?

Most AI chat apps send every message to a cloud server. **NemoAI runs a full language model directly on your device** — no internet required, no data leaves your phone.

- **100% offline** — chat on airplanes, in tunnels, anywhere
- **Zero data collection** — nothing is sent to any server
- **Instant responses** — no network latency, no rate limits
- **Open source** — inspect, modify, and self-host everything

---

## Features

### On-Device LLM Inference

Runs **LFM2-700M** (Liquid Foundation Models, 700M parameters, Q4\_0 quantized) locally using `llama.rn` — a React Native binding for llama.cpp. The model is bundled inside the app and ready on first launch.

<p align="center">
  <img src="" alt="On-device inference" width="300" />
</p>

### Real-Time Chat Interface

- Full conversational UI with message history
- User messages in amber/orange bubbles, AI responses in blue
- **Markdown rendering** for formatted code blocks, lists, and emphasis
- Auto-scroll to the latest message

<p align="center">
  <img src="" alt="Chat interface" width="300" />
</p>

### Configurable Inference Parameters

Fine-tune model behavior in the settings panel:

| Parameter       | Default | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| Context Length   | 2048    | Max context window (`n_ctx`)                    |
| Top K            | 40      | Limits sampling to top K tokens                 |
| Top P            | 0.95    | Nucleus sampling threshold                      |
| Temperature      | 0.7     | Controls randomness of responses               |

Changing context length triggers an automatic model reload.

<p align="center">
  <img src="" alt="Settings panel" width="300" />
</p>

### Gradient UI & Glass Effects

- Radial gradient "Nemo AI" header with SVG mask
- Decorative glow orbs with Gaussian blur filters
- Frosted glass header and input bar (`BlurView`)
- Geist Mono custom font throughout
- Smooth linear gradient background

### Model Loading States

- **Loading** — shows "Loading LFM2-700M model..." while initializing
- **Error** — displays errors in-line with a red indicator
- **Ready** — enables the input bar and starts accepting messages

<p align="center">
  <img src="" alt="Loading state" width="300" />
</p>

### Hugging Face Cloud API (Optional)

A separate Express.js server (`hf_api_server.js`) lets you ask questions about local files using **Mistral-7B-Instruct-v0.2** via the Hugging Face Inference API.

```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"filePath": "./notes.txt", "question": "Summarize this file"}'
```

> This is an optional companion server — the core chat app requires zero cloud connectivity.

---

## Tech Stack

| Category              | Technology                                                                 |
| --------------------- | -------------------------------------------------------------------------- |
| Framework             | [React Native](https://reactnative.dev/) via [Expo SDK 54](https://expo.dev/) |
| Language              | JavaScript (JSX)                                                           |
| On-Device LLM Engine  | [`llama.rn`](https://github.com/InterestingDark/llama.rn) (llama.cpp binding) |
| On-Device Model       | LFM2-700M — Q4\_0 quantized, ~425 MB GGUF                                 |
| Cloud LLM             | Mistral-7B-Instruct-v0.2 (via Hugging Face Inference API)                  |
| Backend (Optional)    | Express.js 5                                                                |
| UI                    | expo-linear-gradient · expo-blur · react-native-svg · MaskedView            |
| Markdown              | react-native-markdown-display                                              |
| Font                  | Geist Mono (`@expo-google-fonts/geist-mono`)                               |
| File System           | expo-file-system                                                            |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS builds) or Android Studio

### Install

```bash
git clone https://github.com/<your-username>/NemoAI.git
cd NemoAI
npm install
```

### Run the App

```bash
# Start Expo dev server
npm start

# Run on iOS (requires native build for on-device inference)
npx expo prebuild
npx expo run:ios

# Run on Android
npx expo run:android

# Run on web
npm run web
```

> **Important:** On-device inference requires a **native build** (`npx expo prebuild && npx expo run:ios`). The Expo Go client does not support native modules like `llama.rn`.

### Copy Model to iOS Simulator (Alternative)

If you already have the app installed on a simulator, you can copy the model directly:

```bash
./copy-model-ios.sh com.anonymous.NemoAI
```

### Set Up the Hugging Face API Server (Optional)

```bash
cp .env.example .env
# Edit .env and add your HF_TOKEN from https://huggingface.co/settings/tokens
node hf_api_server.js
```

---

## Project Structure

```
NemoAI/
├── App.jsx                    # Main app — chat UI + on-device LLM inference
├── index.jsx                  # Expo entry point
├── app.json                   # Expo config (plugins, icons, splash)
├── hf_api_server.js           # Optional Express server for cloud-based HF inference
├── simulate_ai.js             # Standalone Node.js inference module
├── copy-model-ios.sh          # Script to copy model to iOS simulator
├── plugins/
│   └── withModelAsset.js      # Expo config plugin — bundles GGUF into iOS app
├── models/
│   └── LFM2-700M-Q4_0.gguf   # Quantized LLM model (~425 MB)
├── assets/
│   ├── fonts/                 # Custom fonts
│   └── Images/                # App icons & splash screens
└── .env.example               # Environment variable template
```

---

## Configuration

### Environment Variables

| Variable  | Default | Description                                       |
| --------- | ------- | ------------------------------------------------- |
| `HF_TOKEN` | —      | Hugging Face API token (only for the companion server) |
| `PORT`     | 3000    | Port for the Hugging Face API server               |

### Inference Parameters

All parameters are adjustable at runtime via the in-app settings panel. See the [Configurable Inference Parameters](#configurable-inference-parameters) table above.

---

## Roadmap

- [ ] **Upload** — attach files and images as context for the model
- [ ] **Voice** — speech-to-text input
- [ ] **Video** — multimodal input support
- [ ] **Android optimization** — tune performance for Android devices
- [ ] **Model swapping** — download and switch between multiple GGUF models

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                   App.jsx                    │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Chat UI │  │ Settings │  │ Model Init  │ │
│  │ (React  │  │ Panel    │  │ (llama.rn)  │ │
│  │ Native) │  │          │  │             │ │
│  └────┬────┘  └────┬─────┘  └──────┬──────┘ │
│       │            │               │        │
│       └────────────┴───────────────┘        │
│                    │                        │
│         ┌──────────▼──────────┐             │
│         │  LFM2-700M-Q4_0.gguf│             │
│         │  (bundled on-device) │             │
│         └──────────────────────┘             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           hf_api_server.js (optional)       │
│                                             │
│  POST /api/ask                              │
│    ├── Read local file                      │
│    ├── Send to Mistral-7B via HF API        │
│    └── Return AI-generated answer           │
└─────────────────────────────────────────────┘
```

---

## License

MIT

---

<p align="center">
  Built with ❤️ and <a href="https://llama.cpp">llama.cpp</a>
</p>