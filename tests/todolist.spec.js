require(['../src/todolist'], function(TodoList){
  describe('Todo List Tests', function(){
    it('Should Initialize', function(){
      var viewModel = new TodoList();
      expect(viewModel).toBeDefined();
    });
  });
});
