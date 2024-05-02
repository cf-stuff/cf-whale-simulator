export const submitPaste = async (title, content) => {
  const body = {
    expiration: 1209600,
    description: `${title} (CF whale build, go to the 'other' tab to import)`,
    sections: [{
      name: title,
      syntax: "text",
      contents: content
    }]
  }
  const response = await fetch("https://api.paste.ee/v1/pastes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // I know this is bad but I'm lazy and we are a tight knit community. I trust you <3
      "X-Auth-Token": "uN4ydryNiOW1ciZDzLylufYY6KYDom7fXTI58fEG0"
    },
    body: JSON.stringify(body)
  });
  const json = await response.json();
  return json.link;
}
