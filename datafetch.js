

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
let array = [];

async function fetchWiki(keyword) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let fetchWikiURL = `https://capi-v2.sankakucomplex.com/tag-and-wiki/name/${keyword}`;
        const response = await axios.get(fetchWikiURL);
        const { data } = response;
        return data.wiki.body;
    }
    catch (err) {
        console.log(err);
    }
}

async function fetchArrayWiki(data) {
    const arrayWiki = await Promise.all(data.map((tag)=> {
            fetchWiki(tag.name_en).then((res) => {
                let newObj = {
                    wiki: res,
                    ...tag
                }
                console.log(tag.name_en,newObj)
                return newObj    
            })
    }))
    return arrayWiki;
}


async function fetchByExcel(
    pageKey = 0 /** init by default page index 0 */,
) {
    try {
        const fetchURL = `https://capi-v2.sankakucomplex.com/tags?lang=en&rating=s&page=${pageKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response; // Your api should give you a total page count, result or something to setup your iteration
        // let arrayTag = data.map(({ name }) => name)
        array = await fetchArrayWiki(data).then((res) => {console.log(res)});
        console.log(array);
        // bigData = bigData.concat(arrayTag); // push on big data response data

        // if current page isn't the last, call the fetch feature again, with page + 1
        if (
            pageKey < 2 // (this is a test dev condition to limit for 10 result) */
        ) {
            pageKey++;
            await new Promise((resolve) => setTimeout(resolve, 1000)); // setup a sleep depend your api request/second requirement.
            return await fetchByExcel(pageKey);
        }
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
        console.log(pageKey);
    }
}

fetchByExcel().then(() => {console.log(array); console.log(bigData); console.table(bigData);
});  





