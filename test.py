import os
import requests

conversation = []

def send_request(token, model, prompt):
    conversation.append({"role": "user", "content": prompt})
    
    response = requests.post(
        "https://openai-api.meetings.bio/api/openai/chat/completions",
        headers={"Authorization": f"Bearer {token}"},
        json={
            # # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
            "model": model,
            "messages": conversation,
        },
    )

    return response

if __name__ == "__main__":
    # Read the key from key.txt
    with open("key.txt", "r") as f:
        key = f.read().strip()
    
    prompt = "Explain this code"
    model = "gpt-3.5-turbo"
    token = key

    while True:
        prompt = input("You: ")
        response = send_request(token, model, prompt)
        if response.ok:
            print(response.json()["choices"][0]["message"]["content"])
            conversation.append({"role": "assistant", "content": response.json()["choices"][0]["message"]["content"]})
        else:
            print(response.json())
            break
