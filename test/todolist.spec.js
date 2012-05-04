require(['src/todolist', 'should'], function(TodoList, should){
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
      should.exist(viewModel);
    });

    it('Should add tasks', function(){
      var viewModel = new TodoList();

      viewModel.tasks().length.should.equal(0);
      viewModel.newTaskTitle('SomeTask');
      viewModel.addTask();

      viewModel.tasks().length.should.equal(1);
      viewModel.tasks()[0].title().should.equal('SomeTask');
    });

    it('Should clear the new task title after it has been added', function(){
      var viewModel = new TodoList();
      viewModel.newTaskTitle('New Title');
      viewModel.addTask();
      viewModel.newTaskTitle().should.equal('');
    });

    it('Should leave added tasks in incomplete state', function(){
      var viewModel = new TodoList();
      viewModel.newTaskTitle('A Task');
      viewModel.addTask();
      viewModel.tasks()[0].isComplete().should.equal(false);
    });

    it('Should remove tasks', function(){
      var viewModel = buildViewModelWithTaskItems(3),
          tasks = [];

      viewModel.tasks().length.should.equal(3);

      for(var i = 0; i < viewModel.tasks().length; i++){
        tasks.push(viewModel.tasks()[i]);
      }

      viewModel.removeTask(tasks[1]);
      viewModel.tasks().length.should.equal(2);

      viewModel.removeTask(tasks[0]);
      viewModel.tasks().length.should.equal(1);

      viewModel.removeTask(tasks[2]);
      viewModel.tasks().length.should.equal(0);
    });

    it('Should not error when the same task is "removed" more than once', function(){
      var viewModel = buildViewModelWithTaskItems(3),
          task = viewModel.tasks()[1];

      viewModel.tasks().length.should.equal(3);

      viewModel.removeTask(task);
      viewModel.tasks().length.should.equal(2);

      viewModel.removeTask(task);
      viewModel.tasks().length.should.equal(2);
    });

    it('Should return incomplete tasks', function(){
      var viewModel = buildViewModelWithTaskItems(3);

      viewModel.incompleteTasks().length.should.equal(3);
      viewModel.tasks()[1].isComplete(true);
      viewModel.incompleteTasks().length.should.equal(2);

      viewModel.incompleteTasks()[0].title().should.equal('Task 1');
      viewModel.incompleteTasks()[1].title().should.equal('Task 3');
    });
  });
});
