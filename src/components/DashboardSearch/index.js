import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import './DashboardSearch.css';

function DashboardSearch({ setSearch }) {
  const [formValue, setFormValue] = useState({
    entity: '',
    status: '',
    type: '',
  });

  const onSearch = (event) => {
    event.preventDefault();
    console.log(formValue);
    setSearch(formValue);
  };

  const handleSelectEntity = (event) =>
    setFormValue({
      ...formValue,
      entity: event.target.value,
    });
  const handleSelectStatus = (event) =>
    setFormValue({
      ...formValue,
      status: event.target.value,
    });
  
  return (
    <Form inline onSubmit={onSearch} className="search-form">
      <InputGroup>
        <Form.Label htmlFor="status">Estado</Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="status"
          custom
          onChange={handleSelectStatus}
        >
          <option value="">Elegir...</option>
          <option value="PENDING">pendiente</option>
          <option value="INPROGRESS">en progreso</option>
          <option value="DONE">lista</option>
        </Form.Control>
      </InputGroup>

      <Form.Label htmlFor="entity">Entidad</Form.Label>
      <Form.Control
        as="select"
        className="my-1 mr-sm-2"
        id="entity"
        onChange={handleSelectEntity}
      >
        <option value="">Elegir...</option>
        <option value="1">Hospital de Talca</option>
        <option value="2">Hospital Coquimbo</option>
      </Form.Control>

      {/* <Form.Check
        type="checkbox"
        className="mb-2 mr-sm-2"
        id="requested"
        label="Solicitudes"
        value="REQUESTED"
        onChange={handleCheckBox}
        checked={formValue.type.includes("REQUESTED")}
      />
      <Form.Check
        type="checkbox"
        className="mb-2 mr-sm-2"
        id="supplied"
        label="Ofertas"
        value="SUPPLIED"
        onChange={handleCheckBox}
        checked={formValue.type.includes("SUPPLIED")}
      /> */}
      <Button type="submit" className="mb-2">
        Buscar
      </Button>
    </Form>
  );
}

export default DashboardSearch;
