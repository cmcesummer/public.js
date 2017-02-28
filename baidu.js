<script>
	bds.ready(function(){
		var initScrollTop   = $(window).scrollTop(),
		bottomScrollTop = $(document).height() - $(window).height(),	/*//滑动条移动到底部时的scrollTop值*/
			hintToprqShow   = 0;										/*	//toprq出现状态*/
		var $dom_head = $('#head'),
			$dom_left = $('#content_left'),
			$dom_hintToprqTips = $('.hint_toprq_tips'),
			$dom_headBlock = $('<div>',{'class':'headBlock'}),
			$dom_leftBlock = $('<div>',{'class':'leftBlock'});

		$dom_hintToprqTips.appendTo($dom_headBlock);
		$dom_headBlock.hide().appendTo($dom_head);

		/*// swap_begin时清除事件&DOM*/
		$(window).one('swap_begin', function(){
			$(window).off('scroll', scrollEvent);
			hideHeadHint();
			$dom_headBlock.remove();
			$dom_leftBlock.detach();
		});

		/*// 绑定scroll事件*/
		$(window).on('scroll', scrollEvent);

		/*//绑定结果click事件,避让点击后推荐*/
		$(document).on('click','.t>a,.op-se-listen-recommend',function(){
			hideHeadHint();
			$dom_leftBlock.hide();
		});

		function scrollEvent(){
			var nowScrollTop = $(window).scrollTop(),
				headHeight = 90 + $('.res_top_banner').outerHeight() + $('#con-at').outerHeight() + $('.res_top_banner_for_win').outerHeight() + ($('.hint_common_restop').length ? 29 : 0);
			if (nowScrollTop <= headHeight || nowScrollTop > bottomScrollTop) {
				hideHeadHint();
				initScrollTop = nowScrollTop;
			} else if (nowScrollTop > initScrollTop) {
				hideHeadHint();
				initScrollTop = nowScrollTop;
			} else if (nowScrollTop < initScrollTop - 50) {
				showHeadHint();
				initScrollTop = nowScrollTop;
			};
		}

		function showHeadHint(){
			if (!hintToprqShow) {
				$dom_hintToprqTips.show();
				$dom_headBlock.slideDown(200,function(){
					var nowScrollTop = $(window).scrollTop();
					if (nowScrollTop <= 90+$('.res_top_banner').outerHeight() + $('#con-at').outerHeight() + ($('.hint_common_restop').length ? 29 : 0) || nowScrollTop > bottomScrollTop) {
						hideHeadHint();
					}
				});
				sendNSC();
				showLeftHint();
				$dom_leftBlock.show();
				hintToprqShow = 1;
				/* 出顶部提示的时候隐藏点击后推荐 */
				$('.result, .result-op').find('.c-recommend').hide();
			};
		}

		function hideHeadHint(){
			if (hintToprqShow) {
				$dom_headBlock.hide();
				hintToprqShow = 0;
			};
		}

		function showLeftHint(){
			$dom_hintToprqTips.clone().prependTo($dom_leftBlock);
			$dom_leftBlock.prependTo($dom_left);
			showLeftHint = function(){};
		}

		function sendNSC(){
			ns_c({
		        'fm'       : 'behs',
		        'qid'	   : bds.comm.qid,
		        'rsv_disp' : 1
		    });
		    sendNSC = function(){};
		}

	});
</script>

<script>
	!function(document, window){
		var log = {
			list: [],
			host: 'https://' + location.host + '/api/httpscheck',
			log: function(param) {
				var a = [];
		    	for(var k in param) {
		    		a.push(k + '=' + param[k]);
		    	}
		    	var msg = a.join('&');
		    	if(~this.list.indexOf(msg)){
		    		return;
		    	}
		    	this.list.push(msg);
		  		var img = new Image();
		    	var key = '_ik_log_' + (Math.random()*2147483648 ^ 0).toString(36);
		    	window[key] = img;
		    		img.onload = img.onerror = img.onabort = function() {
		        		img.onload = img.onerror = img.onabort = null;
		        		window[key] = null;
			    		img = null;
		    	};
		  		img.src = this.host + '?' + msg;
			}
		};

		function HTTPSWarningLog(){
			this.selector = [
				'link',
				'script',
				'img',
				'embed',
				'iframe'
			];
			this.warningCounter = 0;
			this.init();
		};

		HTTPSWarningLog.prototype = {
			init: function(){
				this.fetch();
			},

			fetch: function(){
				for(var tags = this.selector, i =0, len = tags.length; i < len;i++) {
					this.getTag(tags[i]);
				}
			},

			getTag: function(tag) {
				var domList = document.getElementsByTagName(tag);
				if(!domList.length) {
					return;
				}
				for(var i = 0,len = domList.length;i<len;i++) {
					var el = domList[i];
					var url = el.getAttribute(el.tagName==='LINK' ? 'href' : 'src');
                    if(el.getAttribute('rel') === 'canonical') {
                        continue;
                    }
					if(url && 'https:' === location.protocol && !url.indexOf('http:')){
						this.sendLog(el, el.tagName.toLowerCase(),url);
						this.warningCounter++;
					}
				}
			},
			
			sendLog: function(el, type, url){
				log.log({
					url: location.href,
					wtype: type,
					wurl: url
				});
			}
		};

		function domReady(fn){
		    if(document.addEventListener) {
		        document.addEventListener('DOMContentLoaded', function() {
		            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
		            fn();
		        }, false);
		    }else if(document.attachEvent) {
		        document.attachEvent('onreadystatechange', function() {
		            if(document.readyState == 'complete') {
		                document.detachEvent('onreadystatechange', arguments.callee);
		                fn();
		            }
		        });
		    }
		};

		domReady(function(){
			new HTTPSWarningLog();
			for(var i=1; i<6; i++) {
				!function(i){
					setTimeout(function(){
						new HTTPSWarningLog();
					}, i*i*i*1000);
				}(i);
			}
		});
	}(document, window);
</script>