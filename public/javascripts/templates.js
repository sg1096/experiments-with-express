(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li id=\"user-"
    + alias4(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"card-wrap\">\n		<div class=\"img-wrap\">\n			<img src=\""
    + alias4(((helper = (helper = helpers.imgSrc || (depth0 != null ? depth0.imgSrc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imgSrc","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" />\n		</div>\n		<div class=\"detail-wrap\">\n			<div class=\"name ellipsis\"><a>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></div>\n			<div class=\"sub-head ellipsis\"><a><span>Location:</span>&nbsp;<span title=\""
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</span></a></div>\n			<div class=\"sub-head ellipsis\"><a><span>Followers:</span>&nbsp;"
    + alias4(((helper = (helper = helpers.followers || (depth0 != null ? depth0.followers : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"followers","hash":{},"data":data}) : helper)))
    + "</a></div>\n		</div>\n		<span class=\"close-icon\" data-id=\""
    + alias4(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data}) : helper)))
    + "\">x</span>\n	</div>\n</li>";
},"useData":true});
})();