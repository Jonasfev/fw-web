import axios from 'axios';

const API_URL = 'http://localhost:8080/';

 class PessoaDataService{
    retrieveAllPessoas(){
        return axios.get(`${API_URL}pessoas`);
    }

    updatePessoas(pessoa, codigo){
        return axios.put(`${API_URL}pessoas/${codigo}`, pessoa).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }
}


export default new PessoaDataService();
