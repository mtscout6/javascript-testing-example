require(['../src/todolist'], function(TodoList){
  var buildViewModelWithTaskItems = function(itemCount){
    var viewModel = new TodoList();

    for(var i = 0; i < itemCount; i++){
      viewModel.newTaskTitle('Task ' + (i+1));
      viewModel.addTask();
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
      viewModel.newTaskTitle('SomeTask');
      viewModel.addTask();

      expect(viewModel.tasks().length).toBe(1);
      expect(viewModel.tasks()[0].title()).toBe('SomeTask');
    });

    it('Should clear the new task title after it has been added', function(){
      var viewModel = new TodoList();
      viewModel.newTaskTitle('New Title');
      viewModel.addTask();
      expect(viewModel.newTaskTitle()).toBe('');
    });

    it('Should leave added tasks in incomplete state', function(){
      var viewModel = new TodoList();
      viewModel.newTaskTitle('A Task');
      viewModel.addTask();
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

    it('Should return incomplete tasks', function(){
      var viewModel = buildViewModelWithTaskItems(3);

      expect(viewModel.incompleteTasks().length).toBe(3);
      viewModel.tasks()[1].isComplete(true);
      expect(viewModel.incompleteTasks().length).toBe(2);

      expect(viewModel.incompleteTasks()[0].title()).toBe('Task 1');
      expect(viewModel.incompleteTasks()[1].title()).toBe('Task 3');
    });
  });
});
