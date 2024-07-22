## Deployment Link : https://punt-partners-fe.vercel.app/



# Text Translator Application - SASTRA FULLSTACK QUESTION 2

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Text Translator application allows users to translate text between various languages using a simple and intuitive interface. This app supports text-to-speech functionalities, enhancing user interaction and accessibility.

## Features

- Translate text between multiple languages.
- Text-to-speech to listen to both input and translated text.
- Clipboard copy functionality for both input and translated text.

## Technologies Used

- **Frontend:** React.js
- **State Management:** useState, useEffect
- **Speech Recognition:** react-speech-recognition
- **HTTP Requests:** Axios
- **CSS:** Custom styles
- **API:** LibreTranslate API for language translation

## Setup and Installation
clone the repository using git clone and install modules using npm i followed by npm run dev.  ( Vite not used )

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>=14.x)
- npm (>=6.x)


## Usage

1. **Select Source and Target Languages:**

    Choose the source language (from) and target language (to) from the dropdown menus.

2. **Input Text:**

    - **Manual Input:** Enter text in the input textarea.

3. **Translate Text:**

    Click the "Translate" button to get the translated text in the target language.

4. **Text-to-Speech:**

    Click the volume icon to listen to the input or translated text.

5. **Copy Text:**

    Click the copy icon to copy the text to the clipboard.


6. **Clear Text:**

    Click the "Clear Text" button to clear the translated text.

7. **Reset Text:**

    Click the "Reset Text" button to clear the input text and reset the speech recognition transcript.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.





