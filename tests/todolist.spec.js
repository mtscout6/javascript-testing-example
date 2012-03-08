require(['../src/todolist'], function(TodoList){
  describe('Todo List Tests', function(){
    it('Should Initialize', function(){
      var viewModel = new TodoList();
      expect(viewModel).toBeDefined();
    });

    it('Should add tasks', function(){
      var viewModel = new TodoList();

      expect(viewModel.tasks.length).toBe(0);
      viewModel.addTask('SomeTask');

      expect(viewModel.tasks.length).toBe(1);
      expect(viewModel.tasks[0].title).toBe('SomeTask');
    });
  });
});
