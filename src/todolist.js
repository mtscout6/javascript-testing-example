define(['knockout'], function(ko){
  var TodoItem = function(title){
        var self = this;

        self.title = ko.observable(title);
        self.isComplete = ko.observable(false);
      },
      TodoListViewModel = function(){
        var self = this;

        self.tasks = ko.observableArray([]);

        self.newTaskTitle = ko.observable('');

        self.addTask = function(){
          self.tasks.push(new TodoItem(self.newTaskTitle()));
          self.newTaskTitle('');
        };

        self.removeTask = function(task){
          self.tasks.remove(task);
        };

        self.incompleteTasks = ko.computed(function() {
          return ko.utils.arrayFilter(self.tasks(), function(task) {
            return !task.isComplete();
          });
        });
      };

  return TodoListViewModel;
});
