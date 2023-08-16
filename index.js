const submitButton = document.getElementById("submit");
const clipboard = document.getElementById("box2");;
const showShortLink = document.getElementById("shortlink");
const copied = document.getElementById("copied");
let link = document.getElementById("link").value
let shortLink = "";

submitButton.addEventListener('click', () => {
  link = document.getElementById("link").value
  console.log(link)
  getLink()
})

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

async function getLink(event) {
  if (validateURL(link)) {
    try {
      //setting Access token to gain api access
      const accessToken = '0ea0643763937ad36ba4529ae180568143c5904e'
      const guid = 'Bn8gkuppZLC'
      //Setting request body to pass to header 
      const requestBody = {
        long_url: `${link.value}`,
        domain: "bit.ly",
        group_guid: `${guid}`
      };
      //calling api and setting header info
      const request = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
        //setting header method
        method: 'POST', 
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        //setting header body, parses the requestBody object to a string then sends
        body: JSON.stringify(requestBody)
      });
      if (request.ok) {
        const response = await request.json();
        console.log(response);
        const shortLink = response.link;
        console.log(shortLink);
        alert('hi');
        setShortLink(response);
      }
    } catch(e) {
      console.log(e);
    }
  } else {
    showShortLink.innerHTML = "Please enter a valid link!";
  }
}

let setShortLink = (obj) => {
  clipboard.style.backgroundColor = "rgb(210, 210, 210)";
  clipboard.onclick = copyToClipboard;
  shortLink = `${obj.link}`;
  showShortLink.innerHTML = `Your short link is: ${obj.link}`;
};
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shortLink);
    copied.style.visibility = "visible";
  } catch {
    console.error("Failed to copy: ", err);
  }
};
