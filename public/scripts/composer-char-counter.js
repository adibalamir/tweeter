/*--CHARACTER COUNTER--*/
$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function() {
    let counter = $(".new-tweet .counter");
    let inputLength = (140 - $(".new-tweet textarea").val().length);
    counter.text(inputLength);
    counter.toggleClass("tweetLimit", (inputLength < 0));
  })
});
