const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

// State variables
let userMessage = null;
let isResponseGenerating = false;

// API configuration
const API_URL = `#/api/chat`; 

// Load theme and chat data from local storage on page load
const loadDataFromLocalstorage = () => {
  const savedChats = localStorage.getItem("saved-chats");
  const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || '';
  document.body.classList.toggle("hide-header", savedChats);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
}

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(' ');
  let currentWordIndex = 0;

  const typingInterval = setInterval(() => {
    // Append each word to the text element with a space
    textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    // If all words are displayed
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  }, 75);
}

// Fetch response from the API based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text"); // Getting text element

  try {
    // Send a POST request to the API with the user's message
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: userMessage
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and remove asterisks from it
    const apiResponse = data.response;
    showTypingEffect(apiResponse, textElement, incomingMessageDiv); // Show typing effect
  } catch (error) { // Handle error
    isResponseGenerating = false;
    textElement.innerText = error.message;
    textElement.parentElement.closest(".message").classList.add("error");
  } finally {
    incomingMessageDiv.classList.remove("loading");
  }
}

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
  const html = `<div class="message-content">
                  <img class="avatar" src="images/ToroAI-Icon.png" alt="ToroAI Icon">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingMessageDiv);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  generateAPIResponse(incomingMessageDiv);
}

// Copy message text to the clipboard
const copyMessage = (copyButton) => {
  const messageText = copyButton.parentElement.querySelector(".text").innerText;

  navigator.clipboard.writeText(messageText);
  copyButton.innerText = "done"; // Show confirmation icon
  setTimeout(() => copyButton.innerText = "content_copy", 1000); // Revert icon after 1 second
}

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
  userMessage = typingInput.value.trim() || userMessage;
  if(!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating

  isResponseGenerating = true;

  const html = `<div class="message-content">
                  <img class="avatar" src="images/user.jpg" alt="User Icon">
                  <p class="text"></p>
                </div>`;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);
  
  typingForm.reset(); // Clear input field
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
}

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("saved-chats");
    loadDataFromLocalstorage();
  }
});

// Set userMessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

// Select the input field
const typingInput = typingForm.querySelector(".typing-input");

// Enable Shift + Enter functionality to add new lines
typingInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.shiftKey) {
      // Prevent the default behavior when Shift + Enter is pressed
      e.preventDefault(); // Ensure no default action (new window, form submit, etc.)
      // Allow new line to be added inside the input (default behavior of textarea/input)
      console.log(typingInput.value += "\n"); // Add newline explicitly
    } else {
      // If only Enter is pressed (without Shift), prevent default and submit the message
      e.preventDefault(); // Prevent the default form submission behavior
      handleOutgoingChat(); // Submit the message
    }
  }
});

// Prevent form submission and handle outgoing chat when Enter is pressed (without Shift)
typingInput.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission on Enter key (not needed anymore)
  handleOutgoingChat(); // Submit the message
});

// Ensure any previous chats and theme are loaded on page load
loadDataFromLocalstorage();
// fetchJiraDataFromSearch();
const fetchJiraDataFromSearch = async () => {
  const API_URL = "#/api/jira";
  const jqlQuery = "#";

  try {
      const response = await fetch(API_URL, {
          method: "POST",
          headers: { 
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ jql_query: jqlQuery })
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Fetched Jira Issues:");
          data.issues.forEach(issue => {
              console.log(`${issue.key}: ${issue.fields.summary}`);
          });
          return data;
      } else {
          console.error(`Failed to fetch data: ${response.status}`);
          const errorText = await response.text();
          console.error(errorText);
          return null;
      }
  } catch (error) {
      console.error("Error fetching Jira data:", error);
      return null;
  }
};

fetchJiraDataFromSearch();

const showJiraButton = document.getElementById("show-jira-button");
const jiraPanel = document.getElementById("jira-panel");
const closePanelButton = document.getElementById("close-panel-button");
const jiraIssuesList = document.getElementById("jira-issues-list");

// Fetch and display Jira issues
const fetchAndDisplayJiraIssues = async () => {
  jiraIssuesList.innerHTML = "<p>Loading...</p>"; // Show a loading message

  try {
    const data = await fetchJiraDataFromSearch(); // Call your existing function to fetch Jira issues

    // Check if the fetch was successful
    if (!data || !data.issues) {
      throw new Error("Unexpected API response structure."); // Explicitly handle invalid responses
    }

    // Clear the list
    jiraIssuesList.innerHTML = "";

    // Check if there are issues
    if (data.issues.length > 0) {
      // Add each issue to the list
      data.issues.forEach(issue => {
        const issueElement = document.createElement("div");
        issueElement.classList.add("jira-issue");
        issueElement.innerHTML = `
          <h4>${issue.key}</h4>
          <p>${issue.fields.summary}</p>
        `;
        jiraIssuesList.appendChild(issueElement);
      });
    } else {
      // No issues found
      jiraIssuesList.innerHTML = "<p>No ongoing incidents!</p>";
    }
  } catch (error) {
    // Handle API errors or invalid responses
    jiraIssuesList.innerHTML = `<p>Error fetching Jira issues: ${error.message}</p>`;
  }
};

// Show the panel and fetch Jira issues
showJiraButton.addEventListener("click", () => {
  jiraPanel.classList.add("visible"); // Slide the panel into view
  showJiraButton.style.display = "none"; // Hide the button
  fetchAndDisplayJiraIssues();
});

// Close the panel
closePanelButton.addEventListener("click", () => {
  jiraPanel.classList.remove("visible"); // Slide the panel out of view
  showJiraButton.style.display = "block"; // Show the button again
});
