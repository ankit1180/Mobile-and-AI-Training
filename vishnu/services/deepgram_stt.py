import requests

DEEPGRAM_API_KEY = "a54c418d58768b002222a22f42f5a1eaabef051d"
DEEPGRAM_STT_URL = "https://api.deepgram.com/v1/listen"

def speech_to_text(audio_path):
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "audio/wav"
    }

    params = {
        "model": "nova-2",
        "language": "en"
    }

    with open(audio_path, "rb") as audio:
        response = requests.post(
            DEEPGRAM_STT_URL,
            headers=headers,
            params=params,
            data=audio
        )

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()

    try:
        return result["results"]["channels"][0]["alternatives"][0]["transcript"]
    except (KeyError, IndexError):
        return ""
