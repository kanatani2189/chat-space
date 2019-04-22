$(document).on('turbolinks:load', function(){
  function buildHTML(message){

      var html =       `<div class = "message">
                          <div class = "upper-info">
                            <div class = "upper-info_user">
                            ${message.user_name}
                            </div>
                            <div class = "upper-info_date">
                            ${message.date}
                            </div>
                          </div>
                          <div class = "lower-message">`
    
    if (message.content !== null){
     
      var content_html =  `<p class = "message_text">
                            ${message.content}
                           </p>`
      html = html + content_html
    }
    
    var img = message.image ? `<img src= ${ message.image }>` : "";
    if (message.image !== null){
      
      var image_html =    `<div class = "lower-message__image">
                            ${img}
                          </div>
                          </div>
                        </div>`
      html = html + image_html
    }                    
    
  
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
      $('.input-box_text').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.new-message_submit-btn').prop('disabled', false);
    })
  })
});