/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //escape function to prevent maliciousness
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  /*---tweet template---*/
  function createTweetElement(tweet) {
    let $html = `
    <article id="user-tweets">
      <header>
        <img class="avatar" src="${escape(tweet.user.avatars.small)}"></img>
        <h2>${escape(tweet.user.name)}</h2>
        <p class="thandle">${escape(tweet.user.handle)}</p>
      </header>
      <article>${escape(tweet.content.text)}</article>
      <footer>
        <p>${escape(tweet.created_at)}</p>
        <img class="tweet-options" src="images/heart-icon.png">
        <img class="tweet-options" src="images/reblog-icon.png">
        <img class="tweet-options" src="/images/flag-icon.png">
      </footer>
    </article>
    `
    $('#tweets-container').prepend($html);
  }


  /*---POSTS new tweets into database and updates the page using loadtweets()---*/
  $(".new-tweet form").on("submit", function (event) {
    event.preventDefault();
    $(this).siblings(".error").empty();
    if ($(".new-tweet textarea").val() === '') {
      $("main .new-tweet .error").append("<p>Entry Required.</p>");
    } else if (($(".new-tweet textarea").val().length) > 140) {
      $("main .new-tweet .error").append("<p>Too many characters.</p>");
    } else {
      $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(this).serialize()
      }).done(function () {
        $(".new-tweet textarea").val('');
        $(".counter").text('140');
        loadTweets();
      });
    }
  });

  /*---Iterates over created tweets---*/
  function renderTweets(data) {
    data.forEach((entry) => {
      createTweetElement(entry)
    });
  };
  /*---Loads tweets onto main page---*/
  function loadTweets() {
    $.ajax({
        url: '/tweets',
        type: 'GET'
    }).then(function (jsonContent) {
      // $("body").append("<pre></pre>");
      // $("pre").html(JSON.stringify(jsonContent));
      renderTweets(jsonContent);
    });
  }
  loadTweets();

  /*---COMPOSE TWEET FUNCTIONALITY---*/
  $("#compose").click(function() {
    $("main .new-tweet").slideToggle("fast", function() {
    $("main .new-tweet textarea").select();
  });
});
});