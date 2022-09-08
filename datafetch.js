

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

async function fetchAllPaginateData(
    pageKey = 0 /** init by default page index 0 */,
) {
    try {
        const fetchURL = `https://capi-v2.sankakucomplex.com/tags?lang=en&type=0&page=${pageKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response; // Your api should give you a total page count, result or something to setup your iteration
        let arrayTag = data.map(({ name }) => name)
        console.log(arrayTag);
        bigData = bigData.concat(arrayTag); // push on big data response data

        // if current page isn't the last, call the fetch feature again, with page + 1
        if (
            pageKey < 10 // (this is a test dev condition to limit for 10 result) */
        ) {
            pageKey++;
            await new Promise((resolve) => setTimeout(resolve, 1)); // setup a sleep depend your api request/second requirement.
            return await fetchAllPaginateData(pageKey);
        }
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
    }
}

fetchAllPaginateData().then(() => {console.log(bigData); console.table(bigData);});   




