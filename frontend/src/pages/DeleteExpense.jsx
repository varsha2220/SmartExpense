import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function DeleteExpense() {

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        deleteExpense();

    }, []);

    const deleteExpense = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {

            navigate("/dashboard");

            return;

        }

        try {

            await api.delete(`/expense/${id}`);

            alert("Expense Deleted Successfully");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            alert("Unable to delete expense");

            navigate("/dashboard");

        }

    };

    return (

        <div className="container mt-5">

            <h3>Deleting Expense...</h3>

        </div>

    );

}