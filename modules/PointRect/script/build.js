const { rollup } = require("rollup");
const config = require("./rollup");

rollup(config)
    .then(res => {
        console.log("job finished");
    })
    .catch(e => console.log(e));
