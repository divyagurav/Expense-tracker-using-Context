import React from "react";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  return (
    <div className={classes.expenseList}>
      {props.items.map((item) => (
        <ul>
          <li key={item.id}>
            {`${item.money}  ${item.description} ${item.category}`}{" "}
            <button
              onClick={() => {
                props.onDelete(item.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                props.onEdit(item.id, {
                  money: item.money,
                  description: item.description,
                  category: item.category,
                });
              }}
            >
              Edit
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};
export default ExpenseList;
