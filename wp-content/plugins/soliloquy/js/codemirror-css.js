CodeMirror.defineMode("css",function(a){return CodeMirror.getMode(a,"text/css")});CodeMirror.defineMode("css-base",function(b,d){var e=b.indentUnit,o=d.hooks||{},n=d.atMediaTypes||{},k=d.atMediaFeatures||{},j=d.propertyKeywords||{},l=d.colorKeywords||{},h=d.valueKeywords||{},a=!!d.allowNested,i=null;function g(p,q){i=q;return p}function c(s,r){var q=s.next();if(o[q]){var p=o[q](s,r);if(p!==false){return p}}if(q=="@"){s.eatWhile(/[\w\\\-]/);return g("def",s.current())}else{if(q=="="){g(null,"compare")}else{if((q=="~"||q=="|")&&s.eat("=")){return g(null,"compare")}else{if(q=='"'||q=="'"){r.tokenize=m(q);return r.tokenize(s,r)}else{if(q=="#"){s.eatWhile(/[\w\\\-]/);return g("atom","hash")}else{if(q=="!"){s.match(/^\s*\w*/);return g("keyword","important")}else{if(/\d/.test(q)){s.eatWhile(/[\w.%]/);return g("number","unit")}else{if(q==="-"){if(/\d/.test(s.peek())){s.eatWhile(/[\w.%]/);return g("number","unit")}else{if(s.match(/^[^-]+-/)){return g("meta","meta")}}}else{if(/[,+>*\/]/.test(q)){return g(null,"select-op")}else{if(q=="."&&s.match(/^-?[_a-z][_a-z0-9-]*/i)){return g("qualifier","qualifier")}else{if(q==":"){return g("operator",q)}else{if(/[;{}\[\]\(\)]/.test(q)){return g(null,q)}else{if(q=="u"&&s.match("rl(")){s.backUp(1);r.tokenize=f;return g("property","variable")}else{s.eatWhile(/[\w\\\-]/);return g("property","variable")}}}}}}}}}}}}}}function m(p,q){return function(u,s){var t=false,r;while((r=u.next())!=null){if(r==p&&!t){break}t=!t&&r=="\\"}if(!t){if(q){u.backUp(1)}s.tokenize=c}return g("string","string")}}function f(q,p){q.next();if(!q.match(/\s*[\"\']/,false)){p.tokenize=m(")",true)}else{p.tokenize=c}return g(null,"(")}return{startState:function(p){return{tokenize:c,baseIndent:p||0,stack:[]}},token:function(t,s){s.tokenize=s.tokenize||c;if(s.tokenize==c&&t.eatSpace()){return null}var r=s.tokenize(t,s);if(r&&typeof r!="string"){r=g(r[0],r[1])}var q=s.stack[s.stack.length-1];if(r=="variable"){if(i=="variable-definition"){s.stack.push("propertyValue")}return"variable-2"}else{if(r=="property"){if(q=="propertyValue"){if(h[t.current()]){r="string-2"}else{if(l[t.current()]){r="keyword"}else{r="variable-2"}}}else{if(q=="rule"){if(!j[t.current()]){r+=" error"}}else{if(q=="block"){if(j[t.current()]){r="property"}else{if(l[t.current()]){r="keyword"}else{if(h[t.current()]){r="string-2"}else{r="tag"}}}}else{if(!q||q=="@media{"){r="tag"}else{if(q=="@media"){if(n[t.current()]){r="attribute"}else{if(/^(only|not)$/i.test(t.current())){r="keyword"}else{if(t.current().toLowerCase()=="and"){r="error"}else{if(k[t.current()]){r="error"}else{r="attribute error"}}}}}else{if(q=="@mediaType"){if(n[t.current()]){r="attribute"}else{if(t.current().toLowerCase()=="and"){r="operator"}else{if(/^(only|not)$/i.test(t.current())){r="error"}else{if(k[t.current()]){r="error"}else{r="error"}}}}}else{if(q=="@mediaType("){if(j[t.current()]){}else{if(n[t.current()]){r="error"}else{if(t.current().toLowerCase()=="and"){r="operator"}else{if(/^(only|not)$/i.test(t.current())){r="error"}else{r+=" error"}}}}}else{r="error"}}}}}}}}else{if(r=="atom"){if(!q||q=="@media{"||q=="block"){r="builtin"}else{if(q=="propertyValue"){if(!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t.current())){r+=" error"}}else{r="error"}}}else{if(q=="@media"&&i=="{"){r="error"}}}}if(i=="{"){if(q=="@media"||q=="@mediaType"){s.stack.pop();s.stack[s.stack.length-1]="@media{"}else{var u=a?"block":"rule";s.stack.push(u)}}else{if(i=="}"){var p=s.stack[s.stack.length-1];if(p=="interpolation"){r="operator"}s.stack.pop();if(q=="propertyValue"){s.stack.pop()}}else{if(i=="interpolation"){s.stack.push("interpolation")}else{if(i=="@media"){s.stack.push("@media")}else{if(q=="@media"&&/\b(keyword|attribute)\b/.test(r)){s.stack.push("@mediaType")}else{if(q=="@mediaType"&&t.current()==","){s.stack.pop()}else{if(q=="@mediaType"&&i=="("){s.stack.push("@mediaType(")}else{if(q=="@mediaType("&&i==")"){s.stack.pop()}else{if((q=="rule"||q=="block")&&i==":"){s.stack.push("propertyValue")}else{if(q=="propertyValue"&&i==";"){s.stack.pop()}}}}}}}}}}return r},indent:function(q,p){var r=q.stack.length;if(/^\}/.test(p)){r-=q.stack[q.stack.length-1]=="propertyValue"?2:1}return q.baseIndent+r*e},electricChars:"}"}});(function(){function b(k){var j={};for(var h=0;h<k.length;++h){j[k[h]]=true}return j}var e=b(["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"]);var g=b(["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid"]);var d=b(["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid-cell","grid-column","grid-column-align","grid-column-sizing","grid-column-span","grid-columns","grid-flow","grid-row","grid-row-align","grid-row-sizing","grid-row-span","grid-rows","grid-template","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-shadow","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index"]);var c=b(["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua"]);var f=b(["above","absolute","activeborder","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","auto","avoid","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break-all","break-word","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","compact","condensed","contain","content","content-box","context-menu","continuous","copy","cover","crop","cross","crosshair","currentcolor","cursive","dashed","decimal","decimal-leading-zero","default","default-button","destination-atop","destination-in","destination-out","destination-over","devanagari","disc","discard","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ew-resize","expanded","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","footnotes","forwards","from","geometricPrecision","georgian","graytext","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-table","inset","inside","intrinsic","invert","italic","justify","kannada","katakana","katakana-iroha","khmer","landscape","lao","large","larger","left","level","lighter","line-through","linear","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","malayalam","match","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","overlay","overline","padding","padding-box","painted","paused","persian","plus-darker","plus-lighter","pointer","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radio","read-only","read-write","read-write-plaintext-only","relative","repeat","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","round","row-resize","rtl","run-in","running","s-resize","sans-serif","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","single","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","solid","somali","source-atop","source-in","source-out","source-over","space","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","white","wider","window","windowframe","windowtext","x-large","x-small","xor","xx-large","xx-small"]);function a(k,j){var h=false,i;while((i=k.next())!=null){if(h&&i=="/"){j.tokenize=null;break}h=(i=="*")}return["comment","comment"]}CodeMirror.defineMIME("text/css",{atMediaTypes:e,atMediaFeatures:g,propertyKeywords:d,colorKeywords:c,valueKeywords:f,hooks:{"<":function(j,i){function h(n,m){var l=0,k;while((k=n.next())!=null){if(l>=2&&k==">"){m.tokenize=null;break}l=(k=="-")?l+1:0}return["comment","comment"]}if(j.eat("!")){i.tokenize=h;return h(j,i)}},"/":function(i,h){if(i.eat("*")){h.tokenize=a;return a(i,h)}return false}},name:"css-base"});CodeMirror.defineMIME("text/x-scss",{atMediaTypes:e,atMediaFeatures:g,propertyKeywords:d,colorKeywords:c,valueKeywords:f,allowNested:true,hooks:{"$":function(h){h.match(/^[\w-]+/);if(h.peek()==":"){return["variable","variable-definition"]}return["variable","variable"]},"/":function(i,h){if(i.eat("/")){i.skipToEnd();return["comment","comment"]}else{if(i.eat("*")){h.tokenize=a;return a(i,h)}else{return["operator","operator"]}}},"#":function(h){if(h.eat("{")){return["operator","interpolation"]}else{h.eatWhile(/[\w\\\-]/);return["atom","hash"]}}},name:"css-base"})})();