$(function(){

  var searchList = $('#user-search-result');
  var groupList = $('#chat-group-users');
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name="${ user.name }">追加</a>
                </div>`

    searchList.append(html);
  }

  function appendAddUser(userId, userName){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${ userId }>
                  <p class='chat-group-user__name'>${ userName }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

    groupList.append(html);
  }

  function appendNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ "一致するユーザーはいません" }</p>
                  <p class="user-search-add chat-group-user__btn chat-group-user__btn--add"></p>
                </div>`

    searchList.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      data: { keyword: input},
      dataType:'json',
      url: '/users'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });

    $(document).on('click','.chat-group-user__btn--add',function(){
      var userId = $(this).attr('data-user-id')
      var userName = $(this).attr('data-user-name')
      appendAddUser(userId, userName)
      $(this).parent().remove();
    });

    $(document).on('click','.chat-group-user__btn--remove',function(){
      $(this).parent().remove();
    });
  });
});
