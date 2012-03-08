define(['knockout'], function(ko){
  var TodoItem = function(title){
        var self = this;

        self.title = ko.observable(title);
        self.isComplete = ko.observable(false);
      },
      TodoListViewModel = function(){
        var self = this;

        self.tasks = ko.observableArray([]);
        self.addTask = function(title){
          self.tasks.push(new TodoItem(title));
        };
      };

  return TodoListViewModel;
});
