import express,{Application} from 'express'
import { graphqlHTTP } from 'express-graphql';
import { SchemaMetaFieldDef } from 'graphql';
const app:Application=express();
import cors from 'cors'
app.use(cors())
const port:number=5000 || process.env.PORT;
import schema from './schema/schema'

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true,
}))

app.listen(port,()=>{
    console.log('Server is up on port '+port);
})