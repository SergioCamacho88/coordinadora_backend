import axios from "axios";

export const validateAddress = async (address: string): Promise<boolean> => {
  try {
    console.log("validando direccion");
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "coordinadora-test-app", // requerido por la API
      },
    });
    console.log("response.data");
    console.log(response.data);
    return response.data.length > 0;
  } catch (err) {
    console.error("Error validando dirección:", err);
    return false;
  }
};
