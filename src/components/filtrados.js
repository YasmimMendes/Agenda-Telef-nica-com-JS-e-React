import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button} from "reactstrap";

const filtrados = ({data, eliminar, editar}) =>{
    return(
        <Table>
            <thead><tr><th>ID</th>
            <th>Nome</th>
            <th>Número de Telefone</th>
            <th>Ações</th></tr></thead>
            <tbody>
            {data.map((elemento)=>(
                <tr>
                <td>{elemento.id}</td>
                <td>{elemento.nome}</td>
                <td>{elemento.telefone}</td>
                <td><Button color="primary" onClick={() => editar(elemento)}>Editar</Button></td>
                <td><Button color="danger" onClick={() => eliminar(elemento)}>Excluir</Button></td>
                </tr>               
            ))}
            </tbody>
        </Table> 
    )
}
export default filtrados;
      