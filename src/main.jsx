import { createRoot } from 'react-dom/client'
import './index.css'
import Page1 from './HomePage.jsx'

createRoot(document.getElementById('root')).render(       //createRoot create virtual dom <Page1/> then compare, .render will render my all jsx elemets for React.createElement(App))
    <Page1 />
)

