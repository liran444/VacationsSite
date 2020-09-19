(this.webpackJsonpvacationsreact=this.webpackJsonpvacationsreact||[]).push([[0],{187:function(e,t,a){e.exports=a(408)},192:function(e,t,a){},193:function(e,t,a){},194:function(e,t,a){},216:function(e,t,a){},218:function(e,t,a){},219:function(e,t,a){},22:function(e,t){e.exports={server_url:"http://localhost"}},220:function(e,t,a){},278:function(e,t,a){},308:function(e,t){},311:function(e,t,a){},312:function(e,t,a){},407:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(18),o=a.n(s);a(192),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,c=a(10),l=a(12),d=a(14),u=a(13),p=a(51),m=a(17),h=(a(193),a(194),a(164)),v=a(82);!function(e){e[e.GetAllVacations=0]="GetAllVacations",e[e.Login=1]="Login",e[e.AddVacation=2]="AddVacation",e[e.GetUserDataFromSessionStorage=3]="GetUserDataFromSessionStorage",e[e.GetAllDestinations=4]="GetAllDestinations",e[e.ChangeAdminState=5]="ChangeAdminState",e[e.StoreVacationUnderEdit=6]="StoreVacationUnderEdit",e[e.UpdateStoredVacation=7]="UpdateStoredVacation",e[e.UpdateIsFollowing=8]="UpdateIsFollowing",e[e.ChangeUserState=9]="ChangeUserState",e[e.DeleteVacation=10]="DeleteVacation"}(i||(i={}));var g=a(19),f=a.n(g);var _=Object(h.a)((function(e,t){var a=Object(v.a)({},e);switch(t.type){case i.ChangeUserState:a.user_state=t.payload;break;case i.GetAllVacations:a.vacations=t.payload;break;case i.DeleteVacation:a.vacations=a.vacations.filter((function(e){return e.id!=t.payload}));break;case i.Login:a.loggedInUser=t.payload;break;case i.AddVacation:a.vacations.push(t.payload);break;case i.GetAllDestinations:a.destinations=t.payload;break;case i.ChangeAdminState:a.admin_state=t.payload;break;case i.StoreVacationUnderEdit:a.vacation_under_edit=t.payload.vacation,a.admin_state=t.payload.admin_state;break;case i.UpdateStoredVacation:a.vacations.find((function(e){if(e.id===t.payload.id)return e.image_file_name=t.payload.image_file_name,e.description=t.payload.description,e.destination=t.payload.destination,e.destination_id=t.payload.destination_id,e.price=t.payload.price,e.start_date=t.payload.start_date,e.end_date=t.payload.end_date,e}));break;case i.UpdateIsFollowing:a.vacations.find((function(e){return e.id===t.payload.id&&(e.is_following=t.payload.is_following),e}));break;case i.GetUserDataFromSessionStorage:a.loggedInUser=JSON.parse(sessionStorage.getItem("user_data")),a.loggedInUser&&(f.a.defaults.headers.common.Authorization="Bearer "+a.loggedInUser.token)}return a}),new function e(){Object(c.a)(this,e),this.vacations=[],this.destinations=[],this.loggedInUser={},this.admin_state="default",this.vacation_under_edit={},this.user_state="default"}),b=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).unsubscribeStore=void 0,n.store=void 0,n.logout=function(){sessionStorage.removeItem("user_data"),_.dispatch({type:i.Login,payload:null})},n.state={loggedInUser:null,user_state:"default"},n.store={email:"vacations4u.email.com",phone:"+972-50-455-0188"},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.unsubscribeStore=_.subscribe((function(){return e.setState({loggedInUser:_.getState().loggedInUser,user_state:_.getState().user_state})})),_.dispatch({type:i.GetUserDataFromSessionStorage,payload:null})}},{key:"componentWillUnmount",value:function(){this.unsubscribeStore()}},{key:"render",value:function(){var e;return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-inverse navbar-fixed-top"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"navbar-header"},r.a.createElement("span",{id:"profile"},"Welcome ",null===(e=this.state.loggedInUser)||void 0===e?void 0:e.firstname," to Vacations4U!"),null!==this.state.loggedInUser&&r.a.createElement(p.b,{to:"/login",exact:!0,onClick:this.logout,className:"btn btn-danger headerButton"},"Log-out"),!this.state.loggedInUser&&"REGISTER"===this.state.user_state&&r.a.createElement(p.b,{to:"/login",exact:!0,className:"btn btn-primary headerButton"},"Login"),!this.state.loggedInUser&&"LOGIN"===this.state.user_state&&r.a.createElement(p.b,{to:"/register",exact:!0,className:"btn btn-primary headerButton"},"Register")),r.a.createElement("div",{className:"topRightCornerDiv"},r.a.createElement("div",{className:"float-right contactUsDiv"},r.a.createElement("p",{className:"infoText"},"Contact Us:"," ",r.a.createElement("span",null," ",this.store.phone," - ",this.store.email," "))),r.a.createElement("div",{id:"myNavbar"},r.a.createElement("ul",{className:"nav navbar-nav navbar-right navbarUl"}))))))}}]),a}(n.Component),S=(a(216),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).owner="Liran Dekamhi",e.currentYear=(new Date).getFullYear(),e}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("p",{className:"footer"},"\xa9 Copyrights reservered to ",this.owner," - ",this.currentYear))}}]),a}(n.Component)),E=a(176),y=a(6),w=a.n(y),k=a(11),C=(a(218),a(22)),D=a.n(C),x=a(443),O=a(449),j=a(442),M=a(441),I=a(440),V=(a(219),a(52)),N=a.n(V),U=(a(220),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(l.a)(a,[{key:"render",value:function(){var e;return r.a.createElement("div",null,r.a.createElement("select",{name:this.props.name,onChange:this.props.onOptionSelected,value:(null===(e=this.props.selected)||void 0===e?void 0:e.id)?JSON.stringify(this.props.selected):"default"},r.a.createElement("option",{disabled:!0,value:"default",key:"default"},this.props.placeholder),this.props.options.map((function(e,t){return r.a.createElement("option",{value:JSON.stringify(e),key:t},e.name)}))))}}]),a}(n.Component)),F=(a(221),function e(t,a,n,r,s,o,i,l,d,u){Object(c.a)(this,e),this.id=t,this.destination_id=a,this.destination=n,this.description=r,this.start_date=s,this.end_date=o,this.price=i,this.image_file_name=l,this.image_file=d,this.is_following=u}),A=a(166),B=a.n(A),G=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).unsubscribeStore=void 0,n.min_date=void 0,n.errorMessage=void 0,n.fileInput=void 0,n.initState=function(){var e,t,a,r,s,o;n.setState({chosen_destination:{id:null===(e=_.getState().vacation_under_edit)||void 0===e?void 0:e.destination_id,name:null===(t=_.getState().vacation_under_edit)||void 0===t?void 0:t.destination},start_date:new Date(null===(a=_.getState().vacation_under_edit)||void 0===a?void 0:a.start_date),end_date:new Date(null===(r=_.getState().vacation_under_edit)||void 0===r?void 0:r.end_date),description:null===(s=_.getState().vacation_under_edit)||void 0===s?void 0:s.description,price:null===(o=_.getState().vacation_under_edit)||void 0===o?void 0:o.price})},n.initDates=function(){var e=new Date;n.min_date.setDate(n.min_date.getDate()+1),e.setDate(e.getDate()+2),n.setState({start_date:n.min_date}),n.setState({end_date:e})},n.getAllDestinations=Object(k.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==_.getState().destinations.length){e.next=15;break}return e.prev=1,e.next=4,f.a.get("".concat(D.a.server_url,"/destinations/"));case 4:t=e.sent,_.dispatch({type:i.GetAllDestinations,payload:t.data}),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),n.errorMessage="Failed to get Destinations, "+e.t0.response.data,n.setState({is_modal_open:!0});case 13:e.next=16;break;case 15:n.setState({destinations:_.getState().destinations});case 16:case"end":return e.stop()}}),e,null,[[1,8]])}))),n.onStartDateSelected=function(e){var t=e;n.setState({start_date:t})},n.onEndDateSelected=function(e){var t=e;n.setState({end_date:t})},n.onDestinationSelectedHandler=function(e){var t=JSON.parse(e.target.value);n.setState({chosen_destination:t})},n.areChosenDatesValid=function(){var e=n.state,t=e.start_date,a=e.end_date;return new Date(t)<new Date(a)||(n.errorMessage="The ending date must be greater than the starting date",!1)},n.onDescriptionChanged=function(e){var t=e.target.value;n.setState({description:t})},n.onPriceChanged=function(e){var t=+e.target.value;n.setState({price:t})},n.addVacation=Object(k.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new F(null,n.state.chosen_destination.id,n.state.chosen_destination.name,n.state.description,n.state.start_date.toISOString().split("T")[0],n.state.end_date.toISOString().split("T")[0],n.state.price,n.state.vacation_under_edit.image_file_name),e.next=4,f.a.post("".concat(D.a.server_url,"/vacations/"),t);case 4:n.props.onClose(),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to add Vacation, "+(null===(a=e.t0.response)||void 0===a?void 0:a.data),n.setState({is_modal_open:!0});case 12:case"end":return e.stop()}}),e,null,[[0,7]])}))),n.editVacation=Object(k.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new F(n.state.vacation_under_edit.id,n.state.chosen_destination.id,n.state.chosen_destination.name,n.state.description,n.state.start_date.toISOString().split("T")[0],n.state.end_date.toISOString().split("T")[0],n.state.price,n.state.vacation_under_edit.image_file_name),e.next=4,f.a.put("".concat(D.a.server_url,"/vacations/"),t);case 4:n.props.onClose(),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to edit Vacation, "+(null===(a=e.t0.response)||void 0===a?void 0:a.data),n.setState({is_modal_open:!0});case 12:case"end":return e.stop()}}),e,null,[[0,7]])}))),n.onFormSubmitted=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),"Adding"!==n.state.admin_state){e.next=4;break}return e.next=4,n.addVacation();case 4:if("Editing"!==n.state.admin_state){e.next=7;break}return e.next=7,n.editVacation();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.areTextInputsValid=function(){var e=n.state,t=e.description,a=e.price,r=t.trim().length;return r<4||r>45?(n.errorMessage="Description must contain between 4 - 45 letters",!1):!(isNaN(a)||a<100)||(n.errorMessage="Price must be 100$ or greater",!1)},n.isFormValid=function(){return!!(n.areChosenDatesValid()&&n.areTextInputsValid()&&n.isVacationImageValid())},n.uploadImage=function(){var e=Object(k.a)(w.a.mark((function e(t){var a,r,s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(a=new B.a).append("image",t,t.name),e.next=5,f.a.post("".concat(D.a.server_url,"/vacations/upload_image_file/"),a);case 5:return r=e.sent,s=r.data,e.abrupt("return",s);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to upload image, "+e.t0.response.data,n.setState({is_modal_open:!0});case 15:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),n.setImage=function(){var e=Object(k.a)(w.a.mark((function e(t){var a,r,s,o;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.files[0],e.next=3,n.uploadImage(a);case 3:(r=e.sent)&&((s=Object(v.a)({},n.state.vacation_under_edit)).image_file=a,s.image_file_name=""+r,n.setState({vacation_under_edit:s}),(o=new FileReader).onload=function(e){return n.setState({preview:e.target.result.toString()})},o.readAsDataURL(a));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={admin_state:"default",vacation_under_edit:_.getState().vacation_under_edit,destinations:[],chosen_destination:null,description:"",start_date:null,end_date:null,price:null,is_modal_open:!1,preview:""},n.min_date=new Date,n.errorMessage="",n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(k.a)(w.a.mark((function e(){var t=this;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.unsubscribeStore=_.subscribe((function(){return t.setState({destinations:_.getState().destinations,vacation_under_edit:_.getState().vacation_under_edit,admin_state:_.getState().admin_state})})),null!==_.getState().vacation_under_edit?this.initState():this.initDates(),this.setState({admin_state:_.getState().admin_state}),e.next=5,this.getAllDestinations();case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"isVacationImageValid",value:function(){var e;return!!(null===(e=this.state.vacation_under_edit)||void 0===e?void 0:e.image_file_name)||(this.errorMessage="Please Select Image",!1)}},{key:"componentWillUnmount",value:function(){this.unsubscribeStore()}},{key:"onModalClosed",value:function(){this.setState({is_modal_open:!1}),this.errorMessage=""}},{key:"render",value:function(){var e,t,a=this;return r.a.createElement("div",{className:"vacation-form"},r.a.createElement("form",{className:"vacation-form",onSubmit:function(e){a.onFormSubmitted(e)}},r.a.createElement("div",null,r.a.createElement(U,{name:"groupsSelectBox",placeholder:"-- Select Destination --",options:this.state.destinations,selected:this.state.chosen_destination,onOptionSelected:function(e){a.onDestinationSelectedHandler(e)}}),(null===(e=this.state.chosen_destination)||void 0===e?void 0:e.id)&&r.a.createElement("div",null,r.a.createElement("input",{className:"uploadInput",type:"file",onChange:this.setImage,accept:"image/*",ref:function(e){return a.fileInput=e}}),r.a.createElement("button",{type:"button",className:"uploadButton",onClick:function(){return a.fileInput.click()}},"Select Vacation Image"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("img",{src:(null===(t=this.state.vacation_under_edit)||void 0===t?void 0:t.image_file_name)?"".concat(D.a.server_url,"/uploads/").concat(this.state.vacation_under_edit.image_file_name):this.state.preview}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("span",{className:"formSpan"},"Description:"),r.a.createElement("input",{type:"text",placeholder:"* Enter Description...",name:"description",value:this.state.description,onChange:this.onDescriptionChanged}),r.a.createElement("span",{className:"formSpan"},"Start Date:"),r.a.createElement(N.a,{selected:this.state.start_date,onChange:function(e){a.onStartDateSelected(e)},selectsStart:!0,startDate:this.state.start_date,minDate:this.min_date,endDate:this.state.end_date}),r.a.createElement("span",{className:"formSpan"},"End Date:"),r.a.createElement(N.a,{selected:this.state.end_date,onChange:function(e){a.onEndDateSelected(e)},selectsEnd:!0,startDate:this.state.start_date,minDate:this.min_date,endDate:this.state.end_date}),r.a.createElement("span",{className:"formSpan"},"Total Price:"),r.a.createElement("input",{type:"number",placeholder:"* Enter Price",name:"price",value:this.state.price||"",onChange:this.onPriceChanged}),!this.isFormValid()&&r.a.createElement("div",{className:"alertMessage"},r.a.createElement("span",null,this.errorMessage)),this.isFormValid()&&r.a.createElement("div",{className:"center"},r.a.createElement("input",{type:"submit",className:"submitButton"}))))),this.state.is_modal_open&&r.a.createElement(P,{open:this.state.is_modal_open,onClose:function(){return a.onModalClosed()},errorMessage:this.errorMessage}))}}]),a}(n.Component),P=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(O.a,{open:this.props.open,onClose:function(){return e.props.onClose()},"aria-labelledby":"responsive-dialog-title"},r.a.createElement(I.a,{id:"responsive-dialog-title",className:"formHeader addVacation"},this.props.errorMessage?"Error!":this.props.admin_state+" A Vacation",r.a.createElement("hr",null)),r.a.createElement(M.a,null,this.props.errorMessage?this.props.errorMessage:r.a.createElement(G,{onClose:function(){return e.props.onClose()}})),r.a.createElement(j.a,null,r.a.createElement(x.a,{autoFocus:!0,onClick:function(){return e.props.onClose()},color:"primary"},"Close"))))}}]),a}(n.Component),L=(a(278),a(444)),T=a(448),R=a(446),J=a(445),W=a(415),z=a(172),H=a.n(z),Y=a(173),$=a.n(Y),q=a(447),K=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).unsubscribeStore=void 0,n.state={loggedInUser:_.getState().loggedInUser},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(k.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e,t=this;return r.a.createElement("div",{className:"vacation"},r.a.createElement(L.a,{className:"root"},r.a.createElement(J.a,{className:"media",image:D.a.server_url+"/uploads/"+this.props.vacation.image_file_name,title:this.props.vacation.destination}),r.a.createElement(R.a,null,"ADMIN"===(null===(e=this.state.loggedInUser)||void 0===e?void 0:e.user_type)&&r.a.createElement("div",null,r.a.createElement(q.a,{"aria-label":"edit",color:"primary",onClick:function(){return t.props.onEditClicked(t.props.vacation)}},r.a.createElement(H.a,null)),r.a.createElement(q.a,{"aria-label":"delete",onClick:function(){return t.props.onDeleteClicked(t.props.vacation.id)}},r.a.createElement($.a,null))),r.a.createElement(W.a,{gutterBottom:!0,variant:"h5",component:"h2"},this.props.vacation.destination),r.a.createElement(W.a,{variant:"body2",color:"textSecondary",component:"p",className:"description"},this.props.vacation.description),r.a.createElement(W.a,{variant:"body2",color:"textSecondary",component:"span",className:"description"},"Only ",this.props.vacation.price,"$")),r.a.createElement(T.a,{className:"d-flex"},r.a.createElement(x.a,{size:"small",color:"primary",onClick:function(){t.props.onFollowButtonClicked(t.props.vacation)}},this.props.vacation.is_following?"Unfollow":"Follow"),r.a.createElement("div",{className:"ml-auto p-2"},r.a.createElement("span",{className:"startDate"},this.props.vacation.start_date," -"," "),r.a.createElement("span",{className:"endDate"},this.props.vacation.end_date)))))}}]),a}(n.Component),Q=a(174),X=a.n(Q),Z=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).unsubscribeStore=void 0,n.admin_state=void 0,n.vacation_under_edit=void 0,n.errorMessage=void 0,n.min_date=void 0,n.onStartDateSelected=function(e){var t=n.fixDate(e);n.setState({start_date:t})},n.onEndDateSelected=function(e){var t=n.fixDate(e);n.setState({end_date:t})},n.onDescriptionInputChanged=function(e){var t=e.target.value;n.setState({description:t})},n.getAllVacations=Object(k.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("".concat(D.a.server_url,"/vacations/"));case 3:t=e.sent,_.dispatch({type:i.GetAllVacations,payload:t.data}),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to get Vacations, "+(null===(a=e.t0.response)||void 0===a?void 0:a.data),n.setState({is_modal_open:!0});case 12:case"end":return e.stop()}}),e,null,[[0,7]])}))),n.onDeleteVacationClicked=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.delete("".concat(D.a.server_url,"/vacations/").concat(t));case 3:e.next=10;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to delete Vacation, "+e.t0.response.data,n.setState({is_modal_open:!0});case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}(),n.unfollowVacation=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.delete("".concat(D.a.server_url,"/followers/unfollow?vacation_id=").concat(t.id));case 3:t.is_following=!1,_.dispatch({type:i.UpdateIsFollowing,payload:t}),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to unfollow Vacation, "+e.t0.response.data,n.setState({is_modal_open:!0});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),n.followVacation=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("".concat(D.a.server_url,"/followers/follow?vacation_id=").concat(t.id));case 3:t.is_following=!0,_.dispatch({type:i.UpdateIsFollowing,payload:t}),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to follow Vacation, "+e.t0.response.data,n.setState({is_modal_open:!0});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),n.onFollowButtonClicked=function(){var e=Object(k.a)(w.a.mark((function e(t){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=t.is_following)){e.next=6;break}return e.next=4,n.unfollowVacation(t);case 4:e.next=9;break;case 6:if(a&&void 0!==a){e.next=9;break}return e.next=9,n.followVacation(t);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={vacations:[],is_modal_open:!1,loggedInUser:_.getState().loggedInUser,start_date:null,end_date:null,description:"",socket:null},n.admin_state="default",n.vacation_under_edit=null,n.errorMessage="",n.min_date=new Date,n.min_date.setDate(n.min_date.getDate()+1),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(k.a)(w.a.mark((function e(){var t,a=this;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.unsubscribeStore=_.subscribe((function(){var e=_.getState().loggedInUser;a.setState({vacations:_.getState().vacations,loggedInUser:e})})),t=X()("http://localhost:3002"),this.setState({socket:t}),t.on("edit-vacation",(function(e){_.dispatch({type:i.UpdateStoredVacation,payload:e})})),t.on("delete-vacation",(function(e){_.dispatch({type:i.DeleteVacation,payload:e})})),t.on("add-vacation",(function(e){console.log("vacation.id",e.id),_.dispatch({type:i.AddVacation,payload:e})})),e.next=8,this.getAllVacations();case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fixDate",value:function(e){if(e){var t=e;return t.setMinutes(300),t}return null}},{key:"onEditVacationClicked",value:function(e){this.setState({is_modal_open:!0}),this.admin_state="Editing",this.vacation_under_edit=e,_.dispatch({type:i.StoreVacationUnderEdit,payload:{vacation:e,admin_state:this.admin_state}})}},{key:"onAddVacationClicked",value:function(){this.setState({is_modal_open:!0}),this.admin_state="Adding",_.dispatch({type:i.StoreVacationUnderEdit,payload:{vacation:null,admin_state:this.admin_state}})}},{key:"onModalClosed",value:function(){this.setState({is_modal_open:!1}),this.admin_state="default",this.errorMessage="",_.dispatch({type:i.StoreVacationUnderEdit,payload:{vacation:null,admin_state:this.admin_state}})}},{key:"onStatisticsClicked",value:function(){this.props.history.push("/adminReports")}},{key:"componentWillUnmount",value:function(){this.unsubscribeStore()}},{key:"render",value:function(){var e,t=this;console.log(this.state.vacations);var a=Object(E.a)(this.state.vacations).filter((function(e){return t.state.start_date?e.start_date===t.state.start_date.toISOString().split("T")[0]:1})).filter((function(e){var a;return t.state.end_date?e.end_date===(null===(a=t.state.end_date)||void 0===a?void 0:a.toISOString().split("T")[0]):1})).filter((function(e){return t.state.description?e.description.toLowerCase().includes(t.state.description.toLowerCase()):1}));return r.a.createElement("div",{className:"mainPage"},r.a.createElement("div",{className:"flexDiv"},r.a.createElement("div",{className:"searchBar"},r.a.createElement("span",{className:"formSpan"},"Search Bar:"),r.a.createElement(N.a,{selected:this.state.start_date,onChange:function(e){t.onStartDateSelected(e)},placeholderText:"Start Date",minDate:this.min_date,isClearable:!0}),r.a.createElement(N.a,{selected:this.state.end_date,onChange:function(e){t.onEndDateSelected(e)},placeholderText:"End Date",minDate:this.min_date,isClearable:!0}),r.a.createElement("input",{type:"text",placeholder:"Description",name:"description",value:this.state.description,onChange:this.onDescriptionInputChanged})),"ADMIN"===(null===(e=this.state.loggedInUser)||void 0===e?void 0:e.user_type)&&r.a.createElement("div",{className:"adminNavDiv"},r.a.createElement(x.a,{variant:"contained",color:"primary",className:"statisticsButton",onClick:function(){return t.onStatisticsClicked()}},"Statistics"),r.a.createElement(x.a,{variant:"contained",color:"primary",className:"addVacationButton",onClick:function(){return t.onAddVacationClicked()}},"Add Vacation"))),a.map((function(e,a){return r.a.createElement(K,{vacation:e,key:a,is_following:e.is_following,onEditClicked:function(e){t.onEditVacationClicked(e)},onDeleteClicked:function(e){t.onDeleteVacationClicked(e)},onFollowButtonClicked:function(e){t.onFollowButtonClicked(e)}})})),0===a.length&&r.a.createElement("h3",{className:"noDataText"},"No Vacations Found"),this.state.is_modal_open&&r.a.createElement(P,{open:this.state.is_modal_open,admin_state:this.admin_state,onClose:function(){return t.onModalClosed()},errorMessage:this.errorMessage}))}}]),a}(n.Component),ee=(a(311),function e(t,a){Object(c.a)(this,e),this.username=t,this.password=a}),te=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).errorMessage=void 0,n.onUsernameInputChanged=function(e){var t=e.target.value;n.setState({username:t})},n.onPasswordInputChanged=function(e){var t=e.target.value;n.setState({password:t})},n.login=Object(k.a)(w.a.mark((function e(){var t,a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new ee(n.state.username,n.state.password),e.next=4,f.a.post("".concat(D.a.server_url,"/users/login"),t);case 4:a=e.sent,r=a.data,f.a.defaults.headers.common.Authorization="Bearer "+r.token,_.dispatch({type:i.Login,payload:r}),sessionStorage.setItem("user_data",JSON.stringify(r)),n.props.history.push("/mainPage"),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to log-in, "+e.t0.response.data,n.setState({is_modal_open:!0});case 17:case"end":return e.stop()}}),e,null,[[0,12]])}))),n.state={username:"",password:"",is_modal_open:!1},n.errorMessage="",n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){_.dispatch({type:i.ChangeUserState,payload:"LOGIN"})}},{key:"onModalClosed",value:function(){this.setState({is_modal_open:!1}),this.errorMessage=""}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"login"},r.a.createElement("input",{type:"text",placeholder:"Username",name:"username",value:this.state.username,onChange:this.onUsernameInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:this.state.password,onChange:this.onPasswordInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"button",value:"login",onClick:this.login}),this.state.is_modal_open&&r.a.createElement(P,{open:this.state.is_modal_open,onClose:function(){return e.onModalClosed()},errorMessage:this.errorMessage}))}}]),a}(n.Component),ae=(a(312),function e(t,a,n,r){Object(c.a)(this,e),this.firstname=t,this.lastname=a,this.username=n,this.password=r}),ne=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).errorMessage=void 0,n.onFirstnameInputChanged=function(e){var t=e.target.value;n.setState({firstname:t})},n.onLastnameInputChanged=function(e){var t=e.target.value;n.setState({lastname:t})},n.onUsernameInputChanged=function(e){var t=e.target.value;n.setState({username:t})},n.onPasswordInputChanged=function(e){var t=e.target.value;n.setState({password:t})},n.register=Object(k.a)(w.a.mark((function e(){var t,a,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new ae(n.state.firstname,n.state.lastname,n.state.username,n.state.password),e.next=4,f.a.post("".concat(D.a.server_url,"/users/"),t);case 4:a=e.sent,r=a.data,f.a.defaults.headers.common.Authorization="Bearer "+r.token,_.dispatch({type:i.Login,payload:r}),sessionStorage.setItem("user_data",JSON.stringify(r)),n.props.history.push("/mainPage"),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to register, "+e.t0.response.data,n.setState({is_modal_open:!0});case 17:case"end":return e.stop()}}),e,null,[[0,12]])}))),n.isFormValid=function(){var e=n.state,t=e.firstname,a=e.lastname,r=e.username,s=e.password;return t.trim().length<3||t.trim().length>20?(n.errorMessage="Firstname must contain between 3 - 20 letters",!1):a.trim().length<3||a.trim().length>20?(n.errorMessage="Lastname must contain between 3 - 20 letters",!1):r.trim().length<4||r.trim().length>16?(n.errorMessage="Username must contain between 4 - 20 letters",!1):!(s.trim().length<4||s.trim().length>16)||(n.errorMessage="Password must contain between 4 - 16 letters",!1)},n.state={firstname:"",lastname:"",username:"",password:"",is_modal_open:!1},n.errorMessage="",n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){_.dispatch({type:i.ChangeUserState,payload:"REGISTER"})}},{key:"onModalClosed",value:function(){this.setState({is_modal_open:!1}),this.errorMessage=""}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"register"},r.a.createElement("input",{type:"text",placeholder:"Firstname",name:"firstname",value:this.state.firstname,onChange:this.onFirstnameInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",placeholder:"Lastname",name:"lastname",value:this.state.lastname,onChange:this.onLastnameInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",placeholder:"User name",name:"username",value:this.state.username,onChange:this.onUsernameInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:this.state.password,onChange:this.onPasswordInputChanged}),r.a.createElement("br",null),r.a.createElement("input",{type:"button",value:"login",disabled:!this.isFormValid(),onClick:this.register}),!this.isFormValid()&&r.a.createElement("div",{className:"alertMessage"},r.a.createElement("span",null,this.errorMessage)),this.state.is_modal_open&&r.a.createElement(P,{open:this.state.is_modal_open,onClose:function(){return e.onModalClosed()},errorMessage:this.errorMessage}))}}]),a}(n.Component),re=a(175),se=(a(407),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).errorMessage=void 0,n.options=void 0,n.getAllFollowersData=Object(k.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("".concat(D.a.server_url,"/followers/"));case 3:t=e.sent,console.log("response",t.data),n.displayData(t.data),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),n.errorMessage="Failed to get Vacations, "+(null===(a=e.t0.response)||void 0===a?void 0:a.data),n.setState({is_modal_open:!0});case 13:case"end":return e.stop()}}),e,null,[[0,8]])}))),n.state={data:null,is_modal_open:!1},n.options={maintainAspectRatio:!1,scales:{yAxes:[{ticks:{min:0,stepSize:1}}]}},n.errorMessage="",n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(k.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getAllFollowersData();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"displayData",value:function(e){var t=[],a=[];for(var n in e)console.log(n),Object.prototype.hasOwnProperty.call(e,n)&&(console.log("followersData",e[n]),t[n]="Vacation #".concat(e[n].vacation_id),a[n]=e[n].total_followers);var r={labels:[].concat(t),datasets:[{label:"Amount of Followers",backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:[].concat(a)}]};this.setState({data:r})}},{key:"onModalClosed",value:function(){this.setState({is_modal_open:!1}),this.errorMessage=""}},{key:"onGoBackButtonClicked",value:function(){this.props.history.push("/mainPage")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"graphContainer"},r.a.createElement("div",null,r.a.createElement("h2",null,"Admin Reports"),r.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.onGoBackButtonClicked()}},"Go Back")),this.state.data&&r.a.createElement(re.Bar,{data:this.state.data,width:100,height:500,options:this.options}),this.state.is_modal_open&&r.a.createElement(P,{open:this.state.is_modal_open,onClose:function(){return e.onModalClosed()},errorMessage:this.errorMessage}))}}]),a}(n.Component)),oe=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement("section",{className:"layout"},r.a.createElement("header",null,r.a.createElement(b,null)),r.a.createElement("main",null,r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/mainPage",component:Z,exact:!0}),r.a.createElement(m.b,{path:"/login",component:te,exact:!0}),r.a.createElement(m.b,{path:"/register",component:ne,exact:!0}),r.a.createElement(m.b,{path:"/adminReports",component:se,exact:!0}),r.a.createElement(m.a,{from:"/",to:"/login",exact:!0}),r.a.createElement(m.a,{from:"**",to:"/login",exact:!0}))),r.a.createElement("footer",null,r.a.createElement(S,null))))}}]),a}(n.Component);o.a.render(r.a.createElement(r.a.Fragment,null,r.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}),r.a.createElement("link",{href:"https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css",rel:"stylesheet"}),r.a.createElement("script",{src:"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}),r.a.createElement("script",{src:"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}),r.a.createElement("script",{src:"https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"}),r.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[187,1,2]]]);
//# sourceMappingURL=main.92f0e3f4.chunk.js.map