// ==UserScript==
// @name         Animetick to Mastodon
// @namespace    https://github.com/theoria24/animetick-to-mastodon
// @version      1.1.1
// @description  視聴したアニメをAnimetickからMastodonに投稿
// @author       theoria
// @match        http://animetick.net/
// @match        http://animetick.net/anime/*
// @match        http://animetick.net/ticket/*
// @license      The Unlicense
// @grant        none
// ==/UserScript==

// チェックボックスHTML
function mastodon_checkbox_html(anime_id, episode_num) {
  return '<div class="twitter"><input id="mastodon_' + anime_id + '_' + episode_num + '" class="twitter mastodon" type="checkbox" value="mastodon" title="Mastodon に投稿" checked><label for="mastodon_' + anime_id + '_' + episode_num + '" title="Mastodon に投稿"><img class="twitter_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACI0lEQVR4AWJwL/CB49BVq5gN2gGtlAOMHUEYxzcN60a17e75LmlQ27ZtBbUXtW0GRVDb1pvZ2rat6fef3k1mz9rkn/fx98Ze9Uo2m2DafHMli+03LXaB7DsQbMSQQw1q0aMzlGFO4WWjG0UKdQe9PmDI5Kt5TIu/QEFqVMnmL4Oca3kVkKayWC+oueCGsPc9FYuOvRBtV99RcdiIIYcavQcMsKLXjb2JSTRdfku8//pbxHx//goxYvtDCLb6UNNk2S0NyN+BZYS4rJj+T3uuvZcN915/FytOvZK/b7/8krobE3vzXdbsvvreN8qgqby4QfMP14MP3v6QxV033JV+ixW31aiar/g/om4b7kn//psfPmDFqV6EETQ1EKUH39BI8DVcclP64dM9BYSNGHL4UBtrc8KNYPtqZGLAsGkKCDtxoMvNdAUGTfMKGUFuoGJiwCBS/cU3IdgJAy32N2Tc+UxGBftK/sSAPiUCpKv4VJ5DUPXiOgtvyNGEul5CQORQg1p9Q2arm0IX/hWCqRX17yw7jmfRrh7fHafQYt8Th/DfpHNktzXGiQy+xyHI4gNiN2BtKzhXSgU5XjWCd6TmnlJ2oGVFm1cOsc9nlxBdasqzLuXAXfRDWR/kUiplBDmsQ5wpW9ypaPGqpuOVqGAFiuKIYYS4XUkCIZpSZ9r+D0m/f2xUokBd2C2MluBzaIQHqfkWXmXyr9DvVvIHl58SyJUQ8B8GJq8u1oDD9gAAAABJRU5ErkJggg=="></label></div>';
}

// 投稿画面URL
function mastodon_share_url(anime_id, episode_num, title, subtitle, hashtag) {
  return "web+mastodon://share?text=" + encodeURIComponent(title + " ＃" + episode_num + "「" + subtitle + "」を見ました http://animetick.net/ticket/" + anime_id + "/" + episode_num + " " + hashtag);
}

(function() {
  'use strict';

  // トップページ、ticketページの埋め込み
  $(".detail > .button_block").each(function(i, elem) {
    if ($(elem).parent().children(".ticket_title").length) {
      var id = $(elem).parent().children(".ticket_title").attr('id');
      var ary = id.split('_');
      $(elem).append(mastodon_checkbox_html(ary[1], ary[2]));
    }
  });

  // 詳細ページの埋め込み
  $(".episode").each(function(i, elem) {
    if ($(elem).children(".twitter_episode").children(".twitter").length) {
      var id = $(elem).children(".twitter_episode").children(".twitter").attr('id');
      var ary = id.split('_');
      $(elem).append(mastodon_checkbox_html(ary[1], ary[2]));
    }
  });

  // トップページ、ticketページのWatchアクション
  $('.ticket_watch').on('click', function() {
    if ($(this).not('.enable').length) {
      var cia = $(this).attr('id').split('_');
      var cid = "#mastodon_" + cia[2] + "_" + cia[3] + ":checked";
      var title = $("#anime_" + cia[2] + "_" + cia[3] + " > .title > .title").text();
      var subtitle = $("#anime_" + cia[2] + "_" + cia[3]).next().children("a").children(".sub_title").text();
      if ($(cid).val()) {
        var url = "http://animetick.net/anime/" + cia[2];
        $.ajax(url, {async: false, success: function(data){
            var hashtag = $.trim($(data).find(".hashtag").text());
            window.open(mastodon_share_url(cia[2], cia[3], title, subtitle, hashtag));
          }
        });
      }
    }
  });

  // 詳細ページのWatchアクション
  $('.episode_watch').on('click', function() {
    if ($(this).not('.enable').length) {
      var cia = $(this).attr('id').split('_');
      var cid = "#mastodon_" + cia[2] + "_" + cia[3] + ":checked";
      var title = $("h2").text();
      var hashtag = $.trim($(".hashtag").text());
      var subtitle = $(this).siblings(".sub_title").children("a").text().replace(/^#[0-9]+\s/, '');
      if ($(cid).val()) {
        window.open(mastodon_share_url(cia[2], cia[3], title, subtitle, hashtag));
      }
    }
  });

  // リスト追加表示への埋め込み
  (new MutationObserver(function (MutationRecords, MutationObserver) {
    $('.detail > .twitter').each(function(i, elem) {
      if ($(elem).parent().children('.twitter').length==1) {
        var id = $(elem).children(".twitter").attr('id');
        var ary = id.split('_');
        $(elem).parent().append(mastodon_checkbox_html(ary[1], ary[2]));
      }
    });
  })).observe($('#ticket_list').get(0), {
    childList: true,
  });
})();
