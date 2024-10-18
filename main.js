const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

generateText.addEventListener("click", async()=>{
  const userInput = document.getElementById("userInput");
  const resultText = document.getElementById("resultText");
  if (userInput.value==null) {
    alert("Please enter some text!!");
    return;
  }
  resultText.innerText = "Being generated...";
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput.value }],
        max_tokens: 1000,
      }),
    });
    const dataOutput = await response.json();
    // console.log(response, dataOutput);
    // console.log("----total tokens-----",dataOutput.usage.total_tokens);
    resultText.innerText = dataOutput.choices[0].message.content;
  } catch (error) {
      console.error("Error occurred ", error);
      resultText.innerText = "Error while generating given text.";
  }
});