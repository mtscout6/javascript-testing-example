define(function(){
  var TodoItem = function(title){
        var self = this;

        self.title = title;
      },
      TodoListViewModel = function(){
        var self = this;

        self.tasks = [];
        self.addTask = function(title){
          self.tasks.push(new TodoItem(title));
        };
      };

  return TodoListViewModel;
});
