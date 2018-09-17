$(function(){
  function buildHTML(message){
  var img = message.image ? `<img src=${message.image}>` : ""
  var html = ` <div class="message" data-message-id="${message.id}">
                  <div class="message__user-name">
                    ${ message.user_name }
                  </div>
                  <div class="message__time">
                    ${ message.created_at }
                  </div>
                  <div class="message__text">
                    ${ message.text }
                  <div>
                  <div class="message__image">
                    ${ img }
                  </div>
              </div>`

  return html;
  };
  function scroll(){
    $('.box').animate({scrollTop: $('.box')[0].scrollHeight},"fast");
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
  	  $('.box').append(html)
  	  $('.form__message').val("")
  	  $('.hidden').val('')
  	})
  	.fail(function(){
  	  alert('error');
  	})
    .always(function(){
      $(".submit").removeAttr("disabled");
     });
    scroll();
  });

    var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

    $.ajax({
      url: location.href,
      dataType: 'json'
    })
    .done(function(json) {
      var id = $('.message:last').data('messageId');
      var insertHTML ='';
      json.messages.forEach(function(message){
        if( message.id  > id ){
          insertHTML += buildHTML(message);
        }
      });
      $('.box').append(insertHTML);
    function scroll(){
      $('.box').animate({scrollTop: $('.box')[0].scrollHeight},"fast");
    }
    scroll();
    })
    .fail(function(json) {
      alert('error');
    });
  } else {
    clearInterval(interval);
   }}, 3 * 1000 );
});



