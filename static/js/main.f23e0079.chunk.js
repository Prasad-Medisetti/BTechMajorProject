(this["webpackJsonpbtech-major-project"]=this["webpackJsonpbtech-major-project"]||[]).push([[0],{120:function(e,t,n){},133:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(12),c=n.n(r),o=(n(120),n(22)),s=n(14),l=n(100),j=n(205),d=n(198),p=n(11),b=n(8),h=n(184),f=n(210),x=n(209),u=n(189),g=n(135),O=(n(201),n(202),n(199),n(200),n(33)),m=n(177),v=n(181),y=(n(211),n(182)),w=(n(96),n(2));var k=n(183);function S(e){var t=e.classes;return Object(w.jsx)("footer",{className:t.footer,children:Object(w.jsxs)(O.a,{variant:"body2",color:"textSecondary",children:["\xa9 "+(new Date).getFullYear()+" ",Object(w.jsx)(k.a,{color:"inherit",href:"",children:"Online Notice Board"})]})})}var C=n(40),N=n.n(C),I=n(54),D=(n(193),n(97),n(186),n(187),n(192),n(98),n(185)),B=n(69),z=n(67),L=n(68);n(188),n(191),n(101),n(190),Object(h.a)({avatar:{backgroundColor:function(e){return"work"===e.category?D.a[700]:"money"===e.category?B.a[500]:"todos"===e.category?z.a[500]:L.a[500]}},cardMenu:{marginRight:8}});n(194),n(102),Object(h.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},block:{margin:".5rem auto",display:"flex",justifyContent:"center",alignItems:"center",height:"78vh"}}}));n(32);var T=n(136);n(66),n(206),n(208),n(212),n(195),n(196),Object(h.a)({container:{width:"100%"},field:{marginTop:20,marginBottom:20,display:"block"}});n(197),Object(h.a)({container:{width:"100%"},field:{marginTop:20,marginBottom:20,display:"block"}});var F=240;Object(h.a)((function(e){var t,n;return{root:{display:"flex",flexDirection:"column"},page:Object(b.a)({background:"#f9f9f9",padding:e.spacing(2,0)},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(F,"px)"),marginLeft:F}),appBar:(t={},Object(b.a)(t,e.breakpoints.up("sm"),{width:"calc(100% - ".concat(F,"px)"),marginLeft:F}),Object(b.a)(t,"display","flex"),t),footer:(n={},Object(b.a)(n,e.breakpoints.up("sm"),{width:"calc(100% - ".concat(F,"px)"),marginLeft:F}),Object(b.a)(n,"margin",e.spacing(0)),Object(b.a)(n,"display","flex"),Object(b.a)(n,"flexDirection","column"),Object(b.a)(n,"justifyContent","center"),Object(b.a)(n,"alignItems","center"),Object(b.a)(n,"minHeight","4vh"),Object(b.a)(n,"padding",e.spacing(2,0,2,0)),Object(b.a)(n,"backgroundColor","light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]),n),drawer:Object(b.a)({},e.breakpoints.up("sm"),{width:F,flexShrink:0}),drawerPaper:{width:F},active:{background:"#f4f4f4"},title:{display:"block",margin:e.spacing(2),flexGrow:1,fontSize:22,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:d.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},date:{flexGrow:1},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:e.mixins.toolbar}}));var W=n(30),G=n(203),E=n(204),A=n(99),H=n.n(A),M=n(80),P=Object(h.a)({list:{width:250},fullList:{width:"auto"}});function J(e){var t=e.anchor,n=e.open,a=e.onClose,i=e.children;P();return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(f.a,{anchor:t,open:n,onClose:a,children:i})})}var R=Object(h.a)((function(e){return{root:{},menuButton:{},appBar:{marginLeft:e.spacing(1)},drawerTitle:{flexGrow:1,letterSpacing:0,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:d.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},title:{flexGrow:1,letterSpacing:0,color:"#000000DE",cursor:"pointer",transition:".4s","&:hover":{color:d.a[900],filter:"drop-shadow(0px 0px 1px inherit)",textDecoration:"none"},fontSize:1.5*e.typography.fontSize},main:{background:"#f9f9f9",minHeight:"79vh",padding:e.spacing(2,0)},footer:{margin:e.spacing(0),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"4vh",padding:e.spacing(2,0,2,0),backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]},listItem:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},icon:{fill:e.palette.primary,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},listItemText:{fontSize:1.15*e.typography.fontSize},active:{background:"#f4f4f4"},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:{display:"flex"}}}));function U(){var e=R(),t=Object(s.f)(),n=(Object(s.g)(),Object(a.useState)(!1)),i=Object(p.a)(n,2),r=i[0],c=i[1],o=Object(a.useState)(!0),l=Object(p.a)(o,2),j=l[0],d=l[1],b=Object(a.useState)({}),h=Object(p.a)(b,2),f=h[0],C=h[1],D=[{text:"SIGN IN",icon:Object(w.jsx)(M.a,{className:e.icon}),path:"#"},{text:"SIGN OUT",icon:Object(w.jsx)(M.b,{}),path:"#"}],B=function(){c(!r)},z=function(){var e=Object(I.a)(N.a.mark((function e(){var t,n,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/users");case 2:return t=e.sent,e.next=5,t.json();case 5:if(n=e.sent,t.ok){e.next=11;break}throw a="An error has occured: ".concat(t.status),new Error(a);case 11:return C(Object(W.a)(n)),e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){d(!1),z(),d(!0)}),[f]),Object(w.jsxs)("div",{className:e.root,children:[Object(w.jsx)(m.a,{position:"sticky",className:e.appbar,children:Object(w.jsxs)(v.a,{className:e.toolbar,children:[Object(w.jsx)(k.a,{className:e.title,style:{fontSize:24},href:"/",children:"Online Notice Board"}),Object(w.jsx)(x.a,{smDown:!0,implementation:"css",children:Object(w.jsx)(G.a,{orientation:"horizontal",variant:"text",color:"inherit",size:"large","aria-label":"vertical contained primary button group",children:D.map((function(e,t){return Object(w.jsx)(T.a,{variant:"text",color:"inherit",fullWidth:!0,endIcon:e.icon,children:e.text},t)}))})}),Object(w.jsx)(x.a,{mdUp:!0,implementation:"css",children:Object(w.jsx)(y.a,{edge:"start",className:e.menuButton,color:"inherit",onClick:B,"aria-label":"menu",children:Object(w.jsx)(H.a,{})})})]})}),Object(w.jsx)(J,{anchor:"right",style:{width:"80vw"},open:r,onClose:B,children:Object(w.jsxs)(u.a,{children:[Object(w.jsx)(g.a,{button:!0,children:Object(w.jsx)(O.a,{className:e.drawerTitle,variant:"h6",component:"h4",children:"Online Notice Board",onClick:function(){t.replace("/")}})},"title"),Object(w.jsx)(E.a,{style:{margin:"1em"}}),Object(w.jsx)(g.a,{style:{minHeight:"80vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:Object(w.jsx)(G.a,{orientation:"vertical",variant:"text",fullWidth:!0,"aria-label":"vertical contained primary button group",children:D.map((function(e,t){return Object(w.jsx)(T.a,{variant:"text",color:"inherit",fullWidth:!0,startIcon:e.icon,children:e.text},t)}))})})]})}),Object(w.jsxs)("main",{className:e.main,children:[j&&Object(w.jsxs)("div",{className:"lds-spinner",children:[Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{})]}),!j&&Array.isArray(f)&&Object(w.jsx)("div",{children:f.map((function(e){return Object(w.jsx)("p",{children:e.login},e.id)}))})]}),Object(w.jsx)(S,{classes:e})]})}var q=Object(l.a)({root:{},palette:{primary:{main:"#fefefe"},secondary:d.a},typography:{fontFamily:"Quicksand",fontWeightLight:400,fontWeightRegular:500,fontWeightMedium:600,fontWeightBold:700}});var Q=function(){return Object(w.jsx)(j.a,{theme:q,children:Object(w.jsx)("div",{className:"App",children:Object(w.jsx)(o.a,{basename:"/online-notice-board",children:Object(w.jsx)(s.c,{children:Object(w.jsx)(s.a,{exact:!0,path:"/",children:Object(w.jsx)(U,{})})})})})})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,214)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),r(e),c(e)}))};c.a.render(Object(w.jsx)(i.a.StrictMode,{children:Object(w.jsx)(Q,{})}),document.querySelector("#root")),Y()}},[[133,1,2]]]);
//# sourceMappingURL=main.f23e0079.chunk.js.map