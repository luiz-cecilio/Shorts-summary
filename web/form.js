import {server} from "./server.js";

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async(event) => {
  event.preventDefault();
  content.classList.add("placeholder")

  const videourl = input.value
  
  console.log("URL DO VÍDEO: " + videourl)

  if(!videourl.includes("shorts")) {
    return content.textContent = "Esse vídeo não é um short..."

  }

  const [_, params] = videourl.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  content.textContent = "Obtendo o texto do vídeo..."

  const transcription = await server.get("/summary/" + videoID)


  const summary = await server.post("/summary" , {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
