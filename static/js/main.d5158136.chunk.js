(this["webpackJsonpbtech-major-project"]=this["webpackJsonpbtech-major-project"]||[]).push([[0],{124:function(e,t,a){},125:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(12),c=a.n(i),o=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,225)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))},s=(a(124),a(25)),l=a(14),j=a(101),d=a(214),p=a(206),h=a(191),b=(a(125),a(11)),u=a(8),m=a(221),x=a(220),f=a(197),O=a(140),g=a(210),y=a(211),v=a(207),w=a(208),C=a(35),S=a(184),k=a(188),N=a(223),D=a(189),I=a(96),T=a.n(I),B=a(215),P=a(2);var z=function(e){var t=e.classes,a=e.handleDrawerToggle;return Object(P.jsx)(S.a,{position:"fixed",className:t.appBar,elevation:2,color:"primary",children:Object(P.jsxs)(k.a,{children:[Object(P.jsx)(x.a,{smUp:!0,implementation:"css",children:Object(P.jsx)(D.a,{color:"inherit","aria-label":"open drawer",onClick:a,edge:"start",className:t.menuButton,children:Object(P.jsx)(T.a,{})})}),Object(P.jsxs)(C.a,{className:t.date,children:["Today is the ",Object(B.a)(new Date,"do MMMM Y")]}),Object(P.jsx)(C.a,{children:"Admin"}),Object(P.jsx)(N.a,{className:t.avatar})]})})},W=a(190);function L(e){var t=e.classes,a=Object(l.f)();return Object(P.jsx)("footer",{className:t.footer,children:Object(P.jsxs)(C.a,{variant:"body2",color:"textSecondary",children:["\xa9 "+(new Date).getFullYear()+" ",Object(P.jsx)(W.a,{color:"inherit",onClick:function(){a.replace("/")},children:"Online Notice Board"})]})})}var F=a(41),G=a.n(F),M=a(59),_=a(201),E=(a(97),a(193),a(194),a(200),a(98),a(192)),H=a(72),q=a(70),A=a(71);a(195),a(199),a(102),a(198),Object(h.a)({avatar:{backgroundColor:function(e){return"work"===e.category?E.a[700]:"money"===e.category?H.a[500]:"todos"===e.category?q.a[500]:A.a[500]}},cardMenu:{marginRight:8}});var R=a(202);a(103),Object(h.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},block:{margin:".5rem auto",display:"flex",justifyContent:"center",alignItems:"center",height:"78vh"}}}));var U=a(24),J=a(141),V=a(69),Y=a.n(V),Q=a(216),K=a(218),X=a(224),Z=a(203),$=a(204),ee=Object(h.a)({container:{width:"100%"},field:{marginTop:20,marginBottom:20,display:"block"}});function te(e){var t=ee(),a=Object(l.f)(),r=Object(n.useState)(!1),i=Object(b.a)(r,2),c=i[0],o=i[1],s=Object(n.useState)(!1),j=Object(b.a)(s,2),d=j[0],p=j[1],h=Object(n.useState)({title:"",details:"",category:"monney"}),m=Object(b.a)(h,2),x=m[0],f=m[1],O=function(e){var t=e.target.value;f(Object(U.a)(Object(U.a)({},x),{},Object(u.a)({},e.target.name,t)))};return Object(P.jsxs)(_.a,{maxWidth:"sm",children:[window.location.pathname,Object(P.jsx)(C.a,{variant:"h6",color:"textSecondary",component:"h2",gutterBottom:!0,children:"Create a New Post"}),Object(P.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),o(!1),p(!1),""===x.title&&o(!0),""===x.details&&p(!0),x.title&&x.details&&(x._id?fetch("https://onlinenoticeboard-server.herokuapp.com/notes"+x._id,{method:"PUT",headers:{"Content-type":"application/json"},body:JSON.stringify(Object(U.a)({},x))}).then((function(){return a.push("/")})):fetch("https://onlinenoticeboard-server.herokuapp.com/notes",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(Object(U.a)({},x))}).then((function(){return a.push("/dashboard")})))},children:[Object(P.jsx)(Q.a,{className:t.field,onChange:function(e){return O(e)},label:"Post Title",variant:"outlined",color:"secondary",fullWidth:!0,name:"title",value:x.title,required:!0,error:c}),Object(P.jsx)(Q.a,{className:t.field,onChange:function(e){return O(e)},label:"Post Details",variant:"outlined",color:"secondary",multiline:!0,rows:6,fullWidth:!0,name:"details",value:x.details,required:!0,error:d}),Object(P.jsxs)("div",{className:t.field,children:[Object(P.jsx)($.a,{children:"Post Category"}),Object(P.jsxs)(X.a,{name:"category","aria-label":"category",value:x.category,onChange:function(e){return O(e)},children:[Object(P.jsx)(Z.a,{required:!0,value:"money",control:Object(P.jsx)(K.a,{}),label:"Money"}),Object(P.jsx)(Z.a,{required:!0,value:"todos",control:Object(P.jsx)(K.a,{}),label:"Todos"}),Object(P.jsx)(Z.a,{required:!0,value:"reminders",control:Object(P.jsx)(K.a,{}),label:"Reminders"}),Object(P.jsx)(Z.a,{required:!0,value:"work",control:Object(P.jsx)(K.a,{}),label:"Work"})]})]}),Object(P.jsx)(J.a,{type:"submit",color:"secondary",variant:"contained",endIcon:Object(P.jsx)(Y.a,{}),children:"Submit"})]})]})}var ae=a(205),ne=Object(h.a)({container:{width:"100%"},field:{marginTop:20,marginBottom:20,display:"block"}});function re(e){var t=ne(),a=Object(l.f)(),r=Object(l.h)(),i=Object(n.useState)(!1),c=Object(b.a)(i,2),o=c[0],s=c[1],j=Object(n.useState)(!1),d=Object(b.a)(j,2),p=d[0],h=d[1],m=Object(n.useState)({title:"",details:"",category:"monney"}),x=Object(b.a)(m,2),f=x[0],O=x[1];Object(n.useEffect)((function(){var e=r.id;console.log(r.id),fetch("https://onlinenoticeboard-server.herokuapp.com/notes"+e).then((function(e){return e.json()})).then((function(e){return O(e)})).catch((function(e){return console.log(e)}))}),[r.id]);var g=function(e){var t=e.target.value;O(Object(U.a)(Object(U.a)({},f),{},Object(u.a)({},e.target.name,t)))};return Object(P.jsxs)(_.a,{maxWidth:"sm",children:[Object(P.jsx)(C.a,{variant:"h6",color:"textSecondary",component:"h2",gutterBottom:!0,children:"Edit Post"}),Object(P.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),s(!1),h(!1),""===f.title&&s(!0),""===f.details&&h(!0),f.title&&f.details&&(f._id?fetch("https://onlinenoticeboard-server.herokuapp.com/notes"+f._id,{method:"PUT",headers:{"Content-type":"application/json"},body:JSON.stringify(Object(U.a)({},f))}).then((function(){return a.push("/")})):fetch("https://onlinenoticeboard-server.herokuapp.com/notes",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(Object(U.a)({},f))}).then((function(){return a.push("/")})))},children:[Object(P.jsx)(Q.a,{className:t.field,onChange:function(e){return g(e)},label:"Post Title",variant:"outlined",color:"secondary",fullWidth:!0,name:"title",value:f.title,required:!0,error:o}),Object(P.jsx)(Q.a,{className:t.field,onChange:function(e){return g(e)},label:"Post Details",variant:"outlined",color:"secondary",multiline:!0,rows:6,fullWidth:!0,name:"details",value:f.details,required:!0,error:p}),Object(P.jsxs)("div",{className:t.field,children:[Object(P.jsx)($.a,{children:"Post Category"}),Object(P.jsxs)(X.a,{name:"category","aria-label":"category",value:f.category,onChange:function(e){return g(e)},children:[Object(P.jsx)(ae.a,{value:"money",control:Object(P.jsx)(K.a,{}),label:"Money"}),Object(P.jsx)(ae.a,{value:"todos",control:Object(P.jsx)(K.a,{}),label:"Todos"}),Object(P.jsx)(ae.a,{value:"reminders",control:Object(P.jsx)(K.a,{}),label:"Reminders"}),Object(P.jsx)(ae.a,{value:"work",control:Object(P.jsx)(K.a,{}),label:"Work"})]})]}),Object(P.jsx)(J.a,{type:"submit",color:"secondary",variant:"contained",endIcon:Object(P.jsx)(Y.a,{}),children:"Submit"})]})]})}var ie=240,ce=Object(h.a)((function(e){var t,a;return{root:{display:"flex",flexDirection:"column"},page:Object(u.a)({background:"#f9f9f9",padding:e.spacing(2,0)},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(ie,"px)"),marginLeft:ie}),appBar:(t={},Object(u.a)(t,e.breakpoints.up("sm"),{width:"calc(100% - ".concat(ie,"px)"),marginLeft:ie}),Object(u.a)(t,"display","flex"),t),footer:(a={},Object(u.a)(a,e.breakpoints.up("sm"),{width:"calc(100% - ".concat(ie,"px)"),marginLeft:ie}),Object(u.a)(a,"margin",e.spacing(0)),Object(u.a)(a,"display","flex"),Object(u.a)(a,"flexDirection","column"),Object(u.a)(a,"justifyContent","center"),Object(u.a)(a,"alignItems","center"),Object(u.a)(a,"minHeight","4vh"),Object(u.a)(a,"padding",e.spacing(2,0,2,0)),Object(u.a)(a,"backgroundColor","light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]),a),drawer:Object(u.a)({},e.breakpoints.up("sm"),{width:ie,flexShrink:0}),drawerPaper:{width:ie},active:{background:"#f4f4f4"},title:{display:"block",margin:e.spacing(2),flexGrow:1,fontSize:22,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},date:{flexGrow:1},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:e.mixins.toolbar}}));function oe(e){var t=e.children,a=ce(),n=Object(l.f)(),i=Object(l.g)(),c=r.a.useState(!1),o=Object(b.a)(c,2),j=o[0],d=o[1],p=[{text:"My Posts",icon:Object(P.jsx)(v.a,{color:"secondary"}),path:"/dashboard"},{text:"Create Post",icon:Object(P.jsx)(w.a,{color:"secondary"}),path:"/dashboard/create"}],h=function(){d(!j)};return Object(P.jsxs)("div",{className:a.root,children:[Object(P.jsx)(z,{classes:a,handleDrawerToggle:h}),Object(P.jsxs)("nav",{className:a.drawer,"aria-label":"mailbox folders",children:[Object(P.jsx)(x.a,{smUp:!0,implementation:"css",children:Object(P.jsxs)(m.a,{variant:"temporary",anchor:"left",open:j,onClose:h,classes:{paper:a.drawerPaper},ModalProps:{keepMounted:!0},children:[Object(P.jsx)("div",{children:Object(P.jsx)(s.b,{className:a.title,variant:"h6",to:"/",children:"Online Notice Board"})}),Object(P.jsx)(f.a,{children:p.map((function(e){return Object(P.jsxs)(O.a,{button:!0,onClick:function(){n.push(e.path),h()},className:i.pathname===e.path?a.active:null,children:[Object(P.jsx)(g.a,{children:e.icon}),Object(P.jsx)(y.a,{primary:e.text})]},e.text)}))})]})}),Object(P.jsx)(x.a,{xsDown:!0,implementation:"css",children:Object(P.jsxs)(m.a,{classes:{paper:a.drawerPaper},variant:"permanent",close:!0,children:[Object(P.jsx)("div",{children:Object(P.jsx)(s.b,{className:a.title,variant:"h6",to:"/",children:"Online Notice Board"})}),Object(P.jsx)(f.a,{children:p.map((function(e){return Object(P.jsxs)(O.a,{button:!0,onClick:function(){n.push(e.path)},className:i.pathname===e.path?a.active:null,children:[Object(P.jsx)(g.a,{children:e.icon}),Object(P.jsx)(y.a,{primary:e.text})]},e.text)}))})]})})]}),Object(P.jsxs)("main",{className:a.page,children:[Object(P.jsx)("div",{className:a.toolbar}),t,Object(P.jsx)(s.a,{children:Object(P.jsxs)(l.c,{children:[Object(P.jsx)(l.a,{path:"/create",children:Object(P.jsx)(te,{})}),Object(P.jsx)(l.a,{path:"/edit/:id",children:Object(P.jsx)(re,{})})]})})]})]})}var se=a(219),le=a(222),je=a(209),de=a(100),pe=a.n(de),he=a(212),be=a(213),ue=a(99),me=a.n(ue),xe=Object(h.a)({list:{width:250},fullList:{width:"auto"}});function fe(e){var t=e.anchor,a=e.open,n=e.onClose,r=e.children;xe();return Object(P.jsx)(P.Fragment,{children:Object(P.jsx)(m.a,{anchor:t,open:a,onClose:n,children:r})})}var Oe=function(e){var t=Object(l.g)(),a=Object(l.f)();return Object(P.jsx)(P.Fragment,{children:Object(P.jsxs)("div",{className:e.classes.root,children:[Object(P.jsx)(S.a,{position:"sticky",className:e.classes.appbar,children:Object(P.jsxs)(k.a,{className:e.classes.toolbar,children:[Object(P.jsx)(W.a,{className:e.classes.title,style:{fontSize:22},onClick:function(){return a.replace("/")},children:"Online Notice Board"}),Object(P.jsx)(x.a,{smDown:!0,implementation:"css",children:Object(P.jsx)(he.a,{orientation:"horizontal",variant:"text",color:"inherit",size:"large","aria-label":"vertical contained primary button group",children:e.menuItems.map((function(n,r){return Object(P.jsx)(J.a,{className:t.pathname===n.path?e.classes.active:null,variant:"text",color:"inherit",fullWidth:!0,endIcon:n.icon,onClick:function(){return a.replace(n.path)},children:n.text},r)}))})}),Object(P.jsx)(x.a,{mdUp:!0,implementation:"css",children:Object(P.jsx)(D.a,{edge:"start",className:e.classes.menuButton,color:"inherit",onClick:e.handleDrawerToggle,"aria-label":"menu",children:Object(P.jsx)(me.a,{})})})]})}),Object(P.jsx)(fe,{anchor:"right",style:{width:"80vw"},open:e.mobileOpen,onClose:e.handleDrawerToggle,children:Object(P.jsxs)(f.a,{children:[Object(P.jsx)(O.a,{button:!0,children:Object(P.jsx)(C.a,{className:e.classes.drawerTitle,variant:"h6",component:"h4",children:"Online Notice Board",onClick:function(){return a.replace("/")}})},"title"),Object(P.jsx)(be.a,{style:{margin:"1em"}}),Object(P.jsx)(O.a,{style:{minHeight:"80vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:Object(P.jsx)(he.a,{orientation:"vertical",variant:"text",fullWidth:!0,"aria-label":"vertical contained primary button group",children:e.menuItems.map((function(t,n){return Object(P.jsx)(J.a,{variant:"text",color:"inherit",fullWidth:!0,startIcon:t.icon,onClick:function(){a.replace(t.path),e.handleDrawerToggle()},children:t.text},n)}))})})]})})]})})},ge=Object(h.a)((function(e){return{root:{},menuButton:{},appBar:{marginLeft:e.spacing(1)},drawerTitle:{flexGrow:1,letterSpacing:0,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},title:{flexGrow:1,letterSpacing:0,color:"#000000DE",cursor:"pointer",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)",textDecoration:"none"},fontSize:1.5*e.typography.fontSize},main:{background:"#f9f9f9",minHeight:"79vh",maxWidth:"100vw",overflow:"scroll",margin:e.spacing(2),display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"},footer:{margin:e.spacing(0),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"4vh",padding:e.spacing(2,0,2,0),backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]},listItem:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},icon:{fill:e.palette.primary,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},listItemText:{fontSize:1.15*e.typography.fontSize},active:{backgroundColor:"rgba(0, 0, 0, 0.23)"},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:{display:"flex"}}}));function ye(e){return Object(P.jsx)(je.a,Object(U.a)(Object(U.a)({},e),{},{direction:"up"}))}function ve(e){var t=ge(),a=Object(l.g)(),r=Object(n.useState)(!0),i=Object(b.a)(r,2),c=i[0],o=i[1],s=Object(n.useState)(""),j=Object(b.a)(s,2),d=j[0],p=j[1],h=Object(n.useState)(null),u=Object(b.a)(h,2),m=u[0],x=u[1],f=[{text:"SIGN IN",icon:Object(P.jsx)("span",{className:"material-icons-outlined",children:"login"}),path:"/signin"},{text:"SIGN UP",icon:Object(P.jsx)("span",{className:"material-icons-outlined",children:"person_add_alt"}),path:"/signup"},{text:"DASHBOARD",icon:Object(P.jsx)("span",{className:"material-icons",children:"dashboard"}),path:"/dashboard"}];Object(n.useEffect)((function(){p(a.pathname),x(!0),console.log(a.pathname)}),[a.pathname]);var O=function(){x(!1)};return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(Oe,{classes:t,menuItems:f,mobileOpen:c,setMobileOpen:o,handleDrawerToggle:function(){o(!c)}}),Object(P.jsxs)("main",{className:t.main,children:[Object(P.jsxs)(C.a,{variant:"h6",color:"error",children:[Object(P.jsx)("code",{children:d})," is Not Found"]}),Object(P.jsx)(le.a,{open:m,className:t.root,TransitionComponent:ye,autoHideDuration:1e4,onClose:O,children:Object(P.jsxs)(se.a,{variant:"standard",color:"error",action:Object(P.jsx)(D.a,{"aria-label":"close",color:"inherit",size:"small",onClick:O,children:Object(P.jsx)(pe.a,{color:"inherit",fontSize:"inherit"})}),icon:Object(P.jsx)("span",{className:"material-icons-outlined",children:"error_outline"}),onClose:O,severity:"error",children:[Object(P.jsx)("code",{children:d})," is Not Found"]})})]}),Object(P.jsx)(L,{classes:t})]})}var we=a(33),Ce=(a(138),Object(h.a)((function(e){return{root:{},menuButton:{},appBar:{marginLeft:e.spacing(1)},drawerTitle:{flexGrow:1,letterSpacing:0,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},title:{flexGrow:1,letterSpacing:0,color:"#000000DE",cursor:"pointer",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)",textDecoration:"none"},fontSize:1.5*e.typography.fontSize},main:{background:"#f9f9f9",minHeight:"79vh",maxWidth:"100vw",overflow:"scroll",margin:e.spacing(2),display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"},footer:{margin:e.spacing(0),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"4vh",padding:e.spacing(2,0,2,0),backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]},listItem:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},icon:{fill:e.palette.primary,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},listItemText:{fontSize:1.15*e.typography.fontSize},active:{backgroundColor:"rgba(0, 0, 0, 0.23)"},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:{display:"flex"}}})));function Se(){var e=Ce(),t={isloaded:!1,users:[],mobileOpen:!1},a=Object(n.useState)(t.mobileOpen),r=Object(b.a)(a,2),i=r[0],c=r[1],o=Object(n.useState)(t.isLoaded),s=Object(b.a)(o,2),l=s[0],j=s[1],d=Object(n.useState)(t.users),p=Object(b.a)(d,2),h=p[0],u=p[1],m=[{text:"SIGN IN",icon:Object(P.jsx)("span",{className:"material-icons-outlined",children:"login"}),path:"/signin"},{text:"SIGN UP",icon:Object(P.jsx)("span",{className:"material-icons-outlined",children:"person_add_alt"}),path:"/signup"},{text:"DASHBOARD",icon:Object(P.jsx)("span",{className:"material-icons",children:"dashboard"}),path:"/dashboard"}],x=function(){var e=Object(M.a)(G.a.mark((function e(){var t,a,n;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/users");case 2:return t=e.sent,e.next=5,t.json();case 5:if(a=e.sent,t.ok){e.next=11;break}throw n="An error has occured: ".concat(t.status),new Error(n);case 11:return u(Object(we.a)(a)),e.abrupt("return",a);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){j(!1),setTimeout((function(){x()}),3e3),j(!0)}),[t.users]),Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(Oe,{classes:e,menuItems:m,mobileOpen:i,setMobileOpen:c,handleDrawerToggle:function(){c(!i)}}),Object(P.jsx)("main",{className:e.main,children:h.length>0&&!0===l?h.map((function(e){return Object(P.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",margin:".5rem",textAlign:"center",flexDirection:"column",justifyContent:"center",alignItems:"center",fontFamily:"monospace"},children:[Object(P.jsx)("h2",{children:e.login}),Object(P.jsx)("img",{src:e.avatar_url,style:{width:"300px",borderRadius:8},alt:e.name}),Object(P.jsx)("a",{href:e.html_url,onClick:function(t){t.preventDefault(),window.open(e.html_url,"_blank")},style:{display:"block",color:"#000",margin:"1rem"},children:"Goto Giyhub Profile"})]},e.id)})):Object(P.jsx)(R.a,{color:"inherit"})}),Object(P.jsx)(L,{classes:e})]})}var ke=Object(h.a)((function(e){return{root:{},menuButton:{},appBar:{marginLeft:e.spacing(1)},drawerTitle:{flexGrow:1,letterSpacing:0,textDecoration:"none",color:"#000000DE",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)"}},title:{flexGrow:1,letterSpacing:0,color:"#000000DE",cursor:"pointer",transition:".4s","&:hover":{color:p.a[900],filter:"drop-shadow(0px 0px 1px inherit)",textDecoration:"none"},fontSize:1.5*e.typography.fontSize},main:{background:"#f9f9f9",minHeight:"79vh",padding:e.spacing(2,0),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},footer:{margin:e.spacing(0),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"4vh",padding:e.spacing(2,0,2,0),backgroundColor:"light"===e.palette.type?e.palette.grey[200]:e.palette.grey[800]},listItem:{display:"flex",justifyContent:"space-evenly",alignItems:"center"},icon:{fill:e.palette.primary,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},listItemText:{fontSize:1.15*e.typography.fontSize},active:{backgroundColor:"rgba(0, 0, 0, 0.23)"},avatar:{marginLeft:e.spacing(1),width:e.spacing(3),height:e.spacing(3)},toolbar:{display:"flex"}}})),Ne=Object(j.a)({root:{transition:"1s"},palette:{primary:{main:"#fefefe"},secondary:p.a},typography:{fontFamily:"Quicksand",fontWeightLight:400,fontWeightRegular:500,fontWeightMedium:600,fontWeightBold:700}});var De=function(){return ke(),Object(P.jsx)(P.Fragment,{children:Object(P.jsx)(d.a,{theme:Ne,children:Object(P.jsx)(s.a,{children:Object(P.jsxs)(l.c,{children:[Object(P.jsx)(l.a,{exact:!0,path:"/",children:Object(P.jsx)(Se,{})}),Object(P.jsx)(l.a,{path:"/dashboard",children:Object(P.jsx)(oe,{})}),Object(P.jsx)(l.a,{path:"*",children:Object(P.jsx)(ve,{})})]})})})})};c.a.render(Object(P.jsx)(r.a.StrictMode,{children:Object(P.jsx)(De,{})}),document.querySelector("#root")),o()}},[[139,1,2]]]);
//# sourceMappingURL=main.d5158136.chunk.js.map