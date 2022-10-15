bigData = [];

var justFetched = false;

async function fetchByExcel(searchKey = '') {
    await chrome.storage.local.get(['tags'], async function(result) {
            if(result.tags?.length>2) {
                justFetched = true;
                console.log('data already fetched'+result.tags);
                bigData = JSON.parse(result.tags);
                return result.tags;
            } else {
                console.log('now start fetch');
                await fetching(searchKey).then((e)=> {
                     bigData = e;
                     const jsonTags = JSON.stringify(bigData);
                     localStorage.setItem('tags', jsonTags);
                     chrome.storage.local.set({tags: jsonTags}, function() {
                         console.log('Value is set to ', {tags: jsonTags});
                       });
                     chrome.storage.local.get(['tags'], function(result) {
                         try {
                             console.log(JSON.parse(result.tags));           
                         } catch (error) {
                             console.error(error)
                         }
                       });
                });
            }          
    });
}

//https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&limit=20&tags=fav:minhb3o

fetchByExcel().then(()=> {

})


async function fetchingSankakuApi(url) {
    let userRecommendTags = [];
    console.log("fetching: ",url);
    try {
        const response = await axios.get(url);
        const {data} = response.data;
        for (const post of data) {
            // console.log('Processing for post: ',post);
            for (const element of post.tags) {
                // console.log('Processing for element: ',element);
                if(element.type == '8' || element.type == '9') continue;
                let foundE = userRecommendTags.findIndex(e => e.id === element.id)
                if (foundE == -1) {
                    let picked = (({ name_en, id, count }) => ({ name_en, id, count, recCount: 1 }))(element);
                    // console.log('Not foundE, insert a new one: ',element);
                    userRecommendTags.push(picked);   
                } else {
                    // console.log('Processing for foundE: ',userRecommendTags[foundE]);
                    userRecommendTags[foundE].recCount++;
                }
            }   
        }
        
        return userRecommendTags.sort(function(a, b) { 
            return ((b.recCount - a.recCount))  
        }).slice(0,150);
    } catch (error) {
        console.log(error)
    }
}

async function fetching(searchKey) {
    // if (!justFetched) {
        console.log(justFetched);
        console.log("fetching...")
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
            justFetched = true;
            console.info('Data complete.');
            return data;
        } catch (err) {
            console.error(err);
        }
    // }
    // else {
        // chrome.storage.local.get(['tags'], function(result) {
        //     try {
        //         console.log("just Fetched: ",JSON.parse(result.tags)); 
        //         return JSON.parse(result.tags);          
        //     } catch (error) {
        //         console.error(error)
        //     }
        //   });
    }
// }

// if (justFetchOne)
// fetchByExcel().then(()=>{
//     justFetchOne = false;
// });

