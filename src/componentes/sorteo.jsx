import './sorteo.css';
function Sorteo() {
    return(
        <div>
            <form className="container-app-sorteo" >
                <h1>Sorteo</h1>
                <label for="participantes" className="participantes-label">Paricipantes</label> <br></br>
                <textarea name="participantes" id="participantes" className="participantes"></textarea><br></br>
                <div className="opciones">
                    <p> limpiar</p>
                    <p>Importar desde archivo</p>
                </div>
                <input type="submit" value="Comenzar" className="empezar"></input>
            </form>
            <div className="participantes-container" >
                <div className="header">
                    <h4>Participantes</h4>
                </div>
                <div className="total">
                    <p>Total <span id="numero-participantes"></span>12</p>
                </div>
                <ul className="lista-participantes">
                    <li>
                        <p><span>1</span> Daniel</p>
                    </li>

                    <li>
                        <p><span>2</span> Daniel</p>
                    </li>

                    <li>
                        <p><span>3</span> Daniel</p>
                    </li>
                </ul>

                <button id="iniciar-sorteo">Comenzar</button>
            </div>
            <div class="container-contador" >
                <div class="container-bg">
                    <div class="borde-interno"></div>
                    <p id="counter">5</p>
                </div>
                <svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="countdown-v2__svg" ><circle opacity="0.08" cx="179.998" cy="179.578" r="162.018" stroke="currentColor" stroke-width="35" stroke-linejoin="round" stroke-dasharray="8 30"></circle></svg>
            </div>
            <div class="ganadores-container" >
                <h3>Ganadores</h3>
                <div class="ganadores">
                    <ul class="ganadores-li">
                    
                    </ul>
                </div>
                <a href="index.html">Nuevo Sorteo</a>
            </div>
            <div class="alerta"></div>
        </div>
    );
}
export default Sorteo;