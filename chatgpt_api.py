import requests

def send_single_request(token, model, prompt):
    # conversation.append({"role": "user", "content": prompt})
    response = requests.post(
        "https://openai-api.meetings.bio/api/openai/chat/completions",
        headers={"Authorization": f"Bearer {token}"},
        json={
            # # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
        },
    )

    return response

def send_request(token, model, prompt, conversation):
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

    if response.ok:
        conversation.append({"role": "assistant", "content": response.json()["choices"][0]["message"]["content"]})

    return response.json()['choices'][0]['message']['content'], conversation