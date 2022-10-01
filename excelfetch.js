let bigData = [];

let justFetchOne = true;

async function fetchByExcel(searchKey = '') {
    try {
        //full: https://script.google.com/macros/s/AKfycbx7c7AFbF_Y7yHV5T4ZKfBFoj0DPmjOz5v3SjErnHsak_KpngyPr5Yrh5LLVIMEQCeo/exec
        //100: https://script.google.com/macros/s/AKfycbyWMeh6-KSnKkzbSGguA-pqCUPXX7cMf6sJW0qRfDpwPZJPcOHaVtiuKGnfY1GOLCqL/exec
        const fetchURL = `https://script.google.com/macros/s/AKfycbx7c7AFbF_Y7yHV5T4ZKfBFoj0DPmjOz5v3SjErnHsak_KpngyPr5Yrh5LLVIMEQCeo/exec?name=${searchKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response; // Your api should give you a total page count, result or something to setup your iteration
        console.log(data);
        // let arrayTag = data.map(({ name_en }) => name_en)

        //bigData = bigData.concat(arrayTag); // push on big data response data

        bigData = data;
        // // if current page isn't the last, call the fetch feature again, with page + 1
        // if (
        //     pageKey < 10 // (this is a test dev condition to limit for 10 result) */
        // ) {
        //     pageKey++;
        //     await new Promise((resolve) => setTimeout(resolve, 1)); // setup a sleep depend your api request/second requirement.
        //     return await fetchByExcel(pageKey);
        // }
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
    }
}
fetchByExcel()

// if (justFetchOne)
// fetchByExcel().then(()=>{
//     justFetchOne = false;
// });

