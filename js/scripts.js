headers = [	'id', 
			'created_at', 
			'name', 
			'inviter_id', 
			'level', 
			'base_upload_limit', 
			'post_upload_count', 
			'post_update_count', 
			'note_update_count', 
			'is_banned', 
			'can_approve_posts', 
			'can_upload_free', 
			'is_super_voter', 
			'level_string',
			//'deleted_posts'
			]
			
test = [49]
console.log(test)

user_list_url = "https://danbooru.donmai.us/users.json?commit=Search&search[can_upload_free]=true&search[order]=date&utf8=✓&limit=2"
deletion_count_url = "https://danbooru.donmai.us/counts/posts.json?tags=status%3Adeleted+user%3A"
// deletion_count_url = "https://danbooru.donmai.us/counts/posts.json"

this_del_count = 'unset'

function get_del_count(user_name){
	var retval = null;
	$.getJSON(deletion_count_url + user_name + '&limit=3')
		.done(function(json){
			console.log('inner:' + json.counts.posts);
			retval = json.counts.posts;
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;			
			console.log( "Request Failed: " + err );
	});
	console.log(retval);
	console.log(typeof(retval));
	return retval;
}

// function(data){	
		// $.each(data, function(key, val){
			// output.push(this.posts)
			
$(document).ready(function(){
   $.getJSON(user_list_url , function(data) {
	  var items = [];
	  items.push("<table>");
	  items.push("<thead>");
	  $.each(headers, function(id, header){
		items.push("<th>"+header+"</th>");
	  });
	  
	  items.push("</thead>");
	  $.each( data, function() {
		items.push( "<tr id='"+this.id+"'>");
		
		$.each(this, function(key, value){
			items.push( "<td>" + value + "</td>" );
		});

		/*console.log(this.name)
		console.log('outer: '+ get_del_count(this.name).notify())
		items.push("<td>" + get_del_count(this.name).notify() + "</td>");*/
		// console.log("outer:");
		// console.log(this_del_count);
				
		items.push( "</tr>");
	  });
	  items.push( "</table>");
	 
	  $( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "\n" )
	  }).appendTo( "#output" );
	});
});