
const Result = () => {
    return (
        <>
            <section id="section2" className="section">
            <h1>Information for: ' ' + countryData.name.official /  ' ' + countryData.name.common</h1>
            <button onclick="location.href='/'">Return to the main page</button>
            {/* display content */}
            <section class="displayResult">
                unpack(countryData);
            </section>
            </section>
        </>
    )
}

  // function unpack(obj) { 
  //   // iterate through each entry in the json object
  //   for (const [key, value] of Object.entries(obj)) { 
  //     // Array / object that can be unpacked again / "leaf nodes"
  //     if (Array.isArray(obj[key])) {
  //       <ul><li>key: value   
  //     } else if (typeof value === 'object') {   
  //       <ul><li>
  //       key 
  //       unpack(value); 
  //     } else {   
  //       <ul>
  //       <li>key : value </li>
  //     } 
  //     </li></ul>
  //   } 
  // }

export default Result;