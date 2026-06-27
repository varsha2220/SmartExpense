import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "../services/api";

export default function CategoryDropdown({
    value,
    onChange
}) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const res = await api.get("/category");

            setCategories(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <Form.Group className="mb-3">

            <Form.Label>

                Category

            </Form.Label>

<Form.Group className="mb-3">

    <Form.Label>

        Category

    </Form.Label>

    <Form.Select

        name="category"

        value={expense.category}

        onChange={handleChange}

        required

    >

        <option value="">

            Select Category

        </option>

        {

            categories.map(category => (

                <option

                    key={category.id}

                    value={category.name}

                >

                    {category.name}

                </option>

            ))

        }

    </Form.Select>

</Form.Group>





        </Form.Group>

    );

}