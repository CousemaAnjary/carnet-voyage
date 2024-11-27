import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { AuthProvider } from './modules/contexts/AuthContext.tsx'
import { store } from './stores/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
