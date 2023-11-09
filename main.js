'use strict';

{
   let todos; // todos変数を宣言!javascriptで変数を使用する前に変数を宣言する必要があるため記載

   if (localStorage.getItem('todos') === null) {
        todos = [];// todosが空欄の配列を記載
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));// todosにあるtodo内容を表示
    }

const savetodos=()=>{
    localStorage.setItem('todos', JSON.stringify(todos));// ローカルストレージにsaveするための関数
};
    
    const renderTodo = (todo) => {// HTMLは静的なもので、追加、削除、編集出来ないため、動的にするためにjavascriptで作成

        const input = document.createElement('input');//idやclassとしないのは、新たにHTML上にinputを作成しているため
        input.type = 'checkbox';//inputはconstで決めた定数名であり、名称をkariなどにした時も,typeなどは利用できる
        input.checked = todo.isCompleted;//★★★checkedはチェックボックスが現在チェックされているか否かを取得するもので、チェックされていればtrueを返す
        input.addEventListener('change',(item)=>{//★★★
            todos.forEach((item)=>{
                if(item.id===todo.id){
                    item.isCompleted=!item.isCompleted;
                }
            });
            savetodos();// チェックの都度結果がローカルサーバーに保存
        });

        const span = document.createElement('span');
        span.textContent = todo.title;// titleでなくてもいいが下のtodoで記載した名称と揃える必要がある

        const label = document.createElement('label');

        label.appendChild(input);
        label.appendChild(span);

        const button = document.createElement('button');
        button.textContent = 'X';
        button.addEventListener('click', () => {
            if (!confirm('Sure?')) {
                return;
            }
            li.remove();//リストにあるタスク要素をすべて削除 
           todos=todos.filter((item)=>{
                return item.id !==todo.id;
            });
            savetodos();

        });
        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(button);
        document.querySelector('#todos').appendChild(li);
    };

    const renderTodos = () => {//上記で一つ一つ作成されたtodoのすべてを管理するための関数
        todos.forEach((todo) => { 
            renderTodo(todo);
        });
    };

    document.querySelector('#add-form').addEventListener('submit', (e) => {
        e.preventDefault(); //submitは通常他のページに飛ぶことを想定したものであるため、他のページに飛ばないように引数を設定した上で標準機能を無効化する
        const input = document.querySelector('#add-form input');//#add-formの中のinputという意味でHTML上に作成するもの
        const todo = {//オブジェクトとして格納
            id:Date.now(),//秒単位の時間を記録するものを今回はid番号として利用
            title: input.value,
            isCompleted: false,
        };
        renderTodo(todo);//HTMLの場所を定義
        todos.push(todo);//全体の下に格納
        console.table(todos)//これはコンソールのためなくても機能
        savetodos();//結果をローカルサーバーに保存
        input.value = '';//実行されたら空欄にするもの
        input.focus();//実行されたら次が入力しやすいようにフォーカスをあてるもの
    });

document.querySelector('#purge').addEventListener('click',()=>{
    if (!confirm('Sure?')) {
        return;
    }
   todos=todos.filter((todo)=>{//実行新しい配列を作成する際にfillterを作成する時に利用
    return todo.isCompleted===false;//return構文で作成
    });
    savetodos()
    document.querySelectorAll('#todos li').forEach((li)=>{//すべてのリストを削除した上で更新された上記を再作成
        li.remove();
    });
    renderTodos();
});

    renderTodos();

}