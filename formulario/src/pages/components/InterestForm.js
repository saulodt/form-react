import React, { useState, useEffect } from 'react';
// Biblioteca para conectar com a API
import axios from 'axios';

function InterestForm() {

  //=================== Declarando a variável com state e objetos atribuídos ===================//

  const [formValues, setFormValues] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    cidade: '',
    volume: 0,
    produtoConhecido: '',
    descricaoFinalidade: '',
    produtos: {},
    acordoPolitica: false
  });

  //============ Declarando a variável para receber a mensagem ============//
  const [message, setMessage] = useState("");

  //============ Declarando a variável para o pop-up ============//
  const [showPopup, setShowPopup] = useState(false);

  //============ Função para atualizar os valores do formulário ============//
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validação para filtrar caracteres que são digitados no campo telefone
    // Se o input for o de telefone, valida a entrada
    if (name === "telefone") {

      const regex = /^[0-9()+\-]*$/;

      // Se o valor atual não corresponder ao permitido pela regex, retorna sem alterar o estado
      if (!regex.test(value)) return;

      // Atualiza o state com o valor validado
      setFormValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      // Atualiza o state diretamente
      setFormValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    
    // Para checkboxes, determina o valor como 'checked', para outros inputs, usa 'value'
    const newValue = type === 'checkbox' ? checked : value;
  
    if (type === "checkbox") {
      // Se for um checkbox de produto, atualiza dentro do objeto 'produtos'
      if (name.includes("prod_")) {
        setFormValues(prevValues => ({
          ...prevValues,
          produtos: {
            ...prevValues.produtos,
            [name]: newValue,
          },
        }));
      } else {
        // Para outros checkboxes, atualiza diretamente no state
        setFormValues(prevValues => ({
          ...prevValues,
          [name]: newValue,
        }));
      }
    } else {
      // Para inputs que não são checkboxes, atualiza diretamente no state
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: newValue,
      }));
    }
  }; 

  //============ Função para aumentar o volume ============//
  const aumentarVolume = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      volume: prevValues.volume + 1,
    }));
  };

  //============ Função para diminuir o volume ============//
  const diminuirVolume = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      volume: Math.max(prevValues.volume - 1, 0), // Evita valores negativos
    }));
  };

  //============ Função para lidar com o envio do formulário ============//
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    console.log(formValues);

      // Verifica se uma opção de produto conhecido foi marcada
    if (!formValues.produtoConhecido) {
      alert('Por favor, selecione se você sabe qual produto utilizar.');
      return;
    }

    // Caso "Sim", ve se pelo menos um produto foi escolhido
    if (formValues.produtoConhecido === 'sim' && !Object.values(formValues.produtos).some(v => v)) {
      alert('Por favor, selecione pelo menos um produto.');
      return;
    }

    // Caso "Não", ve se foi escrita pelo menos uma letra na descrição
    if (formValues.produtoConhecido === 'não' && (!formValues.descricaoFinalidade || formValues.descricaoFinalidade.trim().length === 0)) {
      alert('Por favor, forneça uma descrição para a finalidade do produto.');
      return;
    }



    // Criando a constante com os dados do cabeçalho
    const headers = {
      'headers': {
        'Content-Type': 'application/json' // Indica que será enviado os dados em formato de objeto
      }
    };

    // Faz a requisição para o servidor usando o axios, indicando o método da requisição, o endereço, dados do formulário e cabeçalho.
    try {
      const response = await axios.post('http://localhost:8080/form', formValues, headers);
      console.log(response);

      setMessage(response.data.message);
      
      // Mostra o pop-up após envio bem-sucedido
      setShowPopup(true);
      
      // Reset do formulário
      setFormValues({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        cidade: '',
        volume: 0,
        produtoConhecido: '',
        descricaoFinalidade: '',
        produtos: {},
        acordoPolitica: false
      });
    } catch (err) {

      setMessage(err.response ? err.response.data.message : 'Erro ao enviar formulário');
      
    }
  };

  //=================== Declaração de state para o tema Escuro ===================//

  const [temaEscuro, setTemaEscuro] = useState(false);

  const alternarTema = () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);

    const tema = {
      claro: {
        fundoPainel: "rgba(255, 255, 255, 0.26)",
        titulo: "#3d34ba",
        label: "#273464",
        botaoEsquerdo: "linear-gradient(90deg, rgba(84,116,230,1) 0%, rgba(11,7,217,1) 100%)",
        botaoDireito: "linear-gradient(264deg, rgba(84,116,230,1) 0%, rgba(11,7,217,1) 100%)",
        botaoTexto: "#FFF",
        botaoContinuar: "linear-gradient(90deg, rgba(49,46,212,1) 0%, rgba(59,112,230,1) 100%)",
        footer: "linear-gradient(0deg, rgba(32, 29, 231, 0.959) 40%, rgba(25, 22, 211, 0.644) 100%)",
        imagemFundo: "url('/img/zyro-image.png')",
        fundoSlider: "#ebebeb",
        sombraSlider: "#fff",
      },
      escuro: {
        fundoPainel: "rgba(2, 2, 2, 0.342)",
        titulo: "#FFF",
        label: "#FFF",
        botaoEsquerdo: "linear-gradient(90deg, rgb(97, 97, 99) 0%, rgb(1, 1, 26) 100%)",
        botaoDireito: "linear-gradient(264deg, rgb(97, 97, 99) 0%, rgb(1, 1, 26) 100%)",
        botaoTexto: "#FFF",
        botaoContinuar: "linear-gradient(90deg, rgb(0, 0, 8) 0%, rgb(97, 97, 99) 100%)",
        footer: "linear-gradient(0deg, rgb(1, 1, 26) 40%, rgb(97, 97, 99) 100%)",
        imagemFundo: "url('/img/zyro-image-black.png')",
        fundoSlider: "#4b4b4b",
        sombraSlider: "#3f3f3f",
      }
    };

    const cores = novoTema ? tema.escuro : tema.claro;

    for (const [key, value] of Object.entries(cores)) {
      if (key === 'imagemFundo') { // Verifica se a chave é a imagem de fundo
        document.documentElement.style.setProperty('--imagemFundo', value); // Atualiza a variável CSS correspondente
      } else {
        document.documentElement.style.setProperty(`--cor-${key}`, value);
      }
    }
  }

  //======================================================================//

  return (
    <>
      <form onSubmit={handleSubmit} className="formContainer">

      {/* ========================================== Botão Tema Escuro =========================================================== */}

        <label className="switch">
          <input type="checkbox" checked={temaEscuro} onChange={alternarTema} />
          <span className="slider"></span>
        </label>

      {/* ========================================== Titulo / Inputs text =========================================================== */}

        <h1 className="formTitle">Formulário de Interesse</h1>
        
        <div className='dualColumns'>
          <div className="inputGroup">
            <label htmlFor="nome">Nome *</label>
            <input type="text" id="nome" name="nome" placeholder="Nome" value={formValues.nome} onChange={handleChange} required />
          </div>
          <div className="inputGroup">
            <label htmlFor="sobrenome">Sobrenome *</label>
            <input type="text" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value={formValues.sobrenome} onChange={handleChange} required />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required />
          </div>
          <div className="inputGroup">
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" name="telefone" placeholder="Telefone" value={formValues.telefone} onChange={handleChange} />
          </div>
          <div className="inputGroup">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" placeholder="Cidade" value={formValues.cidade} onChange={handleChange} />
          </div>

          {/* ==================== Input Volume ==================== */}

          <div className="volumeControl">
            <label htmlFor="volume">Volume</label>
            <div className="volumeButtons">
              <button className="plusButton" type="button" onClick={diminuirVolume}>-</button>
              <input type="number" id="volume" name="volume" placeholder="Volume" value={formValues.volume} readOnly /> {/* readOnly para que não seja preenchido digitando */}
              <button className="lessButton" type="button" onClick={aumentarVolume}>+</button>
            </div>
          </div>
        </div>

        {/* ========================================== Inputs radio =========================================================== */}

        <h4 className="formSubTitle">Sabe qual produto utilizar? *</h4>
        <di className="formRadio">
          <label className='productOption'>
            <input
              type="radio"
              name="produtoConhecido"
              value="sim"
              checked={formValues.produtoConhecido === 'sim' }
              onChange={handleChange}
            /> Sim, sei qual produto utilizar
          </label>
          <label className='descriptionOption'>
            <input
              type="radio"
              name="produtoConhecido"
              value="não"
              checked={formValues.produtoConhecido === 'não' }
              onChange={handleChange}
            /> Não, preciso de ajuda para escolher o meu produto
          </label>
        </di>

        {/* ==================== Produtos ==================== */}

        {formValues.produtoConhecido === 'sim' && (
          <div className="productsGrid">
            <label><input type="checkbox" name="prod_Texapon S 2" onChange={handleChange} /> Texapon S 2 </label>
            <label><input type="checkbox" name="prod_Jordapon SCI Powder" onChange={handleChange} /> Jordapon SCI Powder </label>
            <label><input type="checkbox" name="prod_Eumulgin CO 40" onChange={handleChange} /> Eumulgin CO 40 </label>
            <label><input type="checkbox" name="prod_Lamesoft PO 65" onChange={handleChange} /> Lamesoft PO 65 </label>
            <label><input type="checkbox" name="prod_Plantacare 2000 UP" onChange={handleChange} /> Plantacare 2000 UP </label>
            <label><input type="checkbox" name="prod_Uvinul A Plus Granular" onChange={handleChange} /> Uvinul A Plus Granular </label>
            <label><input type="checkbox" name="prod_Plantacare 1200 UP" onChange={handleChange} /> Plantacare 1200 UP </label>
            <label><input type="checkbox" name="prod_Cetiol AB" onChange={handleChange} /> Cetiol AB </label>
            <label><input type="checkbox" name="prod_Texapon SBN" onChange={handleChange} /> Texapon SBN </label>
            <label><input type="checkbox" name="prod_Myritol 312" onChange={handleChange} /> Myritol 312 </label>
            <label><input type="checkbox" name="prod_Myritol 312 LB" onChange={handleChange} /> Myritol 312 LB </label>
            <label><input type="checkbox" name="prod_Cetiol CC" onChange={handleChange} /> Cetiol CC </label>
            <label><input type="checkbox" name="prod_UVINUL MC 80" onChange={handleChange} /> UVINUL MC 80 </label>
            <label><input type="checkbox" name="prod_Tinosorb M" onChange={handleChange} /> Tinosorb M </label>
            <label><input type="checkbox" name="prod_Plantacare 1200 N" onChange={handleChange} /> Plantacare 1200 N </label>
          </div>
        )}

        {/* ==================== Descrição Finalidade ==================== */}

        {formValues.produtoConhecido === 'não' && (
          <div className="textareaContainer">
            <label>Descreva qual finalidade está precisando</label>
            <textarea className="largeTextarea" name="descricaoFinalidade" value={formValues.descricaoFinalidade} onChange={handleChange} />
          </div>
        )}

        {/* ========================================== Politica de Privacidade =========================================================== */}

        <div className="privacyPolicy">
          <input
            type="checkbox"
            name="acordoPolitica"
            id="acordoPolitica"
            checked={formValues.acordoPolitica}
            onChange={handleChange}
            required
          />
          <label htmlFor="acordoPolitica">Estou de acordo com a Política de Privacidade</label>
        </div>

        {/* ========================================== Botao Submit =========================================================== */}

        <button type="submit" className="submitButton">Enviar</button>

        {/* ========================================== Footer =========================================================== */}

        <footer className="formFooter">
          © 2024 Desafio Formulário
        </footer>

      </form>

      {/* ========================================== Pop-Up =========================================================== */}

      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <img src="./img/check.png" alt="Ícone" />
            <label>O formulário foi enviado com sucesso!</label>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}

    </>
  );
}

export default InterestForm;
