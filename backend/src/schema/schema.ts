import axios from "axios";
import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { resolve } from "path/posix";

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    })
})

//RocketType

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        mission_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
})

//Root query

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            async resolve(parent,args){
                const res = await axios.get('https://api.spacexdata.com/v3/launches');
                console.log(res.data)
                return res.data;
            }
        },
        launch:{
            type:LaunchType,
            args:{
                flight_number:{type:GraphQLInt}
            },
            async resolve (parent,args){
                const res=await axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`);
                return res.data
            }
        }
    }
})

export default new GraphQLSchema({
    query:RootQuery
})