import { useState } from "react";

function Test() {
  const [foto, setFoto] = useState(null);
  const [pirulo, setPirulo] = useState({
    web: "",
  });

  function handleFileChange(e) {
    setFoto(e.target.files[0]);
  }

  async function handleSubmit(e) {
    console.log("foto antes", foto);
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", foto);

    const response = await fetch("http://localhost:3001/pet/foto", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    console.log("data", data.url.toString());
    setPirulo(prevState => ({
      ...prevState,
      web: data.url
    }));
    console.log("el nuevo pirulo", pirulo)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir imagen</button>
      </form>
      <div>Pirulo: {pirulo.web}</div>
      <img src={pirulo.web} alt="" />
    </>
  );
}

export default Test;
