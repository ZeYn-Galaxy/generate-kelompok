import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
ReactDOM.createRoot(document.getElementById('footer')).render(
  <React.StrictMode>
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Social Media</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/ZeYn-Galaxy" target='_blank'>
            <i class="fa-brands fa-github text-3xl"></i>
          </a>
          <a href="https://www.instagram.com/shafwan_k1" target='_blank'>
            <i class="fa-brands fa-instagram text-3xl"></i>
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2023 - ZeYn-Galaxy</p>
      </aside>
    </footer>
  </React.StrictMode>,
)
