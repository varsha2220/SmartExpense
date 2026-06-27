import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";



import {
    Card,
    Table,
    Badge
} from "react-bootstrap";

export default function ExpenseCalendar({

    expenses

}){

    const [selectedDate,setSelectedDate]=useState(new Date());

    const formatDate=(date)=>{

        return date.toISOString().split("T")[0];

    };

    const selectedExpenses=expenses.filter(exp=>{

        return formatDate(new Date(exp.date))

            ===

        formatDate(selectedDate);

    });

    const total=

        selectedExpenses.reduce(

            (sum,item)=>

                sum+Number(item.amount),

            0

        );

    const tileContent=({date,view})=>{

        if(view!=="month") return null;

        const hasExpense=

            expenses.some(

                expense=>

                formatDate(new Date(expense.date))

                ===

                formatDate(date)

            );

        return hasExpense

            ?

            <div
                style={{
                    width:8,
                    height:8,
                    borderRadius:"50%",
                    background:"#EF4444",
                    margin:"0 auto",
                    marginTop:2
                }}
            />

            :

            null;

    };

    return(

        <Card className="shadow border-0">

            <Card.Body>

                <h4>

                    📅 Expense Calendar

                </h4>

                <hr/>

                <Calendar

                    value={selectedDate}

                    onChange={setSelectedDate}

                    tileContent={tileContent}

                />
                                <hr />

                <h5>

                    Selected Date

                </h5>

                <Badge bg="primary" className="mb-3">

                    {selectedDate.toDateString()}

                </Badge>

                <h5>

                    💰 Total Expense :
                    ₹{total}

                </h5>

                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="mt-3"
                >

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                    {

                        selectedExpenses.length===0

                        ?

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >

                                No Expenses on this day

                            </td>

                        </tr>

                        :

                        selectedExpenses.map(expense=>(

                            <tr
                                key={expense.id}
                            >

                                <td>

                                    {expense.title}

                                </td>

                                <td>

                                    <Badge
                                        bg="success"
                                    >

                                        {expense.category}

                                    </Badge>

                                </td>

                                <td>

                                    ₹{expense.amount}

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </Table>

            </Card.Body>

        </Card>

    );

}