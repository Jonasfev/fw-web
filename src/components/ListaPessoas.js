import React, {Component} from 'react';
import {Table, Tag, Space, Button, message} from 'antd';
import Column from 'antd/lib/table/Column';
import PessoaDataService from '../services/PessoaDataService';

export default class ListaPessoas extends Component{
    constructor(props){
        super(props);
        this.state={
            pessoas: [],
            message: null
        }

    }

    componentDidMount(){
        this.refreshPessoas();
    }

    success = (record)=>{
        if(record.isVacinada){
            record.isVacinada = false;
        } else {
            record.isVacinada = true;
        }

        PessoaDataService.updatePessoas(record, record.codigo);
        message.success('Status alterado com sucesso!');

    }

    refreshPessoas(){
        PessoaDataService.retrieveAllPessoas().then(
            response=>{
                console.log(response);
                this.setState({pessoas: response.data});
            }
        );
    }

    render(){
        return (
            <div className="container">
                <h2>PESSOAS CADASTRADAS</h2>
                <div>
                    <Table dataSource={this.state.pessoas}>
                        <Column title="NOME" dataIndex="nome" key="nome"></Column>
                        <Column title="CPF" dataIndex="cpf" key="cpf"></Column>
                        <Column title="TELEFONE" dataIndex="telefone" key="telefone"></Column>
                        <Column title="EMAIL" dataIndex="email" key="email"></Column>
                        <Column title="VACINADA" dataIndex="isVacinada" key="isVacinada" render= {(text, record)=>
                            (<p>{String(record.isVacinada)}</p>)}></Column>
                        <Column title="ATUALIZAR" key="atualizar" render={(text, record) => (<Button type="primary" onClick={()=>this.success(record)}>Alterar Status</Button>)}></Column>


                    </Table>
                </div>
            </div>
        );
    }

}