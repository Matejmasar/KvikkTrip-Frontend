import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import flagsmith from 'flagsmith'
import {FlagsmithProvider} from 'flagsmith/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <FlagsmithProvider options={{
        environmentID: "f78QNBvL3GicXCJjvC9C9R",
        cacheFlags:true
    }} flagsmith={flagsmith}>
        <App />
    </FlagsmithProvider>

)
