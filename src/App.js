import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Alert} from "reactstrap";
import Filtrados from './components/filtrados';

const data = [ 
  {id: 1, nome: "Yasmim Mendes", telefone: "(84)98104-1182"},
  {id: 2, nome: "Lara Giovana", telefone: "(82)98103-1082"},
  {id: 3, nome: "Maria Eduarda", telefone: "(83)98107-0982"},
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nome: "",
      telefone: ""
    }, 
    dataSearch: [],
    modalInsertar: false,
    modalAtualizar: false,
    modalConfirmar: false
  };

  handleChange = e =>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }
 
  //#metódos
  mostrarModalAtualizar = (dato) => {
    this.setState({
      form: dato,
      modalAtualizar: true,
    });
  };

  cerrarModalAtualizar = () => {
    this.setState({ modalAtualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarConfirmar = (dato) => {
    this.setState({
      form: dato,
      modalConfirmar: true
    });
    
  };

  cerrarConfirmar = () =>{
    this.setState({ modalConfirmar: false });
  }
  //#end
  
  //#CRUD
  insertar = () =>{
    let valorNovo = this.state.form;
    if(valorNovo.nome.length > 1 && valorNovo.telefone.length > 1){
    valorNovo.id = this.state.data.length + 1;
    let lista = this.state.data;
    console.log("dados:"+valorNovo.nome);
      lista.push(valorNovo);
      this.setState({data: lista, modalInsertar: false})
      alert("Contato adicionado com sucesso!");
    }else{
      alert('Preencha todos os campos!');
    }  
    this.state.form = "";
  }

  editar = (dato) =>{
    let contador = 0;
    let lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id === registro.id){
        if(dato.nome === "" || dato.telefone === ""){
          return alert("Preencha todos os campos!");
        }else{
          lista[contador].nome = dato.nome;
          lista[contador].telefone = dato.telefone;
          this.setState({data: lista, modalAtualizar: false})
          return alert("Edição concluída!");
        }
      }
      contador++;
    });
  }

  eliminar = (dato) =>{
    let contador = 0; 
    let lista = this.state.data;
    lista.map((registro) => { 
        if(registro.id === dato.id){
          lista.splice(contador, 1);
        }
         contador++;
      });
      this.setState({data: lista, modalConfirmar: false});
      alert("Contato excluído com sucesso!");
  }

  isNumber=(str) =>{
    return !isNaN(str)
  } 

  filtrar = (e) =>{
    const { value } = e.target;
    let lista = this.state.data;
    let filtered;

    if (this.isNumber(value)){
      console.log("$teste$ 400 ")
      filtered = lista.filter(fltr => fltr.telefone.toLowerCase().includes(value.toLowerCase()));
      console.log(filtered)

    }else{
      filtered = lista.filter(fltr => fltr.nome.toLowerCase().includes(value.toLowerCase()));
    }

    // this.setState({data: filtered});
    this.setState({ dataSearch: !value ?  [] : filtered});   
  }
  //#end
    
  render() {  
    return (
      <>     
        <nav className="navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand">Agenda de contatos</a>            
            <form  class="d-flex">
              <input class="form-control me-2" onChange={this.filtrar} type="search" placeholder="Pesquisar" aria-label="Search"></input>              
            </form>
            </div>
        </nav>        
          
        <Container>             
          <Filtrados 
            data = {this.state.dataSearch.length ? this.state.dataSearch : this.state.data}
            eliminar = {this.mostrarConfirmar}
            editar = {this.mostrarModalAtualizar}
          />   
          
          <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Adicionar contatos</Button>
          <br />
          <br/> 
        </Container>

        {/* Modal insertar */}
        <Modal isOpen = {this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Inserir contato</h3>
            </div>       
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label> 
              <input className="form-control" readOnly type= "text" value = {this.state.data.length+1}/>
            </FormGroup> 

            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nome" type= "text" onChange={this.handleChange} required/>
            </FormGroup> 

            <FormGroup>
              <label>Telefone</label> 
              <input className="form-control" name="telefone" type= "text" onChange={this.handleChange} required/>
            </FormGroup> 
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Adicionar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal atualizar */}
        <Modal isOpen={this.state.modalAtualizar}>
          <ModalHeader>
            <div>
                <h3>Editar contato</h3>
            </div>       
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label> 
              <input className="form-control" readOnly type= "text" value={this.state.form.id}/>
            </FormGroup> 

            <FormGroup>
              <label>Nome</label> 
              <input className="form-control" name="nome" type= "text" onChange={this.handleChange} value={this.state.form.nome}/>
            </FormGroup> 

            <FormGroup>
              <label>Telefone</label> 
              <input className="form-control" name="telefone" type= "text" onChange={this.handleChange} value={this.state.form.telefone}/>
            </FormGroup> 
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.cerrarModalAtualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen = {this.state.modalConfirmar}>
          <ModalHeader>
            <h4> Deseja excluir este registro? </h4>
          </ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={()=> this.eliminar(this.state.form)}> Sim</Button> {"   "}
            <Button color="danger" onClick={()=>this.cerrarConfirmar()}> Não</Button>
          </ModalBody>        
        </Modal>      
      </>
    );
  }
}

export default App;

