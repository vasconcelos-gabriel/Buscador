import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    // 01001000/json/
    if (input === '') {
      alert('Preencha algum CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('CEP não encontrado')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).lenght > 0 && (
             <main className="main">
              <h2>CEP: {cep.cep}</h2>
              <span>Rua: {cep.logradouro}</span>
              <span>Complemento: {cep.complemento}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>Cidade: {cep.localidade}</span>
              <span>UF: {cep.uf}</span>
            </main>
      )}

    </div>
  )
}

export default App
