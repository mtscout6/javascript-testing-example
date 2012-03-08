require(['../src/todolist'], function(TodoList){
  describe('Todo List Tests', function(){
    var viewModel = new TodoList();
    expect(viewModel).toBeDefined();
  });
});
