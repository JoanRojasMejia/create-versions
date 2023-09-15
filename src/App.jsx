import { useState } from 'react'
import FormComponent from './components/form/Form'
import ResultComponent from './components/result/Result'

import './App.css'

const App = () => {
  const [allMessage, setAllMessage] = useState({ group: '', chat: '' })

  return (
    <div className="container">
      <FormComponent setAllMessage={setAllMessage} />
      <ResultComponent allMessage={allMessage} />
    </div>
  )
}

export default App
