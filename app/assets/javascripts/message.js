$(function(){
  function buildHTML(message){
    var image = message.image ?`<img class= "main-massages__image" src= "${message.image}">`:"";
      var html =
       `<div class="main-massages" data-message-id="${message.id}">
          <div class="main-massages__upper-info">
            <p class="main-massages__upper-info__taker">
              ${message.user_name}
            </p>
            <p class="main-massages__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <p class="main-massages__test">
            <p class="main-massage__test">
              ${message.body}
            </p>
          </p>
          ${image}
        </div>`
      return html;
  }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-massage-list').append(html);
    $('.main-massage-list').animate({ scrollTop: $('.main-massage-list')[0].scrollHeight});
    $('.submit-btn').attr('disabled', false);
    $('form')[0].reset();
  })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
    $('.submit-btn').attr('disabled', false);
  });
})
  
  var reloadMessages = function() {
    last_message_id = $('.main-massages:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-massage-list').append(insertHTML);
      $('.main-massage-list').animate({ scrollTop: $('.main-massage-list')[0].scrollHeight});
    } 
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});