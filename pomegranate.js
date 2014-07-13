if (Meteor.isClient) {
  Template.stories.stories = function(){
      return Stories.find({}, { sort: { time: -1 }});
  }
  Template.stories.events = {
    "keyup #new-story-description": function(event){
      if(event.which == 13){
        // Submit the form
        var name = document.getElementById('new-story-name');
        var description = document.getElementById('new-story-description');

        if(name.value != '' && description.value != ''){
          Stories.insert({
            name: name.value,
            description: description.value,
            ownerId: Meteor.user()._id,
            time: Date.now()
          });

          name.value = '';
          description.value = '';
        }
      }
    },
    "click .story": function(event){
      console.log(event.target);
      console.log(event);
    }
  }
  Template.episodes.episodes = function(){
      episodes = Episodes.find({}, { sort: { time: -1 }});
      return episodes.map(function(data, index){
        data.index = index + 1;
        return data
      });
  }
  Template.episodes.yourStories = function(){
      return Stories.find({ownerId:Meteor.user()._id}, { sort: { time: -1 }});
  }
  Template.episodes.currentStoryId = function(){
      return Session.get("currentStoryId");
  }
  Template.episode.episode = function(){
      return Episodes.findOne({_id:Session.get("currentEpisodeId")});
  }
  Template.episode.narratives = function(){
      return Narratives.find({episodeId:Session.get("currentEpisodeId")}).map(function(data){
        ownerNames = data.ownerName.split(" ")
        data.initials = ownerNames[0][0] + ownerNames[1][0]
        return data
      });
  }
  Template.episode.events = {
   "keyup #new-narrative-content": function(event){
      if(event.which == 13){
        // Submit the form
        var content = document.getElementById("new-narrative-content");

        if(content.value != ''){
          Narratives.insert({
            content: content.value,
            ownerId: Meteor.user()._id,
            ownerName: Meteor.user().profile.name,
            episodeId: Session.get("currentEpisodeId"),
            time: Date.now()
          });

          content.value = '';
        }
      }
    },
    "click .remove-episode-narrative": function(event){

      narrativeId = event.currentTarget.getAttribute('data-narrative-id');
      narrative = Narratives.findOne({_id:narrativeId})
      var r = confirm("You are about to remove the narrative:\n\n"+narrative.content);
      if (r == true) {
          Narratives.remove({_id:narrativeId});
      }
    },
  }
  Template.episodes.events = {
    "keydown #new-episode-description": function(event){
      if(event.which == 13){
        // Submit the form
        var name = document.getElementById('new-episode-name');
        var description = document.getElementById('new-episode-description');
        var storyId = document.getElementById('new-episode-story-id');

        if(name.value != '' && description.value != '' && storyId.value){
          Episodes.insert({
            name: name.value,
            description: description.value,
            ownerId: Meteor.user()._id,
            storyId: storyId.value,
            time: Date.now()
          });

          name.value = '';
          description.value = '';
        }
      }
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
