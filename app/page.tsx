"use client";
import Image from "next/image";
import styles from "./page.module.css";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { todo } from "node:test";
import Ahmed from "./components/Ahmed";

export default function Home() {

  const [todos, setToDos] = useState<Array<{ completed: boolean; text: string }>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandle = () => {
    if (inputRef.current) {
      const text = inputRef.current.value.trim();
      const newItem = { completed: false, text };
      if (todos.some(todo => todo.text === text)){
        alert("You have entered the same task");
        return;
      }
      if (text === "") {
        alert("Please Enter a task");
        return;
      }
      setToDos([...todos, newItem]);
      inputRef.current.value = "";
    }
  };

  const handleItemDone = (index = 0) => {
    const newToDos = todos.slice();
    newToDos[index].completed = !newToDos[index].completed;
    setToDos(newToDos);
  };

  const HandleDeleteItem = (index = 0) => {
    const newToDos = todos.slice();
    newToDos.splice(index,1);
    setToDos(newToDos)
  }

  console.log(todos);
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <h2 className={styles.fonth2}>To do-List</h2>

        <div className={styles.form}>
          <input ref={inputRef} placeholder="Add a task"></input>
          <button onClick={clickHandle}>Add</button>
        </div>

        <Ahmed />

        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className={styles.listDiv} key={index}>
                <li
                  className={completed ? styles.done : styles.waitfordone}
                  key={index}
                  onClick={() => handleItemDone(index)}>
                  <span className= {completed ? styles.finished : styles.notfinishedyet}></span>
                  {text}
                </li>

                <span onClick={() => HandleDeleteItem(index)} className={styles.removeItems}>X</span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
