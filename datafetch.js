

    // let repo = null, page = 0, results = [];
    
    // do {
    //     repo = axios.get(`https://capi-v2.sankakucomplex.com/tags?lang=en&page=${page++}`).then(res => 
    //     {
    //         console.log(results);
    //         results = results.concat(res.data);
    //     }
    // );
    // } while (page < 20)

// Init a bigData array to push new data on each iteration
let bigData = [];
let bigDataSend = [];
async function fetchByExcel(
    pageKey = 0 /** init by default page index 0 */,
) {
    try {
        const fetchURL = `https://capi-v2.sankakucomplex.com/tags?lang=en&page=${pageKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response; // Your api should give you a total page count, result or something to setup your iteration
        let arrayTag = data.map(({ name }) => name)
        let array = data.map(({ name_en,id,count,type,rating }) => {
            let fetchWikiURL = `https://capi-v2.sankakucomplex.com/tag-and-wiki/name/${name_en}`;
            const response = await axios.get(fetchURL);
            return {id: id, name: name_en, count: count, rating: rating, type: type}
        })
        console.log(arrayTag);
        bigData = bigData.concat(arrayTag); // push on big data response data

        // if current page isn't the last, call the fetch feature again, with page + 1
        if (
            pageKey < 2 // (this is a test dev condition to limit for 10 result) */
        ) {
            pageKey++;
            await new Promise((resolve) => setTimeout(resolve, 1000)); // setup a sleep depend your api request/second requirement.
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://sheetdb.io/api/v1/qpx225q4q80x1', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(array));
            return await fetchByExcel(pageKey);
        }
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
        console.log(pageKey);
    }
}

fetchByExcel().then(() => {console.log(bigData); console.table(bigData);
});  





