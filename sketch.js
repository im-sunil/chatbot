window.addEventListener("load", (event) => {
 
  document.getElementById("app").addEventListener("click", function() {
    let speech = new p5.Speech();
    let speechRec = new p5.SpeechRec("en-US", gotSpeech);
    let continuous = true;
    let interim = false;
    speechRec.start(continuous, interim);

    let bot = new RiveScript();
    bot
      .loadFile("brain.rive")
      .then(brainReady)
      .catch(brainError);

    function brainReady() {
      console.log("Chatbot ready!");
      bot.sortReplies();
    }

    function brainError() {
      console.log("Chatbot error!");
    }
    function gotSpeech() {
      if (speechRec.resultValue) {
        let input = speechRec.resultString;

        let reply = bot
          .reply("local-user", input)
          .then((r) => {
            speech.speak(r);
          })
          .catch((e) => {
            console.log("e", e);
          });
      }
    }
  });
});
