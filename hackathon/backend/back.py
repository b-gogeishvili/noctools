from base64 import b64encode

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from requests.auth import HTTPBasicAuth
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential

app = Flask(__name__)
CORS(app)

ai_endpoint = "#"  # Your Azure AI endpoint
ai_key = "#"
chat_model_name = "#"

# Azure Cognitive Search Configuration
search_endpoint = "#"  # Azure Search endpoint
search_api_key = "#"  # Azure Search API key
search_index_name = "#"  # Azure Search index name

headers = {
    "Content-Type": "application/json",
    "api-key": ai_key,
}

# Initialize SearchClient
search_client = SearchClient(
    endpoint=search_endpoint,
    index_name=search_index_name,
    credential=AzureKeyCredential(search_api_key),
)

# In-memory conversation history
data_store = {}


@app.route("/api/chat", methods=["POST"])
def chat_with_ai():
    try:
        data = request.json
        user_id = data.get("user_id", "default")  # Identify user session
        prompt = data.get("prompt", "")

        # Retrieve conversation history for the user
        history = data_store.get(user_id, [])

        # Search the indexed data
        search_results = search_client.search(
            prompt,
            search_fields=['']  # Searching specific fields
        )

        # Process the search results (if any)
        search_content = ""
        for result in search_results:
            title = result.get("Title", "")
            description = result.get("Description", "")
            answer = result.get("Answer", "")
            severity = result.get("Severity", "")
            category = result.get("Category", "")
            tags = result.get("Tags", [])
            links = result.get("Links", {})
            error_codes = result.get("ErrorCode", [])
            created_on = result.get("CreatedOn", "")
            last_updated = result.get("LastUpdated", "")
            context = result.get("Context", "")
            splunk_query = result.get("SplunkQuery", [])

            # Constructing the search content with all relevant fields
            search_content += f"Title: {title}\n"
            search_content += f"Description: {description}\n"
            search_content += f"Answer: {answer}\n"
            search_content += f"Severity: {severity}\n"
            search_content += f"Category: {category}\n"
            search_content += f"Tags: {', '.join(tags)}\n"  # Assuming Tags is a list
            search_content += f"Links: {links}\n"
            search_content += f"ErrorCode: {', '.join(map(str, error_codes))}\n"  # Assuming ErrorCodes is a list
            search_content += f"CreatedOn: {created_on}\n"
            search_content += f"LastUpdated: {last_updated}\n"
            search_content += f"Context: {context}\n"
            search_content += f"SplunkQuery: {splunk_query}\n\n"

        # Prepare the payload for Azure OpenAI API
        payload = {
            "messages": [
                {"role": "system", "content": "You are an AI assistant."},
                *[{"role": "user", "content": message} for message in history],
                {"role": "user", "content": prompt},
                {"role": "system",
                 "content": f"Here is some relevant information from the search index, which is internal information and will help you in answering questions:\n{search_content}"},
            ]
        }

        # Send request to Azure OpenAI API
        response = requests.post(
            ai_endpoint,
            headers=headers,
            json=payload,
        )
        response.raise_for_status()  # Raise an error for non-200 status codes
        result = response.json()

        # Extract AI's response
        ai_response = result["choices"][0]["message"]["content"]

        # Update conversation history
        history.append(prompt)
        history.append(ai_response)
        data_store[user_id] = history

        return jsonify({"response": ai_response})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except Exception as ex:
        return jsonify({"error": "Unexpected error: " + str(ex)}), 500


@app.route("/api/reset", methods=["POST"])
def reset_history():
    try:
        data = request.json
        user_id = data.get("user_id", "default")
        data_store[user_id] = []  # Clear conversation history
        return jsonify({"message": "Conversation history reset."})
    except Exception as ex:
        return jsonify({"error": "Unexpected error: " + str(ex)}), 500

@app.route("/api/jira", methods=["POST"])
def fetch_jira_data():
    try:
        data = request.json
        jql_query = data.get("jql_query", "")
        email = "#" 
        jira_url = f"#"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Basic {b64encode(f'{email}:{api_token}'.encode()).decode()}"
        }

        response = requests.get(jira_url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except Exception as ex:
        return jsonify({"error": "Unexpected error: " + str(ex)}), 500


if __name__ == "__main__":
    app.run(debug=True)
