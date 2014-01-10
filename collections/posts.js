Posts = new Meteor.Collection('posts');

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user(),
		postWithSameLink = Posts.findOne({url: postAttributes.url});

		//check that the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post new stories");

		//check that the post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, 'Please fill in a headline');

		// check that there is not another post with the same url
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302, 'This link has already been posted',
				postWithSameLink._id);
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url, 'title, 'message'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
})