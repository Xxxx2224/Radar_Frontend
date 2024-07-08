import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [derece,setderece]=useState('Veri yok');
  const [predictedClass, setPredictedClass] = useState('');
  const [message1, setMessage1] = useState('');
  const [sicaklik,setsicaklik]=useState('Veri yok');
  const [nesne,setnesne]=useState('Veri yok');
  const [mesafe,setmesafe]=useState('Veri yok');
  const [led,setled]=useState('Veri yok');
  const [data1, setIp] = useState('');
  const [ip, setIp1] = useState(null);
  const [konum, setkonum] = useState('');
  const [data2, setippico] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const ref = useRef();
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); 

    return () => {
      clearInterval(interval); 
    };
  }, []);
 
  const handleToggle = async () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);

    const ledState = newToggleState ? 1 : 0;

    // Veriyi sunucuya gönder
    try {
        const response = await axios.post('http://192.168.244.130:5000/api/data/led', { led_state: ledState });
        console.log(response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        setIp(response.data);
        setIp1(response.data.ip);
      } catch (error) {
        console.error('IP adresi alınamadı:', error);
      }
    };

    fetchIp();
  }, []);
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const url = `http://ip-api.com/json/${ip}`;
        const response = await axios.get(url);
        setkonum(response.data);
      } catch (error) {
        console.error('Konum alınamadı:', error);
      }
    };

    fetchIp();
  }, [ip]);
  





  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.244.130:5000/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 50); 

        
        return () => clearInterval(intervalId);
    }, []);
  useEffect(() => {
      if (data && data.derece !== undefined) {
        setderece(data.derece);
        console.log(derece)
      }
  }, [data]);
  useEffect(() => {
    if (data && data.sicakli !== undefined) {
      setsicaklik(data.sicakli);
      console.log(sicaklik)
      
    }
    if (data && data.ip !== undefined) {
      setippico(data.ip);
      console.log(data2)
      
    }
    if (data && data.sicakli !== undefined) {
      setnesne(data.nesne);
      console.log(nesne)
      
    }
    if (data && data.sicakli !== undefined) {
      setmesafe(data.mesafe);
      console.log(mesafe)
      
    }
    if (data && data.sicakli !== undefined) {
      setled(data.led);
      console.log(led)
      
    }
  }, [data]);
  
  

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://192.168.244.130:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setMessage('Resim başarıyla yüklendi!');
      if (response.status === 200) {
        
        setMessage1(response.data.message);
        setPredictedClass(response.data.predicted_class);
      } else {
        setMessage1('Dosya yüklenirken bir hata oluştu.');
      }
      
    } catch (error) {
      setMessage('Resim yüklenirken bir hata oluştu.');
    }
  };
  const currentYear = currentDate.getFullYear();

  return (
    <>
      
      <div id='ekran'>
      
        <div id='Tarih' style={{fontSize: '25px'}}>
          Tarih :  {currentDate.getDate().toString().padStart(2, '0')}.{(currentDate.getMonth()+1).toString().padStart(2, '0')}.{currentDate.getFullYear()}<br />
          <div >Saat : {currentDate.getHours().toString().padStart(2, '0')}:{currentDate.getMinutes().toString().padStart(2, '0')}:{currentDate.getSeconds().toString().padStart(2, '0')}</div>
               
        </div>
        <div id='ip'>
          <p style={{fontSize: '25px',marginLeft:'10px'}}>Pico IP :  {data2}</p>
          <p style={{fontSize: '25px',marginLeft:'10px'}}>Public IP :  {data1.ip}</p>
          <p style={{fontSize: '25px',marginLeft:'10px'}}>Konum :  {konum.country}<br />{konum.regionName}<br /> {konum.as}</p>
        </div>
        <div id='radaralt'>
          <div id='uzaklık'>
            <span style={{fontSize: '25px'}}>Uzaklık:{mesafe}</span>
          </div>
          <div id='nesne'>
            <span style={{fontSize: '25px'}}>Nesne:{nesne}</span>
          </div>
          <div id='derece'>
            <span style={{fontSize: '25px'}}>Derece:{derece}</span>
          </div>
          
        </div>
        <div id='Radarx'>
          <div id='Radar'>
            <div style={{transform: `rotate(-${derece}deg)`}} id='radarçizgi'>
            </div>
            <div id='daire3'>
            </div>
            <div id='daire2'>
            </div>
            <div id='daire1'>
            </div>
          </div>
        </div>
        <div id='sıcaklık'>
          <div id='yarıçap'>
            <div id='ok'>
            </div>
          </div>
        </div>
        <div id='led'>
        <br />
          <span style={{fontSize: '25px'}}>Sıcaklık:{sicaklik}</span>
          <br />
        <br />
        <span style={{fontSize: '25px'}}>LED:{led}</span>
        <br /><br />
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={handleToggle} />
            <span className="slider"></span>
        </label>
        
        </div>
        <div id='resim'>
        <div>
      <h2 id='Resim1'>Resim Yükle</h2>
      <form onSubmit={onSubmit}>

        <button className='button' onClick={() => ref.current.click()}><span>yükle</span></button>
        <input ref={ref} style={{display: "none"}} class='dosya1'  type="file" onChange={onFileChange} />
        <span style={{fontSize: '20px'}}>Tahmin edilmesi istenen resmi yükleyiniz</span>
        <button style={{ backgroundColor: 'green', fontSize: '20px' }}
 class='button' type="submit">
        <span >gönder</span></button>
      </form>
      {message && <p id='mesaj'>{message}</p>}
      
    </div>
        </div>
        <div id='chatgpt'>
          <p id='mesaj'> ANALİZ EDİLEN NESNE: </p>
        {predictedClass && <p id='mesaj'>Muhtemelen bu bir {predictedClass}<br />ama doğruluk oranım düşük </p>}
        </div>
      </div>
    </>
  )
}

export default App
