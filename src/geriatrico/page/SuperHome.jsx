import React from 'react';
import "../../css/SuperHome.css"; // Importa el archivo CSS si prefieres tenerlo separado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faUser, faPlus, faLink } from '@fortawesome/free-solid-svg-icons';

function SuperHome() {
  return (
    <div className="super-home">
      <header className="header">
        <div className="logo">LOGO</div>
        <div className="action-buttons">
          <button className="icon-button">
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faUser} /> {/* Cambié el icono */}
          </button>
        </div>
      </header>

      <main className="content-grid">
        <div className="hero-text">
          <h1>FUNDACION AÑOS MARAVILLOS</h1>
          <p>La Fundación Mis Años Maravillosos Cali, nace para ofrecer a todos los adultos mayores paz, tranquilidad, amor y calidad de vida, sin olvidar las actividades del día a día.</p>
        </div>

        <div className="cards-section">
          <div className="building-card">
            <div className="building-content">
              <h2>Dedicamos cada día a brindar cuidado, protección y amor.</h2>
              <div className="buttons-group">
                <button className="button button-outline">
                  <FontAwesomeIcon icon={faPlus} /> Crear Geriatrico
                </button>
                <button className="button button-filled">
                  <FontAwesomeIcon icon={faLink} /> Crear Roles
                </button>
              </div>
            </div>
            <img src="/Building.jpg" alt="Building 3D" />
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>Personal médico</h3>
              <div className="stat-number">40+</div>
            </div>
            <button className="add-button">
              <FontAwesomeIcon icon={faPlus} /> Agregar
            </button>
          </div>

          <div className="stat4-card">
            <div className="stat-info">
              <h3>Administradores</h3>
              <div className="stat-number">8+</div>
            </div>
            <button className="add-button">
              <FontAwesomeIcon icon={faPlus} /> Agregar
            </button>
          </div>
        </div>
      </main>

      <div className="user-profile">
        <FontAwesomeIcon icon={faUser} className="user-avatar" />
        <span className="user-name">Juan Ruiz</span>
      </div>
    </div>
  );
}

export default SuperHome;
