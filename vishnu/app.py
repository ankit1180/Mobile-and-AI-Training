import streamlit as st
import sounddevice as sd
from scipy.io.wavfile import write

from services.deepgram_stt import speech_to_text
from services.translator import translate_text
from services.deepgram_tts import text_to_speech

INPUT_AUDIO = "audio/input.wav"
OUTPUT_AUDIO = "audio/output.wav"

LANGUAGES = {
    "Hindi": "hi",
    "Tamil": "ta",
    "Telugu": "te",
    "Kannada": "kn",
    "Marathi": "mr",
    "Gujarati": "gu",
    "Bengali": "bn",
    "Punjabi": "pa",
    "Malayalam": "ml",
    "Odia": "or",
    "Urdu": "ur",
    "English": "en" 
}

st.title("🎤 Voice Translator (Task 3)")

target_lang = st.selectbox("Select Output Language", list(LANGUAGES.keys()))

if st.button("🎙️ Record & Translate"):
    fs = 16000
    duration = 5

    st.info("Recording...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()
    write(INPUT_AUDIO, fs, audio)

    st.info("Converting speech to text...")
    text = speech_to_text(INPUT_AUDIO)
    st.success(f"Detected Text: {text}")

    translated_text = translate_text(text, LANGUAGES[target_lang])
    st.success(f"Translated Text: {translated_text}")

    st.info("Generating translated speech...")
    text_to_speech(translated_text, OUTPUT_AUDIO)

    st.audio(OUTPUT_AUDIO)
