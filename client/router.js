Meteor.Router.add({
  '/stories': 'stories',
  '/episodes': 'episodes',
  '/episode': 'episode',
  '/stories/:id/episodes': function(id) {
  	Session.set('currentStoryId', id);
  	return 'episodes';
  },
  '/episodes/:id': function(id) {
  	Session.set('currentEpisodeId', id);
  	return 'episode';
  },
  '*': 'not_found'
});