import axios from "axios";

const api = axios.create({
  baseURL: "https://tools.texoit.com/backend-java/api/movies",
});

export default api;

// Dados de filme
// ?page=1&size=10&winner=true&year=2010

// Anos com mais de um vencedor
// ?projection=years-with-multiple-winners

// Estudios
// ?projection=studios-with-win-count

// Intervalo de premios
// ?projection=max-min-win-interval-for-producers

// filme por Anos
// ?winner=true&year=2018
