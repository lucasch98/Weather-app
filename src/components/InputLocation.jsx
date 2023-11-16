import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
const API_CALL = 'https://api.weatherapi.com/v1/current.json?key=295d9c4ead16477c9bc184126231411&q=';

//import {DataWeather} from './DataWeather.jsx'

function inputLocation() {
  const [inputWeather, setInputWeather] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const handleInput = (e) =>{
    return(
        setInputWeather(e.target.value)
      )
  } 

  const handleSubmit = (e) => {
    e.preventDefault()  //Para que se recargue la pagina cuando apretas en el boton Buscar
    if(inputWeather.length > 2){
      getWeather()
    }
  }

  const getWeather = async () =>{ //Tengo que esperar a que devuelva la info la API del clima
    try{
      const response = await fetch(`${API_CALL}${inputWeather}`)
      const data = await response.json()
      setDataClima(data)
      console.log(data)
      console.log(data['current']['condition']['icon'])

    }catch(error){
      console.log('Error al obtener los datos', error)
    }
  }

  function getLocalTime(){
    return new Date(dataClima['location']['localtime'])
  }

  return (
    <div className='container'>
      <form action="" onSubmit={handleSubmit}>
        <div className="content-weather-input">
          <input id="inputLocation_id" type="text" value={inputWeather} placeholder="Location..." onChange={handleInput} name="inputLocation" />
          &nbsp; 
          <button type="submit" id="buttonSearch_id" class="btn btn-info">Buscar</button>
        </div>
      </form>
      <br/>
      {
        dataClima && (
          <div id="card-wheater-data" className="container d-flex align-items-center justify-content-center">
            {[
              'Dark',
            ].map((variant) => (
              <Card
                bg={variant.toLowerCase()}
                key={variant}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '45rem' }}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title>{dataClima['location']['name']}</Card.Title>
                  <hr/>
                  <Card.Text>
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>País</th>
                          <th>Ultima actulización</th>
                          <th>Hora actual</th>
                          <th>Humedad</th>
                          <th>Condicion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{dataClima['location']['country']}</td>
                          <td>{dataClima['current']['last_updated']}</td>
                          <td>{getLocalTime().getHours()}:{getLocalTime().getMinutes()} hs</td>
                          <td>{dataClima['current']['humidity']}% de humedad</td>
                          <td>{dataClima['current']['condition']['text']}</td>
                        </tr>
                      </tbody>
                    </Table>
                      <div className='iconweather'>
                        <img src={dataClima['current']['condition']['icon']} id="iconWeather_id"/>
                        <h2>{dataClima['current']['temp_c']}°C</h2>
                      </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default inputLocation;