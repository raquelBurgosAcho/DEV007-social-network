export const Register = () => {
        const HomeDiv = document.createElement('div');
        HomeDiv.textContent = 'Bienvenida al registro';
        const buttonHome = document.createElement('button');
    
        buttonHome.textContent = 'Regresar';
    
        HomeDiv.appendChild(buttonHome);
    
        return HomeDiv;
    };