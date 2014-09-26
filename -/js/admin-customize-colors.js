/*! Color.js - v0.9.11 - 2013-08-09
* https://github.com/Automattic/Color.js
* Copyright (c) 2013 Matt Wiebe; Licensed GPLv2 */
!function(a,b){var c=function(a,b){return this instanceof c?this._init(a,b):new c(a,b)};c.fn=c.prototype={_color:0,_alpha:1,error:!1,_hsl:{h:0,s:0,l:0},_hsv:{h:0,s:0,v:0},_hSpace:"hsl",_init:function(a){var c="noop";switch(typeof a){case"object":return a.a!==b&&this.a(a.a),c=a.r!==b?"fromRgb":a.l!==b?"fromHsl":a.v!==b?"fromHsv":c,this[c](a);case"string":return this.fromCSS(a);case"number":return this.fromInt(parseInt(a,10))}return this},_error:function(){return this.error=!0,this},clone:function(){for(var a=new c(this.toInt()),b=["_alpha","_hSpace","_hsl","_hsv","error"],d=b.length-1;d>=0;d--)a[b[d]]=this[b[d]];return a},setHSpace:function(a){return this._hSpace="hsv"===a?a:"hsl",this},noop:function(){return this},fromCSS:function(a){var b,c=/^(rgb|hs(l|v))a?\(/;if(this.error=!1,a=a.replace(/^\s+/,"").replace(/\s+$/,"").replace(/;$/,""),a.match(c)&&a.match(/\)$/)){if(b=a.replace(/(\s|%)/g,"").replace(c,"").replace(/,?\);?$/,"").split(","),b.length<3)return this._error();if(4===b.length&&(this.a(parseFloat(b.pop())),this.error))return this;for(var d=b.length-1;d>=0;d--)if(b[d]=parseInt(b[d],10),isNaN(b[d]))return this._error();return a.match(/^rgb/)?this.fromRgb({r:b[0],g:b[1],b:b[2]}):a.match(/^hsv/)?this.fromHsv({h:b[0],s:b[1],v:b[2]}):this.fromHsl({h:b[0],s:b[1],l:b[2]})}return this.fromHex(a)},fromRgb:function(a,c){return"object"!=typeof a||a.r===b||a.g===b||a.b===b?this._error():(this.error=!1,this.fromInt(parseInt((a.r<<16)+(a.g<<8)+a.b,10),c))},fromHex:function(a){return a=a.replace(/^#/,"").replace(/^0x/,""),3===a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),this.error=!/^[0-9A-F]{6}$/i.test(a),this.fromInt(parseInt(a,16))},fromHsl:function(a){var c,d,e,f,g,h,i,j;return"object"!=typeof a||a.h===b||a.s===b||a.l===b?this._error():(this._hsl=a,this._hSpace="hsl",h=a.h/360,i=a.s/100,j=a.l/100,0===i?c=d=e=j:(f=.5>j?j*(1+i):j+i-j*i,g=2*j-f,c=this.hue2rgb(g,f,h+1/3),d=this.hue2rgb(g,f,h),e=this.hue2rgb(g,f,h-1/3)),this.fromRgb({r:255*c,g:255*d,b:255*e},!0))},fromHsv:function(a){var c,d,e,f,g,h,i,j,k,l,m;if("object"!=typeof a||a.h===b||a.s===b||a.v===b)return this._error();switch(this._hsv=a,this._hSpace="hsv",c=a.h/360,d=a.s/100,e=a.v/100,i=Math.floor(6*c),j=6*c-i,k=e*(1-d),l=e*(1-j*d),m=e*(1-(1-j)*d),i%6){case 0:f=e,g=m,h=k;break;case 1:f=l,g=e,h=k;break;case 2:f=k,g=e,h=m;break;case 3:f=k,g=l,h=e;break;case 4:f=m,g=k,h=e;break;case 5:f=e,g=k,h=l}return this.fromRgb({r:255*f,g:255*g,b:255*h},!0)},fromInt:function(a,c){return this._color=parseInt(a,10),isNaN(this._color)&&(this._color=0),this._color>16777215?this._color=16777215:this._color<0&&(this._color=0),c===b&&(this._hsv.h=this._hsv.s=this._hsl.h=this._hsl.s=0),this},hue2rgb:function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+6*(b-a)*(2/3-c):a},toString:function(){var a=parseInt(this._color,10).toString(16);if(this.error)return"";if(a.length<6)for(var b=6-a.length-1;b>=0;b--)a="0"+a;return"#"+a},toCSS:function(a,b){switch(a=a||"hex",b=parseFloat(b||this._alpha),a){case"rgb":case"rgba":var c=this.toRgb();return 1>b?"rgba( "+c.r+", "+c.g+", "+c.b+", "+b+" )":"rgb( "+c.r+", "+c.g+", "+c.b+" )";case"hsl":case"hsla":var d=this.toHsl();return 1>b?"hsla( "+d.h+", "+d.s+"%, "+d.l+"%, "+b+" )":"hsl( "+d.h+", "+d.s+"%, "+d.l+"% )";default:return this.toString()}},toRgb:function(){return{r:255&this._color>>16,g:255&this._color>>8,b:255&this._color}},toHsl:function(){var a,b,c=this.toRgb(),d=c.r/255,e=c.g/255,f=c.b/255,g=Math.max(d,e,f),h=Math.min(d,e,f),i=(g+h)/2;if(g===h)a=b=0;else{var j=g-h;switch(b=i>.5?j/(2-g-h):j/(g+h),g){case d:a=(e-f)/j+(f>e?6:0);break;case e:a=(f-d)/j+2;break;case f:a=(d-e)/j+4}a/=6}return a=Math.round(360*a),0===a&&this._hsl.h!==a&&(a=this._hsl.h),b=Math.round(100*b),0===b&&this._hsl.s&&(b=this._hsl.s),{h:a,s:b,l:Math.round(100*i)}},toHsv:function(){var a,b,c=this.toRgb(),d=c.r/255,e=c.g/255,f=c.b/255,g=Math.max(d,e,f),h=Math.min(d,e,f),i=g,j=g-h;if(b=0===g?0:j/g,g===h)a=b=0;else{switch(g){case d:a=(e-f)/j+(f>e?6:0);break;case e:a=(f-d)/j+2;break;case f:a=(d-e)/j+4}a/=6}return a=Math.round(360*a),0===a&&this._hsv.h!==a&&(a=this._hsv.h),b=Math.round(100*b),0===b&&this._hsv.s&&(b=this._hsv.s),{h:a,s:b,v:Math.round(100*i)}},toInt:function(){return this._color},toIEOctoHex:function(){var a=this.toString(),b=parseInt(255*this._alpha,10).toString(16);return 1===b.length&&(b="0"+b),"#"+b+a.replace(/^#/,"")},toLuminosity:function(){var a=this.toRgb();return.2126*Math.pow(a.r/255,2.2)+.7152*Math.pow(a.g/255,2.2)+.0722*Math.pow(a.b/255,2.2)},getDistanceLuminosityFrom:function(a){if(!(a instanceof c))throw"getDistanceLuminosityFrom requires a Color object";var b=this.toLuminosity(),d=a.toLuminosity();return b>d?(b+.05)/(d+.05):(d+.05)/(b+.05)},getMaxContrastColor:function(){var a=this.toLuminosity(),b=a>=.5?"000000":"ffffff";return new c(b)},getReadableContrastingColor:function(a,d){if(!a instanceof c)return this;var e=d===b?5:d,f=a.getDistanceLuminosityFrom(this),g=a.getMaxContrastColor(),h=g.getDistanceLuminosityFrom(a);if(e>=h)return g;if(f>=e)return this;for(var i=0===g.toInt()?-1:1;e>f&&(this.l(i,!0),f=this.getDistanceLuminosityFrom(a),0!==this._color&&16777215!==this._color););return this},a:function(a){if(a===b)return this._alpha;var c=parseFloat(a);return isNaN(c)?this._error():(this._alpha=c,this)},darken:function(a){return a=a||5,this.l(-a,!0)},lighten:function(a){return a=a||5,this.l(a,!0)},saturate:function(a){return a=a||15,this.s(a,!0)},desaturate:function(a){return a=a||15,this.s(-a,!0)},toGrayscale:function(){return this.setHSpace("hsl").s(0)},getComplement:function(){return this.h(180,!0)},getSplitComplement:function(a){a=a||1;var b=180+30*a;return this.h(b,!0)},getAnalog:function(a){a=a||1;var b=30*a;return this.h(b,!0)},getTetrad:function(a){a=a||1;var b=60*a;return this.h(b,!0)},getTriad:function(a){a=a||1;var b=120*a;return this.h(b,!0)},_partial:function(a){var c=d[a];return function(d,e){var f=this._spaceFunc("to",c.space);return d===b?f[a]:(e===!0&&(d=f[a]+d),c.mod&&(d%=c.mod),c.range&&(d=d<c.range[0]?c.range[0]:d>c.range[1]?c.range[1]:d),f[a]=d,this._spaceFunc("from",c.space,f))}},_spaceFunc:function(a,b,c){var d=b||this._hSpace,e=a+d.charAt(0).toUpperCase()+d.substr(1);return this[e](c)}};var d={h:{mod:360},s:{range:[0,100]},l:{space:"hsl",range:[0,100]},v:{space:"hsv",range:[0,100]},r:{space:"rgb",range:[0,255]},g:{space:"rgb",range:[0,255]},b:{space:"rgb",range:[0,255]}};for(var e in d)d.hasOwnProperty(e)&&(c.fn[e]=c.fn._partial(e));"object"==typeof exports?module.exports=c:a.Color=c}(this);

/**
 * Handle dynamic color customization previews.
 * 
 * @package Inkblot
 */
(function($) {
	function inkblot_color($id, $to, $selectors, $property) {
		var $id = $id.replace(/_/g, '-'),
			$isColor = -1 < $id.indexOf('color'),
			$rgba = $isColor ? _.toArray(Color($to).toRgb()) : _.toArray(Color($('wbr.inkblot').data($id.replace(/opacity/g, 'color'))).toRgb());
		
		if ($isColor) {
			$rgba.push(parseFloat($('wbr.inkblot').data($id.replace(/color/g, 'opacity'))));
		} else {
			$rgba.push($to);
		}
		
		if (-1 < $selectors.indexOf(' a')) {
			$('style.inkblot').append($selectors + '{' + $property + ':' + 'rgba(' + $rgba.join(',') + ')' + '}');
		} else {
			$($selectors).css($property, 'rgba(' + $rgba.join(',') + ')');
		}
		
		$('wbr.inkblot').data($id, $to);
	}
	
	wp.customize('background_color', function($value) {$value.bind(function($to) {
		inkblot_color('background_color', $to, 'body', 'background-color');
	});});
	
	wp.customize('background_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('background_opacity', $to, 'body', 'background-color');
	});});
	
	wp.customize('page_color', function($value) {$value.bind(function($to) {
		inkblot_color('page_color', $to, '#page, input, textarea', 'background-color');
	});});
	
	wp.customize('page_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('page_opacity', $to, '#page, input, textarea', 'background-color');
	});});
	
	wp.customize('trim_color', function($value) {$value.bind(function($to) {
		inkblot_color('trim_color', $to, '#header nav, #header ul ul, #footer, .post-webcomic nav, button, input[type="submit"], input[type="reset"], input[type="button"]', 'background-color');
	});});
	
	wp.customize('trim_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('trim_opacity', $to, '#header nav, #header ul ul, #footer, .post-webcomic nav, button, input[type="submit"], input[type="reset"], input[type="button"]', 'background-color');
	});});
	
	wp.customize('text_color', function($value) {$value.bind(function($to) {
		inkblot_color('text_color', $to, 'body', 'color');
	});});
	
	wp.customize('text_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('text_opacity', $to, 'body', 'color');
	});});
	
	wp.customize('header_textcolor', function($value) {$value.bind(function($to) {
		if ('blank' !== $to) {
			inkblot_color('header_textcolor', $to, '#header > a', 'color');
		}
	});});
	
	wp.customize('header_textopacity', function($value) {$value.bind(function($to) {
		inkblot_color('header_textopacity', $to, '#header > a, #header > a:focus, #header > a:hover', 'color');
	});});
	
	wp.customize('page_text_color', function($value) {$value.bind(function($to) {
		inkblot_color('page_text_color', $to, '#page, input, textarea', 'color');
	});});
	
	wp.customize('page_text_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('page_text_opacity', $to, '#page, input, textarea', 'color');
	});});
	
	wp.customize('trim_text_color', function($value) {$value.bind(function($to) {
		inkblot_color('trim_text_color', $to, '#header nav, #header ul ul, #footer, .post-webcomic nav, button, input[type="submit"], input[type="reset"], input[type="button"]', 'color');
	});});
	
	wp.customize('trim_text_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('trim_text_opacity', $to, '#header nav, #header ul ul, #footer, .post-webcomic nav, button, input[type="submit"], input[type="reset"], input[type="button"]', 'color');
	});});
	
	wp.customize('link_color', function($value) {$value.bind(function($to) {
		inkblot_color('link_color', $to, ' a', 'color');
	});});
	
	wp.customize('link_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('link_opacity', $to, ' a', 'color');
	});});
	
	wp.customize('link_hover_color', function($value) {$value.bind(function($to) {
		inkblot_color('link_hover_color', $to, 'a:focus, a:hover', 'color');
	});});
	
	wp.customize('link_hover_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('link_hover_opacity', $to, 'a:focus, a:hover', 'color');
	});});
	
	wp.customize('page_link_color', function($value) {$value.bind(function($to) {
		inkblot_color('page_link_color', $to, '#page a, .post-footer span, nav.posts, nav.post-pages, nav.posts-paged, nav.comments-paged', 'color');
		inkblot_color('page_link_color', $to, 'blockquote', 'hr, pre, th, td, fieldset, input, textarea, .post-footer, .comment, .comment .comment, .pingback, .trackback, .bypostauthor', 'border-color');
		
		inkblot_color('header_textcolor', $('wbr.inkblot').data('header-textcolor'), '#header > a', 'color');
		inkblot_color('trim_link_color', $('wbr.inkblot').data('trim-link-color'), '#header nav:before, #header nav a, #header select, #footer a, .post-webcomic nav a', 'color');
	});});
	
	wp.customize('page_link_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('page_link_opacity', $to, '#page a, .post-footer span, nav.posts, nav.post-pages, nav.posts-paged, nav.comments-paged', 'color');
		inkblot_color('page_link_opacity', $to, 'blockquote', 'hr, pre, th, td, fieldset, input, textarea, .post-footer, .comment, .comment .comment, .pingback, .trackback, .bypostauthor', 'border-color');
		
		inkblot_color('header_textcolor', $('wbr.inkblot').data('header-textcolor'), '#header > a', 'color');
		inkblot_color('trim_link_color', $('wbr.inkblot').data('trim-link-color'), '#header nav:before, #header nav a, #header select, #footer a, .post-webcomic nav a', 'color');
	});});
	
	wp.customize('page_link_hover_color', function($value) {$value.bind(function($to) {
		inkblot_color('page_link_hover_color', $to, '#page a:focus, #page a:hover', 'color');
		inkblot_color('page_link_hover_color', $to, 'input:focus, input:hover, textarea:focus, textarea:hover', 'border-color');
		
		inkblot_color('header_textcolor', $('wbr.inkblot').data('header-textcolor'), '#header > a:focus, #header > a:hover', 'color');
		inkblot_color('trim_link_hover_color', $('wbr.inkblot').data('trim-link-hover-color'), '#header nav:focus:before, #header nav:hover:before, #header nav a:focus, #header nav a:hover, #header select:focus, #header select:hover, #header li:focus > a, #header li:hover > a, #header li.current_page_item > a, #header li.current_page_ancestor > a, #footer a:focus, #footer a:hover, .post-webcomic nav a:focus, .post-webcomic nav a:hover', 'color');
	});});
	
	wp.customize('page_link_hover_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('page_link_hover_opacity', $to, '#page a:focus, #page a:hover', 'color');
		inkblot_color('page_link_hover_opacity', $to, 'input:focus, input:hover, textarea:focus, textarea:hover', 'border-color');
		
		inkblot_color('header_textcolor', $('wbr.inkblot').data('header-textcolor'), '#header > a:focus, #header > a:hover', 'color');
		inkblot_color('trim_link_hover_color', $('wbr.inkblot').data('trim-link-hover-color'), '#header nav:focus:before, #header nav:hover:before, #header nav a:focus, #header nav a:hover, #header select:focus, #header select:hover, #header li:focus > a, #header li:hover > a, #header li.current_page_item > a, #header li.current_page_ancestor > a, #footer a:focus, #footer a:hover, .post-webcomic nav a:focus, .post-webcomic nav a:hover', 'color');
	});});
	
	wp.customize('trim_link_color', function($value) {$value.bind(function($to) {
		inkblot_color('trim_link_color', $to, '#header nav:before, #header nav a, #header select, #footer a, .post-webcomic nav a', 'color');
	});});
	
	wp.customize('trim_link_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('trim_link_opacity', $to, '#header nav:before, #header nav a, #header select, #footer a, .post-webcomic nav a', 'color');
	});});
	
	wp.customize('trim_link_hover_color', function($value) {$value.bind(function($to) {
		inkblot_color('trim_link_hover_color', $to, '#header nav:focus:before, #header nav:hover:before, #header nav a:focus, #header nav a:hover, #header select:focus, #header select:hover, #header li:focus > a, #header li:hover > a, #header li.current_page_item > a, #header li.current_page_ancestor > a, #footer a:focus, #footer a:hover, .post-webcomic nav a:focus, .post-webcomic nav a:hover', 'color');
	});});
	
	wp.customize('trim_link_hover_opacity', function($value) {$value.bind(function($to) {
		inkblot_color('trim_link_hover_opacity', $to, '#header nav:focus:before, #header nav:hover:before, #header nav a:focus, #header nav a:hover, #header select:focus, #header select:hover, #header li:focus > a, #header li:hover > a, #header li.current_page_item > a, #header li.current_page_ancestor > a, #footer a:focus, #footer a:hover, .post-webcomic nav a:focus, .post-webcomic nav a:hover', 'color');
	});});
})(jQuery);