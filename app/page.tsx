'use client';

import type { Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';
import './../app/app.css';
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

export default function App() {

  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  //TODO作成
  function createTodo() {
    client.models.Todo.create({
      content: window.prompt('TODO'),
      category: window.prompt('CATEGORY'),
    });
  }

  //削除
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    
    //ログイン
    <Authenticator>
      {({ signOut, user }) => (

    <main>
      <h1>💗TODO LIST💗</h1>
      <button onClick={createTodo}>+ new🌠</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
            {todo.content}
            {todo.category}
          </li>
        ))}
      </ul>
      <div>
      新しいTODOを作成してみてください🐻
        <br />
        <a href='https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/'>
          チュートリアル🔰
        </a>
      </div>
          <button onClick={signOut}>サインアウト</button>
    </main>
      )}
      </Authenticator>
  );
}
