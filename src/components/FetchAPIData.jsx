async function FetchAPIData() {
  const apiURL = "https://pokeapi.co/api/v2/";
  //   let apiKey = "pokemon?limit=1&offset=0";
  let apiKeyTest = "pokemon/ditto";
  const response = await fetch(apiURL + apiKeyTest, { mode: "cors" });
  // const data = await JSON.parse(response);
  // console.log(data);
  console.log(response);
  return (
    <>
      <img src="" alt="Pokemon imgage" />
    </>
  );
}

export default FetchAPIData;
