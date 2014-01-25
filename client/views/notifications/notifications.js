Template.notifications.helpers({
	notifications: function() {
		return notifications.find({userId: Meteor.userId(), read: false})
	},
	notificationCount: function() {
		return notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});

Template.notification.helpers({
	notificationPostPath: function() {
		return Router.routes.postPage.path({_.id: this.postId});
	}
})

Template.notification.events({
	'click a': function() {
		notifications.update(this._id, {$set: {read: true}});
	}
})