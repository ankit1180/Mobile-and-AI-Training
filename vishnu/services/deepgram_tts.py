import requests

DEEPGRAM_API_KEY = "a54c418d58768b002222a22f42f5a1eaabef051d"

def text_to_speech(text, output_file, lang="en"):
    url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"

    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {"text": text}

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(response.text)

    with open(output_file, "wb") as f:
        f.write(response.content)
