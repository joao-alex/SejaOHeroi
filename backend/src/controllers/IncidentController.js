const connection = require('../database/connection');

module.exports = {
    async create(req,res){
        const { title,description,value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({id});
    },

    async list(req,res){
        const {page = 1} = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'])
            .limit(5)
            .offset((page-1)*5)
            .join('ongs','ongs.id','=','incidents.ong_id');

        res.header('X-Total-Count',count['count(*)'])
        return res.json(incidents);
    },

    async delete(req,res){
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents').select('ong_id').where('id',id).first();

        if(incident.ong_id!==ong_id)
            return res.status(401).json({error:'Operação não permitida'});

        await connection('incidents').delete().where('id',id);

        return res.status(204).send();
    }
}