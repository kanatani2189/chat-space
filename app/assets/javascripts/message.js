$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content? `${message.content}` :"";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =       `<div data-id= ${ message.id } class="message">
                        <div class = "upper-info">
                          <div class = "upper-info_user">
                          ${message.user_name}
                          </div>
                          <div class = "upper-info_date">
                          ${message.date}
                          </div>
                        </div>
                        <div class = "lower-message">     
                        <p class = "message_text">
                          ${content}
                        </p>
                        <div class = "lower-message__image">
                          ${img}
                        </div>
                        </div>
                      </div>`
  return html; 
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    //ここでフォームのsubmitイベントを中止
    var formData = new FormData(this);
    //formdataオブジェクトとして、フォームに入力した値を習得
    var url = $(this).attr('action')  
    //ajaxでリクエストを送る際のパス習得      
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    //非同期通信の結果として返ってくるデータの受取
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.input-box_text').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.new-message_submit-btn').prop('disabled', false);
    })
  })
  // 自動更新
  var interval = setInterval(function() {
    var last_message = $('.message').last().data('id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: "GET",
        data: { id: last_message },
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message) {
          $('.messages').append(buildHTML(message));
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      })
    } else {
      clearInterval(interval);
    }
  } , 5000 );
});



