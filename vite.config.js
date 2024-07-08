import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Bilgisayarınızın IP adresini bulmanız gerekecek. 
// Bu örnekte, 192.168.1.100 kullanılmıştır. 
// Kendi bilgisayarınızın IP adresini ifconfig/ipconfig komutlarıyla öğrenin.
const host = '0.0.0.0'; // Tüm arayüzlerde dinlemesi için
const port = 443; // Kullanmak istediğiniz port

export default defineConfig({
  plugins: [react()],
  server: {
    host: host,
    port: port,
  },
})
