import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) => new Promise ((resolve, reject) => {
  const videourl = "https://www.youtube.com/shorts/" + videoID
  console.log("downloading: ", videoID)

  ytdl(videourl, { quality: "lowestaudio", filter: "audioonly" })
  .on(
    "info",
    (info) => {
      const segundos = info.formats[0].approxDurationMs / 1000

      if (segundos > 60) {
        throw new Error("Muito longo!")
    }
    
  })
  .on("end", () => {
    console.log("Downloaded")
    resolve()

  })
  .on("error", (error) => {
    console.log("Error" , error)
    reject(error)

  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
