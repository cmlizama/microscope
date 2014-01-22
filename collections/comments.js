Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		//check that the user is logged in
		if (!user)
			throw new Meteor.error(401, "You need to login to make comments");
		if (!commentAttributes.body)
			throw new Meteor.error(422, 'Please write some content');
		if (!post)
			throw new Meteor.Error(422, 'You must comment on a post');
		
		comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
			userId: user.id,
			author: user.username,
			submitted: new Date().getTime()
		});

		//update the post with the number of comments
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});

		return Comments.insert(comment);
	}
});