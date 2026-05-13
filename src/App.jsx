import { useState } from 'react'
import Navbar from './components/Navbar'
import NewsBoard from './components/NewsBoard'

const App = () => {
  const [category, setCategory] = useState('general')

  return (
    <div className="min-h-screen font-sans">
      <Navbar category={category} setCategory={setCategory} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <NewsBoard key={category} category={category} />
      </main>
    </div>
  )
}

export default App
