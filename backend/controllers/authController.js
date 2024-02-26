import { getAuth } from "firebase-admin/auth";

export const checkToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;    
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        try {
            const decodedToken = await getAuth().verifyIdToken(token)

            if (decodedToken.uid) {
                req.auth = 'OK'
                return next()
            }

        } catch(error) {
            res.status(400).json({
                status:'fail',
                data: error.message
            })
        }
    } else {
        res.sendStatus(401)
    }
};
