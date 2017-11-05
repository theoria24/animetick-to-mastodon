// ==UserScript==
// @name         Animetick to Mastodon
// @namespace    https://theoria24.github.io/
// @version      0.1
// @description  視聴したアニメをAnimetickからMastodonに投稿
// @author       theoria
// @match        http://animetick.net/
// @license      The Unlicense
// @grant        none
// ==/UserScript==

var INSTANCE = "mstdn.jp";

(function() {
  'use strict';

  $(".detail > .button_block").each(function(i, elem) {
    var id = $(elem).parent().children(".ticket_title").attr('id');
    var ary = id.split('_');
    $(elem).append('<div class="twitter"><input id="mastodon_' + ary[1] + '_' + ary[2] + '" class="twitter mastodon" type="checkbox" value="mastodon" title="Mastodon に投稿" checked><label for="mastodon_' + ary[1] + '_' + ary[2] + '" title="Mastodon に投稿"><img class="twitter_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACI0lEQVR4AWJwL/CB49BVq5gN2gGtlAOMHUEYxzcN60a17e75LmlQ27ZtBbUXtW0GRVDb1pvZ2rat6fef3k1mz9rkn/fx98Ze9Uo2m2DafHMli+03LXaB7DsQbMSQQw1q0aMzlGFO4WWjG0UKdQe9PmDI5Kt5TIu/QEFqVMnmL4Oca3kVkKayWC+oueCGsPc9FYuOvRBtV99RcdiIIYcavQcMsKLXjb2JSTRdfku8//pbxHx//goxYvtDCLb6UNNk2S0NyN+BZYS4rJj+T3uuvZcN915/FytOvZK/b7/8krobE3vzXdbsvvreN8qgqby4QfMP14MP3v6QxV033JV+ixW31aiar/g/om4b7kn//psfPmDFqV6EETQ1EKUH39BI8DVcclP64dM9BYSNGHL4UBtrc8KNYPtqZGLAsGkKCDtxoMvNdAUGTfMKGUFuoGJiwCBS/cU3IdgJAy32N2Tc+UxGBftK/sSAPiUCpKv4VJ5DUPXiOgtvyNGEul5CQORQg1p9Q2arm0IX/hWCqRX17yw7jmfRrh7fHafQYt8Th/DfpHNktzXGiQy+xyHI4gNiN2BtKzhXSgU5XjWCd6TmnlJ2oGVFm1cOsc9nlxBdasqzLuXAXfRDWR/kUiplBDmsQ5wpW9ypaPGqpuOVqGAFiuKIYYS4XUkCIZpSZ9r+D0m/f2xUokBd2C2MluBzaIQHqfkWXmXyr9DvVvIHl58SyJUQ8B8GJq8u1oDD9gAAAABJRU5ErkJggg=="></label></div>');
  });

  $('.ticket_watch').on('click', function() {
    if ($(this).not('.enable')) {
      var cia = $(this).attr('id').split('_');
      var cid = "#mastodon_" + cia[2] + "_" + cia[3] + ":checked";
      var title = $("#anime_" + cia[2] + "_" + cia[3] + " > .title > .title").text();
      var subtitle = $("#anime_" + cia[2] + "_" + cia[3]).next().children("a").children(".sub_title").text();
      if ($(cid).val()) {
        window.open("https://" + INSTANCE + "/share?text=" + encodeURI(title + " ＃" + cia[3] + "「" + subtitle + "」を見ました http://animetick.net/ticket/" + cia[2] + "/" + cia[3]));
      }
    }
  });
})();
