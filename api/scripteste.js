
async function logprod(){
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

logprod()
/*
// Fazer uma solicitação à sua API
fetch('http://localhost:3000/products') // Substitua com a rota da sua API
    .then(response => {
        if (!response.ok) {
            throw new Error(`A solicitação falhou com status ${response.status}`);
        }
        console.log(response.json());
        return response.json();
    })
    .then(data => {
        // Atualizar o conteúdo HTML com os dados da API
        conteudoDiv.textContent = data.minhaString; // Suponha que a API retorna um objeto com um campo "minhaString"
    })
    .catch(error => {
        console.error('Erro:', error);
    });
*/