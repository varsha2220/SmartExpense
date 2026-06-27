import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Table,
  Row,
  Col
} from "react-bootstrap";
import api from "../services/api";

export default function CategoryPage() {

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const saveCategory = async () => {

    if (categoryName.trim() === "") {
      alert("Enter Category Name");
      return;
    }

    try {

      if (editingId == null) {

        await api.post("/category", {
          name: categoryName
        });

      } else {

        await api.put(`/category/${editingId}`, {
          name: categoryName
        });

      }

      setCategoryName("");
      setEditingId(null);

      loadCategories();

    } catch (err) {

      console.log(err);

      alert("Unable to Save Category");

    }

  };

  const editCategory = (category) => {

    setEditingId(category.id);

    setCategoryName(category.name);

  };

  const deleteCategory = async (id) => {

    if (!window.confirm("Delete Category?"))
      return;

    try {

      await api.delete(`/category/${id}`);

      loadCategories();

    } catch (err) {

      console.log(err);

      alert("Unable to Delete");

    }

  };

  return (

    <Container className="mt-5">

      <Card className="shadow p-4">

        <h2 className="mb-4">

          Category Management

        </h2>

        <Row>

          <Col md={9}>

            <Form.Control

              placeholder="Enter Category"

              value={categoryName}

              onChange={(e) =>
                setCategoryName(e.target.value)
              }

            />

          </Col>

          <Col md={3}>

            <Button
              className="w-100"
              onClick={saveCategory}
            >

              {editingId == null ?

                "Add Category"

                :

                "Update Category"}

            </Button>

          </Col>

        </Row>

        <hr />

        <Table striped bordered hover>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Edit</th>

              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {

              categories.map(category => (

                <tr key={category.id}>

                  <td>

                    {category.id}

                  </td>

                  <td>

                    {category.name}

                  </td>

                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() =>
                        editCategory(category)
                      }
                    >

                      Edit

                    </Button>

                  </td>

                  <td>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        deleteCategory(category.id)
                      }
                    >

                      Delete

                    </Button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </Table>

      </Card>

    </Container>

  );

}