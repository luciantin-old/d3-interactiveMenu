
const URL='http://localhost:5000/pisData/'

export async function getPISdata(url_add){
    const resp = await fetch(URL+url_add);
    let json = await resp.json();
     // console.log(json)
    return json;
}


// const IPS_list = fetch(URL+"IPS").then(data=>{console.log(data.json()); return data.json()}); 
// const IPS_MODULI_list = fetch(URL+"MODULI").then(data=>{console.log(data.json()); return data.json()});




