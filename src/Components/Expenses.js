import ExpenseList from "./ExpenseList";
import classes from "./Expenses.module.css";
import React, { useEffect, useRef, useState } from "react";
const Expenses = () => {
  const moneyInputRef = useRef("");
  const descriptionInputRef = useRef("");
  const categoryInputRef = useRef("");
  const [expenses, setExpenses] = useState([]);

  const submithandler = (event) => {
    event.preventDefault();

    const money = moneyInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    fetch("https://profile-8d013-default-rtdb.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify({
        money: money,
        description: description,
        category: category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        const data = response.json();
        console.log(data);

        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            money: data[key].money,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(loadedExpenses);
      }
    });
  };

  async function getData() {
    const response = await fetch(
      "https://profile-8d013-default-rtdb.firebaseio.com/expenses.json"
    );
    if (response.ok) {
      const data = await response.json();

      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          money: data[key].money,
          description: data[key].description,
          category: data[key].category,
        });
      }
      setExpenses(loadedExpenses);
    } else {
      alert("failed to fetch data");
    }
  }
  getData();

  useEffect(() => {
    getData();
  });

  const deleteExpensehandler = (expenseId) => {
    fetch(
      `https://profile-8d013-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res.json());
      } else {
        alert("delete expenses failed");
      }
    });
  };

  const edithandler = (expenseId, expenses) => {
    moneyInputRef.current.value = expenses.money;
    descriptionInputRef.current.value = expenses.description;
    categoryInputRef.current.value = expenses.category;

    deleteExpensehandler(expenseId);
  };

  return (
    <div>
      <div className={classes.header}>
        <h3>Day to Day Expenses</h3>
      </div>
      <div className={classes.expense}>
        <section>
          <form onSubmit={submithandler}>
            <div>
              <label htmlFor="money">Money Spent:</label>
              <input type="number" ref={moneyInputRef}></input>
            </div>
            <div>
              <label>Description:</label>
              <input htmlFor="text" ref={descriptionInputRef}></input>
            </div>
            <div>
              <label htmlFor="expense">Category:</label>
              <select name="expense" ref={categoryInputRef}>
                <option value="food">Food</option>
                <option value="petrol">Petrol</option>
                <option value="salary">salary</option>
              </select>
            </div>
            <br></br>
            <button type="submit">Add</button>
          </form>
        </section>
      </div>

      <ExpenseList
        items={expenses}
        onDelete={deleteExpensehandler}
        onEdit={edithandler}
      ></ExpenseList>
    </div>
  );
};

export default Expenses;
