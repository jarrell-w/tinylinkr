const submitButton = document.getElementById("submit");
const clipboard = document.getElementById("box2");
const link = document.getElementById("link");
const showShortLink = document.getElementById("shortlink");
const copied = document.getElementById("copied");
let shortLink = "";

const validateURL = (url) => {
  if (url.includes(".") && url.includes("https://")) {
    return true;
  } else if (url.includes(".") && url.includes("http://")) {
    return true;
  } else if (url.includes(".") && url.includes("www.")) {
    return true;
  } else if (
    url.includes(".") &&
    url.includes("https://") &&
    url.includes("www.")
  ) {
    return true;
  } else if (
    url.includes(".") &&
    url.includes("http://") &&
    url.includes("www.")
  ) {
    return true;
  } else if (url.includes(".")) {
    return true;
  } else {
    return false;
  }
};

async function getLink() {
  if (validateURL(link.value)) {
    try {
      const request = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${link.value}`
      );
      const response = await request.json();
      const data = response;
      setShortLink(data);
    } catch {
      console.log("Error getting Data.");
    }
  } else {
    showShortLink.innerHTML = "Please enter a valid link!";
  }
}

let setShortLink = (obj) => {
  clipboard.style.backgroundColor = "rgb(210, 210, 210)";
  clipboard.onclick = copyToClipboard;
  shortLink = `${obj.result["short_link"]}`;
  showShortLink.innerHTML = `Your short link is: ${obj.result["short_link"]}`;
};
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shortLink);
    copied.style.visibility = "visible";
  } catch {
    console.error("Failed to copy: ", err);
  }
};
submitButton.onclick = getLink;
