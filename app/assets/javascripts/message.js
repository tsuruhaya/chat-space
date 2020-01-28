$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-massages">
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
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="main-massages">
          <div class="main-massages__upper-info">
            <p class="main-massages__upper-info__taker">
              ${message.user_name}
            </p>
            <p class="main-massages__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <p class="main-massages__test">
            <p class="main-massages__test">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
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
  })
})
});