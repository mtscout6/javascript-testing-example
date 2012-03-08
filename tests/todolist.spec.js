require(['../src/todolist'], function(TodoList){
  var buildViewModelWithTaskItems = function(itemCount){
    var viewModel = new TodoList();

    for(var i = 0; i < itemCount; i++){
      viewModel.addTask('Task ' + (i+1));
    }

    return viewModel;
  };

  describe('Todo List Tests', function(){
    it('Should Initialize', function(){
      var viewModel = new TodoList();
      expect(viewModel).toBeDefined();
    });

    it('Should add tasks', function(){
      var viewModel = new TodoList();

      expect(viewModel.tasks().length).toBe(0);
      viewModel.addTask('SomeTask');

      expect(viewModel.tasks().length).toBe(1);
      expect(viewModel.tasks()[0].title()).toBe('SomeTask');
    });

    it('Should leave added tasks in incomplete state', function(){
      var viewModel = new TodoList();
      viewModel.addTask('A Task');
      expect(viewModel.tasks()[0].isComplete()).toBe(false);
    });

    it('Should remove tasks', function(){
      var viewModel = buildViewModelWithTaskItems(3),
          tasks = [];

      expect(viewModel.tasks().length).toBe(3);

      for(var i = 0; i < viewModel.tasks().length; i++){
        tasks.push(viewModel.tasks()[i]);
      }

      viewModel.removeTask(tasks[1]);
      expect(viewModel.tasks().length).toBe(2);

      viewModel.removeTask(tasks[0]);
      expect(viewModel.tasks().length).toBe(1);

      viewModel.removeTask(tasks[2]);
      expect(viewModel.tasks().length).toBe(0);
    });

    it('Should not error when the same task is "removed" more than once', function(){
      var viewModel = buildViewModelWithTaskItems(3),
          task = viewModel.tasks()[1];

      expect(viewModel.tasks().length).toBe(3);

      viewModel.removeTask(task);
      expect(viewModel.tasks().length).toBe(2);

      viewModel.removeTask(task);
      expect(viewModel.tasks().length).toBe(2);
    });
  });
});
