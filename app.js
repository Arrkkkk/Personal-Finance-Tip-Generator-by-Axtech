let userApiKey = "";
let lastPrompt = '';

const apiForm = document.getElementById('apiForm');
const financeForm = document.getElementById('financeForm');
const outputDiv = document.getElementById('output');
const financeTips = document.getElementById('financeTips');

apiForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const apiKeyInput = document.getElementById('apiKey').value.trim();
  if (!apiKeyInput) {
    alert("Please enter your Gemini API key.");
    return;
  }
  userApiKey = apiKeyInput;
  apiForm.style.display = "none";
  document.getElementById('guideBtnDiv').style.display = "none";
  financeForm.style.display = "flex";
  document.getElementById('advancedOptions').style.display = 'block';
});

function parseGeminiMarkdown(text) {
  // Bold: **text**
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Numbered lists: 1. ... 2. ...
  html = html.replace(/\n(\d+)\. /g, '<br><br>$1. ');
  // Newlines to <br>
  html = html.replace(/\n/g, '<br>');
  return html;
}

financeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const goal = parseFloat(document.getElementById('goal').value);

  if (expenses > income) {
    alert('Warning: Your expenses exceed your income!');
  }
  if (goal > income) {
    alert('Warning: Your savings goal exceeds your income!');
  }

  financeTips.textContent = "Generating personalized advice...";
  outputDiv.style.display = "flex";

  const mindset = document.getElementById('mindset')?.value || "balanced";

  const prompt = `
You are a personal finance coach. User profile:
- Income: ₹${income}
- Expenses: ₹${expenses}
- Goal: ₹${goal}
- Mindset: ${mindset}

Based on this, give budgeting tips. Keep tone friendly, motivating, and practical.
`;

  lastPrompt = prompt;

  const response = await callGemini(prompt);
  financeTips.innerHTML = parseGeminiMarkdown(response);
});

async function callGemini(prompt) {
  if (!userApiKey) {
    return "❌ API key not set.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userApiKey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      return data.candidates[0].content.parts[0].text.trim();
    } else if (data.error && data.error.message) {
      return "❌ Gemini API error: " + data.error.message;
    } else {
      return "⚠️ No response from Gemini API.";
    }
  } catch (error) {
    return "❌ Request failed: " + error.message;
  }
}

function showGuide() {
  document.getElementById('guideModal').style.display = "flex";
}

function hideGuide() {
  document.getElementById('guideModal').style.display = "none";
}

function showPromptModal() {
  const modal = document.getElementById('promptModal');
  const content = document.getElementById('promptModalContent');
  content.textContent = lastPrompt;
  modal.style.display = 'flex';
}

function hidePromptModal() {
  document.getElementById('promptModal').style.display = 'none';
}

document.getElementById('togglePromptBtn').addEventListener('click', showPromptModal);
