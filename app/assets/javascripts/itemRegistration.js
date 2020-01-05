$(function() {
  //アップロード画像枚数
  let top_image_num = 0;
  let bottom_image_num = 0;

  //アップロード画像の番号
  let top_image_index = 0;
  let bottom_image_index = 0;

  //アップロードした画像のプレビュー(top)
  $(document).on("change", ".imageUpField__hidden1", function(e){
    let file = e.target.files[0];
    let bolbUrl = window.URL.createObjectURL(file);
    let url = `<div class="preview" id="top_image_preview-${top_image_index}">
                  <img src=${bolbUrl}>
                  <div class="preview__buttons">
                    <div class="editBtnTop">編集</div>
                    <div class="deleteBtnTop">削除</div>
                  </div>
                </div>`;

    //画像UP処理(top)
    if(top_image_num < 4) {
      $(".previewField#pf1").append(url);
      top_image_num += 1;
      top_image_index += 1;
    }
    else if(top_image_num == 4) {
      $(".previewField#pf1").append(url);
      top_image_num += 1;
      top_image_index += 1;
      $("#images1").hide();
      $("#images2").show();
    }

    //file_fieldの追加(top)
    let fileFieldUrl =`<input multiple="multiple" name="images[image][]" class="imageUpField__hidden1" id="top_image_form-${top_image_index}" type="file">`;
    $(".imageUpField#iuf1").prepend(fileFieldUrl);
    $(".imageUpField#iuf1").children(":first").show();
    $(this).hide();
  })

  //画像の削除(top)
  $(document).on("click", ".deleteBtnTop", function(){
    if(top_image_num == 5 && bottom_image_num == 0) {
      $("#images1").show();
      $("#images2").hide();
    }

    if(top_image_num == 5 && bottom_image_num > 0) {
      $("#images1").show();
    }
      //プレビューとフォームを削除(top)
      let preview = $(this).parent().parent();
      let index = preview.attr("id").split("-")[1];
      $(`#top_image_form-${index}`).remove();
      preview.remove();
      top_image_num -= 1;
  })

  //アップロードした画像のプレビュー(bottom)
  $(document).on("change", ".imageUpField__hidden2", function(e){
    let file = e.target.files[0];
    let bolbUrl = window.URL.createObjectURL(file);
    let url = `<div class="preview" id="bottom_image_preview-${bottom_image_index}">
                  <img src=${bolbUrl}>
                  <div class="preview__buttons">
                    <div class="editBtnBottom">編集</div>
                    <div class="deleteBtnBottom">削除</div>
                  </div>
                </div>`;

    //画像UP処理(bottom)
    if(bottom_image_num < 4) {
      $(".previewField#pf2").append(url);
      bottom_image_num += 1;
      bottom_image_index += 1;
    }
    else if(bottom_image_num == 4) {
      $(".previewField#pf2").append(url);
      bottom_image_num += 1;
      bottom_image_index += 1;
      $("#images2").hide();
    }

    //file_fieldの追加(bottom)
    let fileFieldUrl =`<input multiple="multiple" name="images[image][]" class="imageUpField__hidden2" id="bottom_image_form-${bottom_image_index}" type="file">`;
    $(".imageUpField#iuf2").prepend(fileFieldUrl);
    $(".imageUpField#iuf2").children(":first").show();
    $(this).hide();
  })

  //画像の削除(bottom)
  $(document).on("click", ".deleteBtnBottom", function(){
    if(bottom_image_num == 5) {
      $("#images2").show();
    }
      //プレビューとフォームを削除(bottom)
      let preview = $(this).parent().parent();
      let index = preview.attr("id").split("-")[1];
      $(`#bottom_image_form-${index}`).remove();
      preview.remove();
      bottom_image_num -= 1;
  })
});

$(document).on('turbolinks:load', function() {
  //カテゴリ選択状態で遷移した場合
  if ($("#item_category_id").val()){
    $("#brand").show();
  }

  //カテゴリ選択時にブランドフォームを追加
  $("#item_category_id").on("change", function(){
    $("#brand").show();
  })

  //配送方法選択状態で遷移した場合
  if ($("#item_deliver_fee").val()){
    $("#how_to_deliver").show();
    console.log("発火");
  }

  //配送料の負担選択時に発送方法フォームを追加
   $("#item_deliver_fee").on("change", function(){
      let select = $(this).val();
      if (select == "送料込み(出品者負担)") {
        let url = `<option value="---">---</option>
                   <option value="未定">未定</option>
                   <option value="らくらくメルカリ便">らくらくメルカリ便</option>
                   <option value="ゆうメール">ゆうメール</option>
                   <option value="レターパック">レターパック</option>
                   <option value="普通郵便(定形、定形外)">普通郵便(定形、定形外)</option>
                   <option value="クロネコヤマト">クロネコヤマト</option>
                   <option value="ゆうパック">ゆうパック</option>
                   <option value="クリックポスト">クリックポスト</option>
                   <option value="ゆうパケット">ゆうパケット</option>`;
        $("#how_to_deliver").show();
        $("#item_how_to_deliver").empty();
        $("#item_how_to_deliver").append(url);
      }
      else if (select == "着払い(購入者負担)") {
        let url = `<option value="---">---</option>
                   <option value="未定">未定</option>
                   <option value="クロネコヤマト">クロネコヤマト</option>
                   <option value="ゆうパック">ゆうパック</option>
                   <option value="ゆうメール">ゆうメール</option>`;
        $("#how_to_deliver").show();
        $("#item_how_to_deliver").empty();
        $("#item_how_to_deliver").append(url);
      }
      else {
        $("#how_to_deliver").hide();
      }
   })

  // 販売手数料の表示
  $(".rightSmallForm__price").on("keyup", function(){
    let input = $(this).val();
    if (input > 300) {
      $(".rightSmallForm__commissionPrice").text(`¥${Math.floor(input * 0.1)}`);
    }
    else
      $(".rightSmallForm__commissionPrice").text("-");
  })
  // 販売利益の表示
  $(".rightSmallForm__price").on("keyup", function(){
    let input = $(this).val();
    if (input > 300) {
      $(".rightSmallForm__profitPrice").text(`¥ ${input - (Math.floor(input * 0.1))}`);
    }
    else
      $(".rightSmallForm__profitPrice").text("-");
  })
}); 