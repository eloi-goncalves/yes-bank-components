import React from 'react';
// import Link from '../link/Link';
import "./Menu.css";

const MenuItens: React.FC = () => {
    return(
        <ul className= "itens-menu-lateral">
            <li><a className= "item" href='/'>Página inicial</a></li>
            <hr />
            <li><a className= "item" href='/statement'>Extrato Detalhado</a></li>
            <hr />
            <li><a className= "item" href='/'>Cartões</a></li>
            <hr />
            <li><a className= "item" href='/transaction'>Nova Transação</a></li>
            <hr />
            <li><a className= "item" href='/'>Todos os serviços</a></li>
        </ul>  
    );
}
const Menu:React.FC = () => {
    return(
        <div className="lateral-diminuido">
            <MenuItens></MenuItens> 
        </div>
    );
}

export default Menu;