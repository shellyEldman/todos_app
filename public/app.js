$(document).ready(function() {
    $.getJSON('/api/todos')
    .then((data) => {
        addTodos(data);
    });

    $('#todoInput').on('keypress', function(e) {
        if(e.which === 13) {
            createTodo(e.target.value);
            $(this).val('');
        }
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });
});

const addTodos = (todos) => {
    todos.forEach(todo => {
        addTodo(todo);
    });
};

const addTodo = (todo) => {
    const newTodo = $('<li>' + todo.name + ' <span>X</span></li>');
    newTodo.addClass('task');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
};

const createTodo = (todo) => {
    $.post('/api/todos', {name: todo})
    .then(newTodo => {
        addTodo(newTodo);
    })
    .catch(err => {
        console.log(err);
    });
};

const removeTodo = (todo) => {
    const clickedId = todo.data('id');
    $.ajax({
        method: 'DELETE',
        url: `/api/todos/${clickedId}`
    })
    .then(() => {
        todo.remove();
    })
    .catch((err) => {
        console.log(err);
    })
};

const updateTodo = (todo) => {
    const clickedId = todo.data('id');
    const isDone = !todo.data('completed');
    const updatedData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${clickedId}`,
        data: updatedData
    })
    .then((updatedTodo) => {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    .catch((err) => {
        console.log(err);
    });
};